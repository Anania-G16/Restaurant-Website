import http from "http";
import dotenv from "dotenv";
import { routes as authRoutes } from "./src/routes/authRouter.js";
import { routes as menuRoutes } from "./src/routes/menuRouter.js";
import { routes as orderRoutes } from "./src/routes/orderRouter.js";
import { routes as adminOrderRoutes } from "./src/routes/adminOrderRouter.js";
import { routes as reservationRoutes } from "./src/routes/reservationRouter.js";
import { routes as adminReservationRoutes } from "./src/routes/adminReservationRouter.js";
import { routes as reviewRoutes } from "./src/routes/reviewRouter.js";
import { routes as contactRoutes } from "./src/routes/contactRouter.js";
import {
  parseJSONBody,
  createResHelpers,
  matchPath,
} from "./src/utils/httpUtils.js";

dotenv.config();

const prefixRoutes = (routes, prefix) =>
  routes.map((r) => ({ ...r, path: `${prefix}${r.path}` }));

const allRoutes = [
  ...prefixRoutes(authRoutes, "/auth"),
  ...prefixRoutes(menuRoutes, "/menu"),
  ...prefixRoutes(orderRoutes, "/orders"),
  ...prefixRoutes(reservationRoutes, "/reservations"),
  ...prefixRoutes(reviewRoutes, "/reviews"),
  ...prefixRoutes(contactRoutes, "/contact"),
  ...prefixRoutes(adminOrderRoutes, "/admin/orders"),
  ...prefixRoutes(adminReservationRoutes, "/admin/reservations"),
];

const findRoute = (method, pathname) => {
  for (const route of allRoutes) {
    if (route.method !== method) continue;
    const { matched, params } = matchPath(route.path, pathname);
    if (matched) return { route, params };
  }
  return null;
};

const runHandlers = async (handlers, req, res) => {
  let idx = 0;
  const next = () => {
    idx += 1;
    return idx <= handlers.length
      ? handlers[idx - 1](req, res, next)
      : undefined;
  };
  if (handlers.length === 0) return;
  return await handlers[0](req, res, next);
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    const match = findRoute(req.method, pathname);
    if (!match) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Not Found" }));
    }

    createResHelpers(res);

    const bodyMethods = ["POST", "PUT", "PATCH"];
    if (bodyMethods.includes(req.method)) {
      try {
        req.body = await parseJSONBody(req);
      } catch (err) {
        return res.status(400).json({ error: "Invalid JSON body" });
      }
    } else {
      req.body = {};
    }

    req.query = Object.fromEntries(
      new URL(req.url, `http://${req.headers.host}`).searchParams,
    );
    req.params = match.params;
    req.headers = req.headers || {};

    await runHandlers(match.route.handlers, req, res);
  } catch (err) {
    if (!res.writableEnded) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "Internal Server Error",
          details: err.message,
        }),
      );
    }
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

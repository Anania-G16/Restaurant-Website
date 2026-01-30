import { URL } from "url";

export const parseJSONBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
};

export const sendJson = (res, status, payload) => {
  if (!res.writableEnded) {
    const body = JSON.stringify(payload);
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(body);
  }
};

export const createResHelpers = (res) => {
  res.json = (payload) => sendJson(res, 200, payload);
  res.status = (status) => ({
    json: (payload) => sendJson(res, status, payload),
  });
};

export const matchPath = (pattern, pathname) => {
  // pattern e.g. /api/items/:id
  const params = {};
  const segsPattern = pattern.split("/").filter(Boolean);
  const segsPath = pathname.split("/").filter(Boolean);
  if (segsPattern.length !== segsPath.length) return { matched: false };
  for (let i = 0; i < segsPattern.length; i++) {
    const p = segsPattern[i];
    const s = segsPath[i];
    if (p.startsWith(":")) {
      params[p.slice(1)] = decodeURIComponent(s);
    } else if (p !== s) {
      return { matched: false };
    }
  }
  return { matched: true, params };
};

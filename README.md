# YEA Restaurant Website 🍽️

**A full-stack restaurant website** with a React + Vite frontend and a lightweight Node.js backend using Supabase for storage and auth.

---

## 🚀 Features

- Public menu listing and gallery
- Cart, checkout and order history
- User registration & authentication (JWT)
- Reservations system
- Reviews and contact messages
- Admin dashboard (manage menu, orders, reservations, messages)
- Admin can attach images to menu items (client-side base64 upload or future Supabase Storage integration)

---

## 🧭 Repo structure

- `frontend/` — React (Vite) app
  - `src/` — components, pages, assets
  - `package.json` — frontend deps & scripts (`npm run dev`, `build`, `preview`)
- `Backend/` — Node.js API server (custom http server)
  - `src/` — controllers, routes, middleware, config
  - `app.js` — server entry
  - `package.json` — backend dependencies

---

## 🛠️ Tech stack

- Frontend: React, Vite, React Router, Axios
- Backend: Node.js (minimal custom HTTP server), Supabase (database), JWT for auth, bcrypt
- Storage: Supabase (recommended), code includes basic `uploads` middleware for multipart parsing

---

## 🔧 Prerequisites

- Node.js >= 18
- npm
- A Supabase project (for DB + optional storage)

---

## ⚙️ Environment

Create a `.env` in `Backend/` with the following variables:

```
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
JWT_SECRET=your_jwt_secret_here
PORT=5000  # optional
```

If you plan to use Supabase Storage, set up the bucket and service keys in Supabase and follow their docs (this project currently uses `image_url` stored on menu records — base64 or URL).

---

## ▶️ Running locally

1. Backend

```bash
cd Backend
npm install
# Start server
node app.js
# or with nodemon if you prefer
nodemon app.js
```

By default the server listens on `PORT` from `.env` or `5000`.

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend expects API base url `http://localhost:5000` for dev; adjust axios calls if you change the backend port.

---

## 📡 API Endpoints (summary)

Base path: `http://localhost:5000`

Auth

- `POST /auth/register` — Register user
- `POST /auth/login` — Login (returns `token` and `role`)

Menu (public)

- `GET /menu` — Get all menu items
- `GET /menu/:id` — Get menu item
- `GET /menu/categories` — Get categories

Menu (admin - requires `Authorization: Bearer <token>` and admin role)

- `POST /menu` — Add item (body accepts `name`, `price`, `description`, `image_url`, `category_id`, `available`)
- `PATCH /menu/:id` — Update item
- `DELETE /menu/:id` — Soft-delete item (sets `available=false`)
- Category CRUD under `/menu/categories`

Orders

- `GET /orders/cart` — Get cart (auth)
- `POST /orders/cart` — Add to cart
- `PATCH /orders/cart/:itemId` — Update or remove cart item
- `POST /orders/checkout` — Checkout
- `GET /orders` — Order history (auth)

Reservations (auth)

- `POST /reservations` — Create reservation (user)
- `GET /reservations` — Get user reservations
- Admin endpoints for reservations available under admin routes

Reviews

- `POST /reviews` — Submit review (auth)
- `GET /reviews/:menu_item_id` — Get reviews for item

Contact messages

- `POST /contact` — Submit message (auth)
- `GET /contact` — Admin: get all messages
- `DELETE /contact/:id` — Admin: delete message

---

## 🗂️ Database (Supabase) tables (expected)

The project expects basic tables used throughout the controllers. Example minimal schemas:

- `users` (id, name, email UNIQUE, password_hash, role)
- `menuitems` (id, name, description, price, image_url, available BOOLEAN, category_id)
- `menucategories` (id, name, description)
- `orders` (id, user_id, status [pending, confirmed, etc.], total_price, created_at)
- `orderitems` (id, order_id, menu_item_id, quantity, price)
- `reservations` (id, user_id, table_number, guest_count, reservation_time, status)
- `reviews` (id, user_id, menu_item_id, rating, comment)
- `messages` / `contact` (id, user_id, subject, message)

You can create these in the Supabase SQL editor or via UI. Adapt fields as needed.

---

## 🖼️ Image upload behavior

- Admin pages currently allow attaching an image to a menu item by sending an `image_url` value. The frontend supports selecting a local image and converting it to a base64 Data URL which is then saved in the `image_url` column.
- For production, storing files in Supabase Storage (or another CDN) and saving public URLs in `image_url` is recommended. The project contains a basic `uploads` middleware for parsing `multipart/form-data` if you prefer server-side file saving.

---

## 🧪 Tests & Validation

No automated test suite is included yet. Manual tests:

- Register/login users
- Add menu items (admin)
- Upload / attach images via Admin Menu
- Place orders and verify `orders`/`orderitems`

---

## 🧑‍💻 Contributing

- Fork the repo, make changes on a branch, and open a PR. Describe behavior and include screenshots when relevant.
- For image storage changes, recommend adding Supabase Storage integration and a server endpoint to handle uploads.

---

## 📞 Contact

If you want me to add: Supabase Storage uploads, server-side `multipart/form-data` endpoints, or client-side image compression — open an issue or request the change here and I can implement it.

---

**License**: MIT (or choose your preferred license)

Happy coding! 🎉

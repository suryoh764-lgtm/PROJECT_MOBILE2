# Yasaka Simple API

Backend sederhana untuk aplikasi restaurant Yasaka, menggunakan Prisma ORM dengan SQLite.

## Setup

```bash
cd api/simple
npm install
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
npm run dev
```

Server berjalan di `http://localhost:3000`

## Default Admin
- Email: `admin@yasaka.com`
- Password: `admin123`

## API Endpoints

### Auth
- `POST /api/auth/login` - Login admin

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (auth required)

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get menu item by ID
- `GET /api/menu/category/:categoryId` - Get menu by category
- `POST /api/menu` - Create menu item (auth required)
- `PUT /api/menu/:id` - Update menu item (auth required)
- `DELETE /api/menu/:id` - Delete menu item (auth required)

### Orders
- `GET /api/orders` - Get all orders (auth required)
- `GET /api/orders/:id` - Get order by ID (auth required)
- `GET /api/orders/active` - Get active orders (auth required)
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status (auth required)

## Test dengan Apidog

### 1. Login
```
POST http://localhost:3000/api/auth/login
Body: { "email": "admin@yasaka.com", "password": "admin123" }
Response: { "success": true, "data": { "token": "..." } }
```

### 2. Get Categories
```
GET http://localhost:3000/api/categories
```

### 3. Get Menu
```
GET http://localhost:3000/api/menu
```

### 4. Create Order
```
POST http://localhost:3000/api/orders
Body: {
  "tableNumber": "1",
  "customerName": "Budi",
  "notes": "Tidak pedas",
  "items": [
    { "menuItemId": "<menu-id>", "quantity": 2 }
  ]
}
```

### 5. Update Order Status
```
PUT http://localhost:3000/api/orders/<order-id>/status
Headers: Authorization: Bearer <token>
Body: { "status": "SEDANG_DIPROSES" }
```

## Order Status
- `BELUM_DIPROSES` (default)
- `SEDANG_DIPROSES`
- `SIAP_DIAMBIL`
- `SELESAI`
- `CANCELLED`


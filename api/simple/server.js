const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'yasaka-secret-key-2024';

app.use(cors());
app.use(express.json());

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api', (req, res) => {
  res.json({
    name: 'Yasaka Simple API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      menu: '/api/menu',
      categories: '/api/categories',
      orders: '/api/orders'
    }
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ adminId: admin.id, email: admin.email, role: admin.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ success: true, data: { token, admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role } } });
});

app.get('/api/categories', async (req, res) => {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { menuItems: true } } }
  });
  const data = categories.map(c => ({ id: c.id, name: c.name, description: c.description, menuCount: c._count.menuItems }));
  res.json({ success: true, data });
});

app.post('/api/categories', authenticate, async (req, res) => {
  const { name, description } = req.body;
  const category = await prisma.category.create({ data: { name, description } });
  res.status(201).json({ success: true, data: category });
});

app.get('/api/menu', async (req, res) => {
  const { categoryId, isAvailable } = req.query;
  const where = {};
  if (categoryId) where.categoryId = categoryId;
  if (isAvailable !== undefined) where.isAvailable = isAvailable === 'true';
  const menuItems = await prisma.menuItem.findMany({
    where,
    include: { category: { select: { id: true, name: true } } },
    orderBy: { createdAt: 'desc' }
  });
  const data = menuItems.map(m => ({ ...m, price: Number(m.price) }));
  res.json({ success: true, data });
});

app.get('/api/menu/:id', async (req, res) => {
  const menuItem = await prisma.menuItem.findUnique({
    where: { id: req.params.id },
    include: { category: true }
  });
  if (!menuItem) return res.status(404).json({ error: 'Menu not found' });
  res.json({ success: true, data: { ...menuItem, price: Number(menuItem.price) } });
});

app.get('/api/menu/category/:categoryId', async (req, res) => {
  const menuItems = await prisma.menuItem.findMany({
    where: { categoryId: req.params.categoryId },
    include: { category: { select: { id: true, name: true } } }
  });
  const data = menuItems.map(m => ({ ...m, price: Number(m.price) }));
  res.json({ success: true, data });
});

app.post('/api/menu', authenticate, async (req, res) => {
  const { name, description, price, categoryId, imageUrl, isAvailable } = req.body;
  const menuItem = await prisma.menuItem.create({
    data: { name, description, price, categoryId, imageUrl, isAvailable: isAvailable ?? true }
  });
  res.status(201).json({ success: true, data: { ...menuItem, price: Number(menuItem.price) } });
});

app.put('/api/menu/:id', authenticate, async (req, res) => {
  const { name, description, price, categoryId, imageUrl, isAvailable } = req.body;
  const menuItem = await prisma.menuItem.update({
    where: { id: req.params.id },
    data: { name, description, price, categoryId, imageUrl, isAvailable }
  });
  res.json({ success: true, data: { ...menuItem, price: Number(menuItem.price) } });
});

app.delete('/api/menu/:id', authenticate, async (req, res) => {
  await prisma.menuItem.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Menu deleted' });
});

app.get('/api/orders', authenticate, async (req, res) => {
  const { status } = req.query;
  const where = {};
  if (status) where.status = status;
  const orders = await prisma.order.findMany({
    where,
    include: { items: { include: { menuItem: { select: { id: true, name: true } } } } },
    orderBy: { createdAt: 'desc' }
  });
  const data = orders.map(o => ({
    ...o,
    subtotal: Number(o.subtotal),
    tax: Number(o.tax),
    discount: Number(o.discount),
    totalPrice: Number(o.totalPrice),
    items: o.items.map(i => ({ ...i, unitPrice: Number(i.unitPrice) }))
  }));
  res.json({ success: true, data });
});

app.get('/api/orders/:id', authenticate, async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: req.params.id },
    include: { items: { include: { menuItem: true } } }
  });
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({
    success: true,
    data: {
      ...order,
      subtotal: Number(order.subtotal),
      tax: Number(order.tax),
      discount: Number(order.discount),
      totalPrice: Number(order.totalPrice),
      items: order.items.map(i => ({ ...i, unitPrice: Number(i.unitPrice) }))
    }
  });
});

app.get('/api/orders/active', authenticate, async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { status: { in: ['BELUM_DIPROSES', 'SEDANG_DIPROSES', 'SIAP_DIAMBIL'] } },
    include: { items: { include: { menuItem: { select: { id: true, name: true } } } } },
    orderBy: { orderTime: 'asc' }
  });
  const data = orders.map(o => ({
    ...o,
    subtotal: Number(o.subtotal),
    tax: Number(o.tax),
    discount: Number(o.discount),
    totalPrice: Number(o.totalPrice),
    items: o.items.map(i => ({ ...i, unitPrice: Number(i.unitPrice) }))
  }));
  res.json({ success: true, data });
});

app.post('/api/orders', async (req, res) => {
  const { tableNumber, customerName, customerPhone, notes, items } = req.body;
  let subtotal = 0;
  const orderItems = [];
  for (const item of items) {
    const menuItem = await prisma.menuItem.findUnique({ where: { id: item.menuItemId } });
    if (!menuItem) return res.status(400).json({ error: `Menu item not found: ${item.menuItemId}` });
    if (!menuItem.isAvailable) return res.status(400).json({ error: `Menu item not available: ${menuItem.name}` });
    const unitPrice = Number(menuItem.price);
    subtotal += unitPrice * item.quantity;
    orderItems.push({ menuItemId: item.menuItemId, quantity: item.quantity, unitPrice, notes: item.notes });
  }
  const tax = Math.round(subtotal * 0.1);
  const totalPrice = subtotal + tax;
  const orderNumber = 'ORD-' + Date.now().toString(36).toUpperCase();
  const order = await prisma.order.create({
    data: {
      orderNumber,
      tableNumber,
      customerName,
      customerPhone,
      notes,
      subtotal,
      tax,
      totalPrice,
      items: { create: orderItems }
    },
    include: { items: { include: { menuItem: true } } }
  });
  res.status(201).json({
    success: true,
    data: {
      ...order,
      subtotal: Number(order.subtotal),
      tax: Number(order.tax),
      discount: Number(order.discount),
      totalPrice: Number(order.totalPrice),
      items: order.items.map(i => ({ ...i, unitPrice: Number(i.unitPrice) }))
    }
  });
});

app.put('/api/orders/:id/status', authenticate, async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['BELUM_DIPROSES', 'SEDANG_DIPROSES', 'SIAP_DIAMBIL', 'SELESAI', 'CANCELLED'];
  if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const order = await prisma.order.update({
    where: { id: req.params.id },
    data: { status }
  });
  res.json({ success: true, data: { id: order.id, status: order.status } });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
prisma.$connect().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(e => {
  console.error('Database connection failed:', e);
  process.exit(1);
});


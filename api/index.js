import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

// Controllers Methods
import {
  getAllOrders,
  createOrder,
  updateOrderById,
  deleteOrderById,
  getApproveOrdersDueSoon,
  getTravelingOrdersByDateRange
} from './controllers/OrderController.js'

import {
  createItem,
  getAllItems,
  updateItemById,
  deleteItemById
} from './controllers/ItemController.js'

import {
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById
} from './controllers/UserController.js'

// Express settings
const app = express()
const PORT = process.env.PORT || 5269
app.use(express.json())
app.use(cors())

// MongoDB connection
mongoose.connect('mongodb+srv://root:root@orders-cluster.qhlyufx.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Order Endpoints
app.get('/api/order', getAllOrders)
app.post('/api/order', createOrder)
app.put('/api/order', updateOrderById)
app.delete('/api/order', deleteOrderById)
app.get('/api/order/approve-due-soon', getApproveOrdersDueSoon)
app.get('/api/order/traveling-by-date-range', getTravelingOrdersByDateRange)

// Item Endpoints
app.get('/api/item', getAllItems)
app.post('/api/item', createItem)
app.put('/api/item', updateItemById)
app.delete('/api/item', deleteItemById)

// User Endpoints
app.get('/api/user', getAllUsers)
app.post('/api/user', createUser)
app.put('/api/user', updateUserById)
app.delete('/api/user', deleteUserById)

app.listen(PORT, () => console.log(`Server running up! on localhost:${PORT}`))



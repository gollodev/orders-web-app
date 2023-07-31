import Order from '../models/Order.js'

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body)
    const createdOrder = await (await (await newOrder.save()).populate('client')).populate('items')
    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la orden' })
  }
}

const getAllOrders = async (_, res) => {
  try {
    const orders = await Order.find().populate('client').populate('items')
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las órdenes' })
  }
};

const updateOrderById = async (req, res) => {
  try {
    const { id } = req.params
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json(updatedOrder)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la orden' })
  }
}

const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params
    await Order.findByIdAndDelete(id)
    res.status(200).json({ message: 'Orden eliminada exitosamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la orden' })
  }
}

const getApproveOrdersDueSoon = async (_, res) => {
  try {
    const today = new Date()
    const twoDaysFromNow = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000)

    const orders = await Order.find({
      status: 'Approve',
      shippingPromise: { $lt: twoDaysFromNow },
    }).populate('client').populate('items')

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las órdenes' });
  }
}

const getTravelingOrdersByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query

    const orders = await Order.find({
      status: 'Traveling',
      shippingPromise: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).populate('client').populate('items')

    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las órdenes' })
  }
}

export {
  createOrder,
  getAllOrders,
  updateOrderById,
  deleteOrderById,
  getApproveOrdersDueSoon,
  getTravelingOrdersByDateRange
}
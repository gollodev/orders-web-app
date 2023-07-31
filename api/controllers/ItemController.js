import Item from '../models/Item.js'

const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body)
    const createdItem = await newItem.save()
    res.status(201).json(createdItem)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el item' })
  }
}

const getAllItems = async (_, res) => {
  try {
    const items = await Item.find()
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los items' })
  }
}

const updateItemById = async (req, res) => {
  try {
    const { id } = req.params
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json(updatedItem)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el item' })
  }
}

const deleteItemById = async (req, res) => {
  try {
    const { id } = req.params
    await Item.findByIdAndDelete(id)
    res.status(200).json({ message: 'Item eliminado exitosamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el item' })
  }
}

export {
  createItem,
  getAllItems,
  updateItemById,
  deleteItemById
}
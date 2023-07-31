import User from '../models/User.js'

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body)
    const createdUser = await newUser.save()
    res.status(201).json(createdUser)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el user' })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los users' })
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params
    const updatedItem = await User.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json(updatedItem)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el user' });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.status(200).json({ message: 'User eliminado exitosamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el user' })
  }
}

export {
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById
}
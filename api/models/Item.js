import { Schema, model } from 'mongoose'

const ItemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

export default model('Item', ItemSchema)
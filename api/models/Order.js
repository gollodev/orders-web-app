import { Schema, model } from 'mongoose'

const OrderSchema = new Schema({
  createDate: { type: Date, required: true },
  status: { type: String, enum: ['Approve', 'Cancel', 'Delivery', 'Traveling'], required: true },
  client: { type: Schema.Types.ObjectId, ref: 'User' },
  shippingAddress: { type: String, required: true },
  shippingPromise: { type: Date, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
})

export default model('Order', OrderSchema)
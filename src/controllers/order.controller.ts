import { Order, IOrder } from "../models/order.model";

async function getOrders() {
  return await Order.find();
}

async function createOrder(productId: string, customerId: string) {
  const order = new Order({ productId, customerId });
  return await order.save();
}

async function updateOrder(id: string, data: IOrder) {
  return await Order.findByIdAndUpdate(id, data, { new: true });
}

async function deleteOrder(id: string) {
  const deleted = await Order.findByIdAndDelete(id);
  return !!deleted;
}

export default { getOrders, createOrder, updateOrder, deleteOrder };

import { Customer, ICustomer } from "../models/customer.model";

async function getCustomers() {
  return await Customer.find();
}

async function createCustomer(data: Partial<ICustomer>) {
  const customer = new Customer(data);
  return await customer.save();
}

async function getCustomerById(id: string) {
  return await Customer.findById(id);
}

async function updateCustomer(id: string, data: Partial<ICustomer>) {
  return await Customer.findByIdAndUpdate(id, data, { new: true });
}

async function deleteCustomer(id: string) {
  const deleted = await Customer.findByIdAndDelete(id);
  return !!deleted;
}

export default {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};

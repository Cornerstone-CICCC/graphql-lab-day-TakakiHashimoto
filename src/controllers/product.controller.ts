import { Product } from "../models/product.model";
import { IProducts } from "../models/product.model";

async function getProducts() {
  return await Product.find();
}

async function createProduct(data: Partial<IProducts>) {
  const product = new Product(data);
  return await product.save();
}

async function getProductById(id: string) {
  return await Product.findById(id);
}

async function updateProduct(id: string, data: Partial<IProducts>) {
  return await Product.findByIdAndUpdate(id, data, { new: true });
}

async function deleteProduct(id: string) {
  const deleted = await Product.findByIdAndDelete(id);
  return !!deleted;
}

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

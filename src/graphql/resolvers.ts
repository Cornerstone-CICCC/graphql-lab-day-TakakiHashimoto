// Finish the resolvers
import productController from "../controllers/product.controller";
import customerController from "../controllers/customer.controller";
import orderController from "../controllers/order.controller";
import { IProducts, Product } from "../models/product.model";
import { Customer, ICustomer } from "../models/customer.model";
import { IOrder, Order } from "../models/order.model";

export const resolvers = {
  Query: {
    products: async () => {
      return await productController.getProducts();
    },
    customers: async () => {
      return await customerController.getCustomers();
    },
    orders: async () => {
      return await orderController.getOrders();
    },
    getProductById: async (_: unknown, { id }: { id: string }) => {
      productController.getProductById(id);
    },
    getCustomerById: async (_: unknown, { id }: { id: string }) => {
      return await customerController.getCustomerById(id);
    },
  },

  Product: {
    customers: async (parent: IProducts) => {
      const orders = await Order.find({ productId: parent._id }); // all orders that matches with this product id
      const customerIds = orders.map((order) => order.customerId); // all the cutomer ids
      return await Customer.find({ _id: { $in: customerIds } });
    },
  },
  Customer: {
    products: async (parent: ICustomer) => {
      const orders = await Order.find({ userId: parent._id });
      const productIds = orders.map((o) => o.productId);
      return await Product.find({ _id: { $in: productIds } });
    },
  },
  Order: {
    product: async (parent: IOrder) => {
      return await Product.findById(parent.productId);
    },
    customer: async (parent: IOrder) => {
      await Customer.findById(parent.customerId);
    },
  },
  Mutation: {
    addProduct: async (_: unknown, args: IProducts) => {
      return await productController.createProduct({
        productName: args.productName,
        productPrice: args.productPrice,
      });
    },
    editProduct: async (
      _: unknown,
      {
        id,
        productName,
        productPrice,
      }: { id: string; productName: string; productPrice: number },
    ) => {
      return await productController.updateProduct(id, {
        productName,
        productPrice,
      });
    },
    removeProduct: async (_: unknown, { id }: { id: string }) => {
      return await productController.deleteProduct(id);
    },

    addCustomer: async (_: unknown, args: ICustomer) => {
      return await customerController.createCustomer({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
      });
    },

    editCustomer: async (
      _: unknown,
      {
        id,
        firstName,
        lastName,
        email,
      }: { id: string; firstName: string; lastName: string; email: string },
    ) => {
      return await customerController.updateCustomer(id, {
        firstName,
        lastName,
        email,
      });
    },
    removeCustomer: async (_: unknown, { id }: { id: string }) => {
      return await customerController.deleteCustomer(id);
    },

    addOrder: async (_: unknown, { productName, productPrice }: IProducts) => {
      return await productController.createProduct({
        productName,
        productPrice,
      });
    },
    editOrder: async (
      _: unknown,
      {
        id,
        productName,
        productPrice,
      }: { id: string; productName: string; productPrice: number },
    ) => {
      return await productController.updateProduct(id, {
        productName,
        productPrice,
      });
    },
    removeOrder: async (_: unknown, { id }: { id: string }) => {
      return await productController.deleteProduct(id);
    },
  },
};

// When someone queries all products, call getProducts.
// When someone queries all customers, call getCustomers.
// When someone queries all orders, call getOrders.

// When someone adds/edits/removes products, customers, or orders,
// call the right controller function.

// When someone asks for order.product,
// use productId from that order to fetch the full Product.

// When someone asks for order.customer,
// use customerId from that order to fetch the full Customer.

// When someone asks for product.customers,
// find all orders for that product, then fetch those customers.

// When someone asks for customer.products,
// find all orders for that customer, then fetch those products.

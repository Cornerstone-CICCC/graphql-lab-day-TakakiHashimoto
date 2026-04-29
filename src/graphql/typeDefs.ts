import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Product {
    id: ID!
    productName: String
    productPrice: Float
    customers: [Customer] # Product's customers
  }

  type Customer {
    id: ID!
    firstName: String
    lastName: String
    email: String
    products: [Product] # Customer's products
  }

  type Order {
    id: ID!
    product: Product # Product details
    customer: Customer # Customer details
  }

  type Query {
    products: [Product]
    customers: [Customer]
    orders: [Order]
    getProductById(id: ID): Product
    getCustomerById(id: ID): Customer
  }

  type Mutation {
    addProduct(productName: String, productPrice: Float): Product
    editProduct(id: ID, productName: String, productPrice: Float): Product
    removeProduct(id: ID): Boolean

    addCustomer(firstName: String, lastName: String, email: String): Customer
    editCustomer(
      id: ID
      firstName: String
      lastName: String
      email: String
    ): Customer
    removeCustomer(id: ID): Boolean

    addOrder(productId: ID, customerId: ID): Order
    editOrder(id: ID, productId: ID, customerId: ID): Order
    removeOrder(id: ID): Boolean
  }
`;

const Cart = require('./cart')
const Inventory = require('./inventory')
const Order = require('./order')
const OrderInventory = require('./orderInventory')
const Product = require('./product')
const Review = require('./review')
const User = require('./user')

User.hasMany(Review)
Review.belongsTo(User)

Product.hasMany(Inventory)
Inventory.belongsTo(Product)

Product.hasMany(Review)
Review.belongsTo(Product)

Order.belongsTo(User)
User.hasMany(Order)

Cart.belongsTo(User)
User.hasMany(Cart)

Cart.belongsTo(Inventory)
Inventory.hasMany(Cart)

Order.belongsToMany(Inventory, {through: OrderInventory})
Inventory.belongsToMany(Order, {through: OrderInventory})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  Cart,
  Inventory,
  Order,
  OrderInventory,
  Product,
  Review,
  User
}

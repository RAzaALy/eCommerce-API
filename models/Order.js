const mongoose = require('mongoose');

const SingleOrderItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  },
});

const OrderSchema = mongoose.Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: [SingleOrderItemSchema],
    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
      default: 'pending',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
    },
    currency: {
      type: String,
      default: 'usd'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);

////post request data necessary for create order
// {
//   "tax": 499,
//   "shippingFee": 799,
//   "items": [
//     {
//       "amount": 3,
//       "product": "61b2fa66fa767544bccea175"
//     },
//     {
//       "amount": 2,
//       "product": "61b2fc98fa767544bccea181"
//     }
//   ]
// }
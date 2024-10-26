import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, requied: true },
      city: { type: String, requied: true },
      postalCode: { type: String, requied: true },
      country: { type: String, requied: true },
    },

    paymentMethod: { type: String, requied: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },

    itemPrice: { type: Number, requied: true },
    shippingPrice: { type: Number, requied: true },
    taxPrice: { type: Number, requied: true },
    totalPrice: { type: Number, requied: true },

    user:{type: mongoose.Schema.Types.ObjectId, required:true},
    isPaid:{type:Boolean,default:false},
    paidAt:{type: Date},
    isDelivered:{type:Boolean,default:false},
    deliveredAt:{type: Date}

  },
  {
    timestamps: true,
  }
);
const Order=mongoose.model('Order',OrderSchema);
export default Order;
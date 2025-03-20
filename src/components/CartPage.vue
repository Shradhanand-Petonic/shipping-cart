<template>
    <div class="container mt100">
      <h2 class="text-center mt20">Your Cart</h2>
  
      <div class="row" v-if="cartItems.length > 0">
       <div class="col-md-9">
        <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id">
              <td><img :src="item.thumbnail" :alt="item.title" /> {{ item.title }}</td>
              <td><b>${{ item.price }}</b></td>
              <td>
              <div class="swiftbtn">
                <button @click="decrementQuantity(item)" :disabled="item.quantity <= 1">-</button>
                {{ item.quantity }}
                <button @click="incrementQuantity(item)">+</button>
              </div>
              </td>
              <td><b>${{ (item.price * item.quantity).toFixed(2) }}</b></td>
              <td>
                <button @click="removeFromCart(item)" class="cancelitem"><i class="fa fa-times"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
       </div>
       <div class="col-md-3">
        <div class="order-summery">
          <h4>Order Summary</h4>
          <div class="order-body">
            <div class="stotal">
              <div class="textAmt">Subtotal</div>
              <div class="amount">${{ totalAmount.toFixed(2) }}</div>
            </div>
            <div class="stotal">
              <div class="textAmt">Shipping</div>
              <div class="amount">Free</div>
            </div>
            <div class="coupon">
             <a href="#">Add Coupon Code</a> 
            </div>
          </div>
          <div class="order-body carttle">
            <div class="stotal">
              <div class="textAmt">Total</div>
              <div class="amount">${{ totalAmount.toFixed(2) }}</div>
            </div>
          </div>
        </div>
        <button class="checkout">Checkout</button>
       </div>
  
      </div>
  
      <p v-else>Your cart is empty.</p>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import '../css/product.css';
  
  export default {
    computed: {
      ...mapGetters(['cartItems', 'totalAmount']),
    },
    methods: {
      ...mapActions(['removeFromCart', 'incrementQuantity', 'decrementQuantity']),
    },
  };
  </script>
  
  <style scoped>
  .cart-container {
    padding: 20px;
    max-width: 800px;
    margin: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border-bottom: 1px solid #ddd;
    padding: 10px;
  }
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  button {
    background-color: #ccc;
    color: #222;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    margin: 0 5px;
  }
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  .mt20{
    margin-top: 20px;
  }
  </style>
  
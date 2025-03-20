<template>
  <header>
    <!-- Mobile Menu Toggle -->
    
    <div class="logo">
      <button class="menu-btn" @click="toggleMobileMenu">
      ☰
    </button>
      <router-link to="/">venia</router-link>
    </div>
    <!-- Navbar -->
    <nav :class="{ 'mobile-active': isMobileMenuOpen }">
      <ul class="nav-list">
        <li>
          <a href="#">Home</a>
        </li>
        <li class="dropdown" @mouseover="showDropdown('products')" @mouseleave="hideDropdown">
          <a href="#">Products  <font-awesome-icon :icon="['fas', 'chevron-down']" /></a>
          <div v-if="activeDropdown === 'products'" class="mega-dropdown">
            <div>
              <h3>Electronics</h3>
              <a href="#">Mobiles</a>
              <a href="#">Laptops</a>
              <a href="#">Cameras</a>
            </div>
            <div>
              <h3>Fashion</h3>
              <a href="#">Men's Clothing</a>
              <a href="#">Women's Clothing</a>
              <a href="#">Accessories</a>
            </div>
          </div>
        </li>
        <li class="dropdown" @mouseover="showDropdown('services')" @mouseleave="hideDropdown">
          <a href="#">Services <font-awesome-icon :icon="['fas', 'chevron-down']" /></a>
          <div v-if="activeDropdown === 'services'" class="mega-dropdown">
            <div>
              <h3>Consulting</h3>
              <a href="#">Business</a>
              <a href="#">Technology</a>
            </div>
            <div>
              <h3>Support</h3>
              <a href="#">Customer Service</a>
              <a href="#">Technical Support</a>
            </div>
          </div>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
    <div class="userprofile"> 
      <ul>
        <li>
          <button class="userpfr"><font-awesome-icon :icon="['fas', 'user']" /> Sign In</button>
        </li>
        <li>
          <router-link to="/cart">
            <span class="cart-container">
              <font-awesome-icon :icon="['fas', 'shopping-cart']" class="cart-icon" />
              <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>


<script>
import { mapGetters } from 'vuex';
import '../css/Header.css';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
      ...mapGetters(['cartCount']),
    },
    data() {
    return {
      activeDropdown: null,
      isMobileMenuOpen: false,
    };
  },
  methods: {
    showDropdown(menu) {
      if (window.innerWidth > 768) {
        this.activeDropdown = menu;
      }
    },
    hideDropdown() {
      this.activeDropdown = null;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

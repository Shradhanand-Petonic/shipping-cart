import { createStore } from 'vuex';

export default createStore({
  state: {
    products: [],
    cart: [], 
    searchQuery: '',
    selectedCategories: [],
    selectedBrands: [],
    currentPage: 1,
    itemsPerPage: 6,
    minPrice: 0,
    maxPrice: 1000,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_SEARCH_QUERY(state, query) {
        state.searchQuery = query;
        state.currentPage = 1;
      },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_SELECTED_CATEGORIES(state, categories) {
        state.selectedCategories = categories;
        state.currentPage = 1;
      },
      SET_SELECTED_BRANDS(state, brands) {
        state.selectedBrands = brands;
        state.currentPage = 1;
      },
      SET_PRICE_RANGE(state, { min, max }) {
        state.minPrice = min;
        state.maxPrice = max;
        state.currentPage = 1;
      },
    ADD_TO_CART(state, product) {
        const item = state.cart.find((p) => p.id === product.id);
        if (item) {
          item.quantity += 1;
        } else {
          state.cart.push({ ...product, quantity: 1 });
        }
      },
      REMOVE_FROM_CART(state, product) {
        state.cart = state.cart.filter((item) => item.id !== product.id);
      },
      INCREMENT_QUANTITY(state, product) {
        const item = state.cart.find((p) => p.id === product.id);
        if (item) {
          item.quantity += 1;
        }
      },
      DECREMENT_QUANTITY(state, product) {
        const item = state.cart.find((p) => p.id === product.id);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        }
      }   
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        commit('SET_PRODUCTS', data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    removeFromCart({ commit }, product) {
        commit('REMOVE_FROM_CART', product);
    },
    incrementQuantity({ commit }, product) {
        commit('INCREMENT_QUANTITY', product);
    },
    decrementQuantity({ commit }, product) {
        commit('DECREMENT_QUANTITY', product);
    }   
  },
  getters: {
    allCategories: (state) => {
        const categories = [...new Set(state.products.map((product) => product.category))];
        return categories;
      },
      allBrands: (state) => {
        const brands = state.products.map((product) => product.brand);
        return [...new Set(brands)];
      },
      filteredProducts: (state) => {
        let filtered = state.products;
  
        // Apply search filter
        if (state.searchQuery) {
          filtered = filtered.filter((product) =>
            product.title.toLowerCase().includes(state.searchQuery.toLowerCase())
          );
        }
  
        // Apply category filter
        if (state.selectedCategories.length > 0) {
          filtered = filtered.filter((product) =>
            state.selectedCategories.includes(product.category)
          );
        }
         // Apply brand filter
         if (state.selectedBrands.length > 0) {
            filtered = filtered.filter((product) =>
              state.selectedBrands.includes(product.brand)
            );
        }
        // Price Filter
        filtered = filtered.filter(
            (product) => product.price >= state.minPrice && product.price <= state.maxPrice
        );
        return filtered;
      },
      paginatedProducts: (state, getters) => {
        const start = (state.currentPage - 1) * state.itemsPerPage;
        const end = start + state.itemsPerPage;
        return getters.filteredProducts.slice(start, end); // Use filtered products here
      },
      totalPages: (state, getters) =>
        Math.ceil(getters.filteredProducts.length / state.itemsPerPage), // Update this too
      currentPage: (state) => state.currentPage,
      cartCount: (state) =>
        state.cart.reduce((total, item) => total + item.quantity, 0),
      cartItems: (state) => state.cart,
      totalAmount: (state) =>
        state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    },
});

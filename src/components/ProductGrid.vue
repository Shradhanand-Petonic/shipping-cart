<template>
    <div class="container mt100">
     <div class="row">
        <div class="col-md-12">
             <!-- Search Input -->
     <div class="row">
      <div class="col-md-9">
        <div class="search-container">
        <input
          type="text" class="search"
          v-model="searchQuery"
          placeholder="Search Product, Brand and more"
        />
        <button class="searchbtn" @click="searchProducts">Search again</button>
      </div>
      </div>
      <div class="col-md-3">
        <button class="filter-button" @click="toggleOverlay">
          <i class="fa-solid fa-filter"></i> Filter
        </button>
      </div>
     
     </div>
  
      <!-- No Data Found Message -->
      <div v-if="filteredProducts.length === 0">
        <p>No products found. Please try again with a different search term.</p>
      </div>
  
      <!-- Product List -->
      <div v-else>
        <div class="row">
          <div v-for="product in paginatedProducts" :key="product.id" class="col-md-4 col-lg-4 col-sm-6">
            <div class="card card-item">
              <img :src="product.thumbnail" :alt="product.title" />
              <h3 class="title">{{ product.title }}</h3>
              <p class="price">Price: ${{ product.price }}</p>
              <div class="btn-item">
                <button @click="addToCart(product)">Add to cart</button> &nbsp;&nbsp;
                <i class="fa fa-heart"></i>
              </div>
            </div>
          </div>
        </div>
    
        <!-- Pagination Controls -->
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
        </div>
         <!--  -->
      <div v-if="isOverlayOpen" class="filter-overlay" @click.self="toggleOverlay">
        <div class="overlay-box">
          <div class="allfilter">
            <div>All Filter</div>
            <button class="close-button" @click="toggleOverlay"><i class="fa fa-times"></i></button>
          </div>
          <div class="accordion" id="accordionExample">
      <!-- Accordion Item 1 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Categories
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div v-for="category in allCategories" :key="category">
        <input
          type="checkbox"
          :value="category"
          v-model="selectedCategories"
        />
        <label>{{ category }}</label>
      </div>
          </div>
        </div>
      </div>

      <!-- Accordion Item 2 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Brand
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div v-for="brand in allBrands" :key="brand">
        <input
          type="checkbox"
          :value="brand"
          v-model="selectedBrands"
          @change="updateBrandFilter"
        />
        <label>{{ brand }}</label>
          </div>
        </div>
      </div>

      <!-- Accordion Item 3 -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Price
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <!-- Price Slider -->
    <div class="price-slider">
      <h4>Filter by Price</h4>
      <input
        type="range"
        :min="minPrice"
        :max="maxPrice"
        v-model="selectedMinPrice"
        @input="updatePriceRange"
      />
      <input
        type="range"
        :min="minPrice"
        :max="maxPrice"
        v-model="selectedMaxPrice"
        @input="updatePriceRange"
      />
      <p>Price Range: ${{ selectedMinPrice }} - ${{ selectedMaxPrice }}</p>
    </div>
          </div>
        </div>
      </div>
    </div>
        </div>
        </div>
      </div>
   
    </div>
    
    </div>
    
  </template>
  
  <script>
  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import '../css/product.css';
  
  export default {
    data() {
      return {
        searchQuery: '',
        selectedCategories: [],
        selectedBrands: [],
        selectedMinPrice: 0,
        selectedMaxPrice: 1000,
        isOverlayOpen: false,
      };
    },
    computed: {
      ...mapGetters(['paginatedProducts', 'totalPages', 'currentPage','allCategories', 'filteredProducts', 'allBrands','minPrice','maxPrice']),
    },
    methods: {
      ...mapActions(['fetchProducts', 'addToCart']),
      ...mapMutations(['SET_CURRENT_PAGE', 'SET_SEARCH_QUERY','SET_SELECTED_CATEGORIES', 'SET_SELECTED_BRANDS', 'SET_PRICE_RANGE']),
    
      searchProducts() {
        this.SET_SEARCH_QUERY(this.searchQuery);
      },
      updateBrandFilter() {
      this.SET_SELECTED_BRANDS(this.selectedBrands);
    },
    updatePriceRange() {
      this.SET_PRICE_RANGE({
        min: parseFloat(this.selectedMinPrice),
        max: parseFloat(this.selectedMaxPrice),
      });
    },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.SET_CURRENT_PAGE(this.currentPage + 1);
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.SET_CURRENT_PAGE(this.currentPage - 1);
        }
      },
      toggleOverlay() {
      this.isOverlayOpen = !this.isOverlayOpen;
    },
    },
    watch: {
    selectedCategories(newCategories) {
      this.SET_SELECTED_CATEGORIES(newCategories);
    }
  },
    mounted() {
      this.fetchProducts();
    },
  };
  </script>
  
  <style scoped>
  </style>
  
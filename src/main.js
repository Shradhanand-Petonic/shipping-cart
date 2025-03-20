import { createApp } from 'vue';
import App from './App.vue';
import router from './Router'; 
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
// Import Font Awesome core
import { library } from '@fortawesome/fontawesome-svg-core';

// Import specific icons
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// Import Vue Font Awesome component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add icons to the library
library.add(faChevronDown);
library.add(faUser);
library.add(faShoppingCart);


const app = createApp(App);
app.use(router);
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');

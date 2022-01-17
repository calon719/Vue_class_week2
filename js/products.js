import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js';

const app = createApp({
  data() {
    return {
      api: {
        baseUrl: 'https://vue3-course-api.hexschool.io',
        path: 'calon',
      },
      productsData: [],
      temp: {},
      isLoading: false
    }
  },
  methods: {
    getProductsData() {
      this.isLoading = true;

      axios.get(`${this.api.baseUrl}/v2/api/${this.api.path}/admin/products/all`)
        .then(res => {
          const data = res.data.products;
          this.productsData = Object.keys(data).map(key => data[key]);
        }).catch(err => {
          alert(err.data.message);
          document.cookie = "myToken=;expires=" + (new Date(0)).toGMTString();
          location.href = './index.html';
        }).then(res => {
          this.isLoading = false;
        });
    },
    deleteProduct(e) {
      this.isLoading = true;

      const id = e.target.dataset.id;
      axios.delete(`${this.api.baseUrl}/v2/api/${this.api.path}/admin/product/${id}`)
        .then(res => {
          this.getProductsData();
          this.temp = {};
        }).catch(err => {
          console.dir(err);
        }).then(res => {
          this.isLoading = false;
        });
    }
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;

    this.getProductsData();
  }
});
app.mount('#app');
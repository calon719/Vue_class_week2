import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js';

const app = createApp({
  data() {
    return {
      api: {
        apiUrl: 'https://vue3-course-api.hexschool.io',
        signin_path: 'v2/admin/signin',
        check_path: 'v2/api/user/check',
      },
      user: {
        username: '',
        password: ''
      },
      isError: false,
      isLoading: false
    }
  },
  methods: {
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token;

      axios.post(`${this.api.apiUrl}/${this.api.check_path}`)
        .then(res => {
          this.isError = false;
          location.href = './products.html';
        }).catch(err => {
          console.dir(err)
        });
    },
    login() {
      this.isLoading = true;

      axios.post(`${this.api.apiUrl}/${this.api.signin_path}`, this.user)
        .then(res => {
          const { token, expired } = res.data;
          document.cookie = `myToken=${token}; expires=${new Date(expired)};`;
          location.href = './products.html';
        }).catch(err => {
          console.dir(err);
          this.isError = true;
        }).then(res => {
          this.isLoading = false;
        });
    }
  },
  mounted() {
    this.checkLogin();
  }
});

app.mount('#app');
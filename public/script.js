const PRICE = 9.99;
const LOAD_NUM = 10;

new Vue({ // eslint-disable-line no-new,no-undef
  el: '#app',
  data: {
    total: 0,
    items: [],
    cart: [],
    results: [],
    newSearch: '90s',
    lastSearch: '',
    loading: false,
    price: PRICE,
  },
  methods: {
    appendItems() {
      if(this.items.length < this.results.length) {
        const append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
        this.items = this.items.concat(append);
      }
    },
    onSubmit() {
      if( this.newSearch.length ) {
        this.items = [];
        this.loading = true;
        this.axios.get('/search/'.concat(this.newSearch)).then((response) => {
          this.lastSearch = this.newSearch;
          this.results = response.data;
          this.appendItems();
          this.items = response.data.slice(0, LOAD_NUM);
          this.loading = false;
        });
      }
      
    },

    addItem(index) {
      this.total += this.price;
      const item = this.items[index];
      let found = false;
      // If item is in the cart, increment qty
      for (let i = 0; i < this.cart.length; i += 1) {
        if (this.cart[i].id === item.id) {
          this.cart[i].qty = this.cart[i].qty + 1;
          found = true;
          break;
        }
      }
      if (!found) {
        this.cart.push({
          id: item.id,
          title: item.title,
          price: this.price,
          qty: 1,
        });
      }
    },
    inc(item) {
      item.qty += 1; // eslint-disable-line
      this.total += this.price;
    },
    dec(item) {
      item.qty -= 1; // eslint-disable-line
      this.total -= this.price;
      if (item.qty <= 0) {
        for (let i = 0; i < this.cart.length; i += 1) {
          if (this.cart[i].id === item.id) {
            this.cart.splice(i, 1);
            break;
          }
        }
      }
    },
  },
  mounted: function () { // eslint-disable-line
    this.onSubmit();
    const elem = document.getElementById('product-list-bottom'); // eslint-disable-line
    const watcher = scrollMonitor.create(elem); // eslint-disable-line
    const vueInstance = this;
    watcher.enterViewport(function() {
      vueInstance.appendItems();
    });
  },
  filters: {
    currency: price => '$ '.concat(price.toFixed(2)),
  },
  computed: {
    noMoreItems() {
      return this.items.length === this.results.length && this.results.length > 0;
    } 
  },
});


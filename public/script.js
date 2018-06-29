new Vue({ // eslint-disable-line no-new,no-undef
  el: '#app',
  data: {
    total: 0,
    items: [
      {
        id: 1,
        title: 'Cool Poster',
        price: 5.5,
      },
      {
        id: 2,
        title: 'Cat Poster',
        price: 12.5,
      },
      {
        id: 3,
        title: 'Pygmy Hedgehog Poster',
        price: 9.00,
      },
    ],
    cart: [],
  },
  methods: {
    addItem: function (index) {
      this.total += this.items[index].price;
      const item = this.items[index];
      let found = false;
      // If item is in the cart, increment qty
      for (let i = 0; i < this.cart.length; i += 1) {
        if (this.cart[i].id === item.id) {
          this.cart[i].qty = this.cart[i].qty + 1;
          found = true;
        }
      }
      if (!found) {
        this.cart.push({
          id: item.id,
          title: item.title,
          price: item.price,
          qty: 1,
        });
      }
    },
  },
  filters: {
    currency: price => '$ '.concat(price.toFixed(2)),
  },
});

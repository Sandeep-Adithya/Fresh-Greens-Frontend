<template>
  <div class="card">
    <h2>{{ name }}</h2>
    <p>₹{{ price }}/{{ unit }}</p>
    <br />
    <b-button
      variant="primary"
      size="sm"
      style="margin-bottom: 3px"
      @click="$bvModal.show('product-' + id)"
    >
      <b-icon-eye-fill></b-icon-eye-fill> View Product
    </b-button>
    <b-button-group v-if="cart.filter((item) => item.id == id)[0]">
      <b-button variant="outline-primary" size="sm" @click="DecCart(id)">
        <b-icon-dash style="margin: 0px"></b-icon-dash>
      </b-button>
      <b-button variant="primary" size="sm" active :pressed="true">
        {{ cart.filter((item) => item.id == id)[0].qty }}
      </b-button>
      <b-button variant="outline-primary" size="sm" @click="IncCart(id)">
        <b-icon-plus style="margin: 0px"></b-icon-plus>
      </b-button>
    </b-button-group>
    <b-button variant="primary" size="sm" v-else @click="IncCart(id)">
      <b-icon-cart4></b-icon-cart4> Add to Cart</b-button
    >
    <span style="display: none" id="pcat">
      {{ products.filter((item) => item.id == id)[0].category }}
    </span>

    <!-- view product modal -->
    <b-modal
      :id="'product-' + String(id)"
      title="View Product"
      centered
      hide-footer
      size="lg"
    >
      <div>
        <h1>{{ name }}</h1>
        <h5>Price: ₹{{ price }}/{{ unit }}</h5>
        <p v-if="products.filter((item) => item.id == id)[0].quantity == 0">
          <b-icon-x-circle-fill></b-icon-x-circle-fill> Out of Stock
        </p>
        <p v-else>
          <b-icon-check-circle-fill></b-icon-check-circle-fill> In Stock
        </p>
        <b-button-group v-if="cart.filter((item) => item.id == id)[0]">
          <b-button variant="outline-primary" @click="DecCart(id)">
            <b-icon-dash style="margin: 0px"></b-icon-dash>
          </b-button>
          <b-button variant="primary" active :pressed="true">
            {{ cart.filter((item) => item.id == id)[0].qty }}
          </b-button>
          <b-button variant="outline-primary" @click="IncCart(id)">
            <b-icon-plus style="margin: 0px"></b-icon-plus>
          </b-button>
        </b-button-group>
        <b-button variant="primary" v-else @click="IncCart(id)">
          <b-icon-cart4></b-icon-cart4> Add to Cart</b-button
        >
      </div>
      <hr />
      <div>
        <h5>Description</h5>
        <p>
          {{ products.filter((item) => item.id == id)[0].description }}
        </p>
        <h5>Expiry Date</h5>
        <p>
          {{ products.filter((item) => item.id == id)[0].expiry }}
        </p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { store } from "../main";
export default {
  name: "ProductCard",
  props: {
    name: String,
    price: Number,
    unit: String,
    id: Number,
  },
  methods: {
    IncCart(id) {
      store.dispatch("IncrementCart", { id });
    },
    DecCart(id) {
      store.dispatch("DecrementCart", { id });
    },
  },
  computed: {
    cart() {
      return store.state.cart;
    },
    categories() {
      return store.state.categories;
    },
    products() {
      return store.state.products;
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1.9px 2.5px rgba(0, 0, 0, 0.017),
    0 4.8px 6.4px rgba(0, 0, 0, 0.024), 0 12.5px 16.7px rgba(0, 0, 0, 0.03),
    0 42px 56px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
}

@media (max-width: 768px) {
  .card {
    grid-column: span 3;
  }
}

@media (min-width: 768px) {
  .card {
    grid-column: span 2;
  }
}

@media (min-width: 1200px) {
  .card {
    grid-column: span 1;
  }
}

.card img {
  width: 100%;
  height: auto;
}

.card h2 {
  margin: 8px 0;
  font-size: 18px;
}

.card p {
  margin: 0;
  font-size: 14px;
}
</style>

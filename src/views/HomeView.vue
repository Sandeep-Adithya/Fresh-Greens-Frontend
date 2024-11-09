<template>
  <div class="home">
    <div class="admin" v-if="role == 'admin'">
      <h1>Manage</h1>
      <div class="categories-container container">
        <div class="category-item" @click="goTo('products')">
          <h2>Products</h2>
        </div>
        <div class="category-item" @click="goTo('categories')">
          <h2>Categories</h2>
        </div>
        <div class="category-item" @click="goTo('units')">
          <h2>Pricing Units</h2>
        </div>
        <div class="category-item" @click="goTo('managers')">
          <h2>Store Managers</h2>
        </div>
        <div class="category-item" @click="goTo('users')">
          <h2>Users</h2>
        </div>
      </div>
    </div>
    <div class="manager" v-else-if="role == 'manager'">
      <h1>Manage</h1>
      <div class="categories-container container">
        <div class="category-item" @click="goTo('products')">
          <h2>Products</h2>
        </div>
        <div class="category-item" @click="goTo('categories')">
          <h2>Categories</h2>
        </div>
        <div class="category-item" @click="goTo('units')">
          <h2>Pricing Units</h2>
        </div>
      </div>
    </div>
    <div class="user" v-else>
      <div>
        <h1>Featured Categories</h1>
        <a style="text-decoration: none" href="/category/0">View All</a>
      </div>
      <div class="categories-container container">
        <CategoryCard
          v-for="category in categories.slice(0, 4)"
          :key="category.id"
          :name="category.name"
          :id="category.id"
        />
      </div>
      <div>
        <h1>Featured Products</h1>
        <h4>{{ flask }}</h4>
      </div>
      <div class="container">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :name="product.name"
          :price="product.price"
          :unit="units.at(product.unit - 1).name"
          :id="product.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryCard from "@/components/CategoryCard.vue";
import ProductCard from "@/components/ProductCard.vue";
import { store } from "../main";
export default {
  name: "HomeView",
  components: {
    ProductCard,
    CategoryCard,
  },
  data() {
    return {
      role: localStorage.getItem("role"),
    };
  },
  methods: {
    goTo(categoryId) {
      this.$router.push(`/manage/${categoryId}`);
    },
  },
  computed: {
    categories() {
      return store.state.categories;
    },
    products() {
      return store.state.products;
    },
    units() {
      return store.state.units;
    },
  },
};
</script>

<style>
.container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 16px;
  margin: 0 auto;
  padding: 16px;
  max-width: 1200px;
}
.categories-container {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
  grid-template-rows: repeat(calc(), 1fr);
  grid-gap: 20px;
}
.category-item {
  padding: 20px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 300px;
}
</style>

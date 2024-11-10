<template>
  <div class="container" style="grid-template-columns: repeat(8, 1fr)">
    <!-- a scrollable area with all the categories in place -->
    <div class="categories-list">
      <br />
      <div
        v-for="category in categories"
        :key="category.id"
        :id="category.id"
        class="category-card"
        @click="goTo(category.id)"
      >
        <h5 style="margin-bottom: 0px">{{ category.name }}</h5>
      </div>
    </div>
    <div class="product-list">
      <b-form-input
        placeholder="Search"
        style="margin-right: 15px"
        v-model="search"
        @keyup="searchItems"
      ></b-form-input>
      <br />
      <div class="container" id="products_contatiner">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :name="product.name"
          :price="product.price"
          :unit="units.at(product.unit - 1)['name']"
          :id="product.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../main";
import ProductCard from "@/components/ProductCard.vue";
export default {
  name: "CategoriesView",
  components: {
    ProductCard,
  },
  data() {
    return {
      search: "",
    };
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
  mounted() {
    this.goTo(this.$route.params.id);
  },

  beforeRouteUpdate(to, from, next) {
    this.goTo(to.params.id);
    next();
  },

  methods: {
    searchItems() {
      if (this.search) {
        const products_contatiner = document.getElementById(
          "products_contatiner"
        );
        const categories_list =
          document.getElementsByClassName("category-card");
        for (let i = 0; i < categories_list.length; i++) {
          categories_list[i].classList
            ? categories_list[i].classList.remove("category-card-selected")
            : (categories_list[i].className = categories_list[
                i
              ].className.replace(
                new RegExp(
                  "(^|\\b)" +
                    "category-card-selected".split(" ").join("|") +
                    "(\\b|$)",
                  "gi"
                ),
                " "
              ));
        }
        for (let i = 0; i < products_contatiner.children.length; i++) {
          const pname = products_contatiner.children[i].childNodes[0].innerHTML;
          console.log(pname);
          if (pname.toLowerCase().includes(this.search.toLowerCase())) {
            products_contatiner.children[i].style.display = "flex";
          } else {
            products_contatiner.children[i].style.display = "none";
          }
        }
      } else {
        const products_contatiner = document.getElementById(
          "products_contatiner"
        );
        for (let i = 0; i < products_contatiner.children.length; i++) {
          products_contatiner.children[i].style.display = "flex";
        }
      }
    },
    goTo(categoryId) {
      const products_contatiner = document.getElementById(
        "products_contatiner"
      );
      for (let i = 0; i < products_contatiner.children.length; i++) {
        const pcat = products_contatiner.children[i].childNodes[5].innerHTML;
        if (pcat == categoryId) {
          products_contatiner.children[i].style.display = "flex";
        } else {
          products_contatiner.children[i].style.display = "none";
        }
      }
      const categories_list = document.getElementsByClassName("category-card");
      for (let i = 0; i < categories_list.length; i++) {
        if (categories_list[i].id == categoryId) {
          categories_list[i].classList
            ? categories_list[i].classList.add("category-card-selected")
            : (categories_list[i].className += " category-card-selected");
        } else {
          categories_list[i].classList
            ? categories_list[i].classList.remove("category-card-selected")
            : (categories_list[i].className = categories_list[
                i
              ].className.replace(
                new RegExp(
                  "(^|\\b)" +
                    "category-card-selected".split(" ").join("|") +
                    "(\\b|$)",
                  "gi"
                ),
                " "
              ));
        }
      }
    },
  },
};
</script>

<style>
.categories-list {
  grid-area: 1/1 / span 1 / span 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
}

.product-list {
  grid-area: 1/3 / span 1 / span 6;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: auto;
}

.category-card:hover {
  transform: scale(1.05);
}

.category-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 90%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 10px;
}

.category-card-selected {
  background-color: #0d6efd;
  color: #fff;
}

.category-card-selected:hover {
  background-color: #0b5ed7;
  color: #fff;
}
</style>

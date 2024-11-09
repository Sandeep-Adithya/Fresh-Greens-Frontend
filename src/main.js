import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vuex from "vuex";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    cart: [],
    products: [],
    categories: [],
    units: [],
    loginstat: localStorage.getItem("auth-token"),
  },
  mutations: {
    fetchall(state) {
      const host = new URL(window.location.href).hostname;
      fetch("http://" + host + ":5000/api/product")
        .then((response) => response.json())
        .then((data) => {
          state.products = data;
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });

      fetch("http://" + host + ":5000/api/category")
        .then((response) => response.json())
        .then((data) => {
          state.categories = data;
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });

      fetch("http://" + host + ":5000/api/unit")
        .then((response) => response.json())
        .then((data) => {
          state.units = data;
        })
        .catch((error) => {
          console.error("Error fetching units:", error);
        });
      if (state.loginstat) {
        fetch("http://" + host + ":5000/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authentication-Token": state.loginstat,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            state.cart = data.cart;
          })
          .catch((error) => {
            console.error("Error fetching cart:", error);
          });
      }
    },
    IncrementCart(state, item) {
      let found = state.cart.find((product) => product.id == item.id);
      if (found) {
        if (
          state.products.find((product) => product.id == item.id).quantity >
          found.qty
        ) {
          found.qty++;
        }
      } else {
        state.cart.push({ id: item.id, qty: 1 });
      }
      if (state.loginstat) {
        const host = new URL(window.location.href).hostname;
        fetch("http://" + host + ":5000/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authentication-Token": state.loginstat,
          },
          body: JSON.stringify({
            cart: [state.cart],
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error("Error adding to cart:", error);
          });
      }
    },
    DecrementCart(state, item) {
      let found = state.cart.find((product) => product.id == item.id);
      if (found) {
        if (found.qty == 1) {
          state.cart.splice(state.cart.indexOf(found), 1);
        } else {
          found.qty--;
        }
      }
      if (state.loginstat) {
        const host = new URL(window.location.href).hostname;
        fetch("http://" + host + ":5000/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authentication-Token": state.loginstat,
          },
          body: JSON.stringify({
            cart: [state.cart],
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error("Error adding to cart:", error);
          });
      }
    },
    ClearCart(state) {
      state.cart = [];
      if (state.loginstat) {
        const host = new URL(window.location.href).hostname;
        fetch("http://" + host + ":5000/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authentication-Token": state.loginstat,
          },
          body: JSON.stringify({
            cart: [""],
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error("Error clearing cart.", error);
          });
      }
    },
  },
  getters: {
    cart_item: (state) => state.cart,
  },
  actions: {
    fetchall(context) {
      context.commit("fetchall");
    },
    IncrementCart(context, item) {
      context.commit("IncrementCart", item);
    },
    DecrementCart(context, item) {
      context.commit("DecrementCart", item);
    },
    ClearCart(context) {
      context.commit("ClearCart");
    },
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

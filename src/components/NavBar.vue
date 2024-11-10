<template>
  <div class="container nav-bottom" style="display: block">
    <div class="nav-pill">
      <b-navbar toggleable="lg" type="light">
        <b-navbar-brand href="/" style="padding-left: 20px">
          Fresh Greens
        </b-navbar-brand>

        <div class="mx-auto">
          <span v-if="role == 'admin'">Welcome Admin</span>
          <span v-else-if="role == 'manager'">Welcome Manager</span>
          <span v-else-if="role == 'user'">Welcome {{ account.name }}</span>
        </div>

        <b-navbar-nav
          style="display: flex; flex-direction: row; -ms-flex-direction: row"
        >
          <b-nav-item v-if="role != 'admin'" v-b-modal.search
            ><b-icon-search font-scale="2"></b-icon-search
          ></b-nav-item>
          <b-nav-item v-if="role != 'admin'" v-b-toggle.cart>
            <b-icon-cart4 font-scale="2"></b-icon-cart4>
          </b-nav-item>
          <b-nav-item v-if="loginstat != null" v-b-toggle.account>
            <b-avatar variant="light"></b-avatar>
          </b-nav-item>
          <b-button variant="primary" v-else v-b-toggle.login> Login </b-button>
        </b-navbar-nav>
      </b-navbar>
    </div>

    <b-sidebar
      id="login"
      title=""
      backdrop-varient="dark"
      backdrop
      no-header
      right
      shadow
    >
      <div class="px-3 py-2">
        <div style="padding: 15px">
          <h2>Login</h2>
        </div>
        <b-form v-if="show">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Email"
          ></b-form-input>
          <div style="padding: 5px"></div>
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            required
            placeholder="Password"
          ></b-form-input>
          <div style="padding: 5px"></div>
          <b-button @click="login" variant="primary">LOGIN</b-button>
          <div style="padding-top: 10px">
            Don't have an account?
            <a
              v-b-modal.signup
              style="color: blue; text-decoration-line: underline"
              >Signup</a
            >
          </div>
          <div style="padding: 5px">
            <a
              v-b-modal.signup-manager
              style="color: blue; text-decoration-line: underline"
              >Signup as Manager</a
            >
          </div>
        </b-form>
      </div>
    </b-sidebar>

    <b-sidebar
      id="cart"
      title="Cart"
      backdrop-varient="dark"
      no-header
      right
      backdrop
      shadow
    >
      <template #default="{ hide }">
        <div class="p-3">
          <div
            style="
              text-align: left;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            "
          >
            <span style="font-size: xx-large">Cart</span>
            <b-button
              variant="outline-danger"
              style="align-self: center"
              block
              @click="hide"
              ><b-icon-x-lg style="vertical-align: middle"></b-icon-x-lg>
            </b-button>
          </div>
        </div>
        <div class="px-3 py-2">
          <div v-for="item in cart_item" :key="item.id">
            <div class="cart-card card">
              <div style="text-align: left">
                <span
                  style="font-size: larger"
                  v-if="products.filter((product) => product.id == item.id)[0]"
                >
                  {{
                    products.filter((product) => product.id == item.id)[0].name
                  }}
                </span>
                <br />
                <span>
                  ₹{{
                    products.filter((product) => product.id == item.id)[0]
                      .price
                  }}/{{
                    units.filter(
                      (unit) =>
                        unit.id ==
                        products.filter((product) => product.id == item.id)[0]
                          .unit
                    )[0].name
                  }}</span
                >
              </div>
              <div>
                <b-button-group>
                  <b-button
                    variant="outline-primary"
                    size="sm"
                    @click="DecCart(item.id)"
                  >
                    -
                  </b-button>
                  <b-button variant="primary" size="sm" active :pressed="true">
                    {{ item.qty }}
                  </b-button>
                  <b-button
                    variant="outline-primary"
                    size="sm"
                    @click="IncCart(item.id)"
                  >
                    +
                  </b-button>
                </b-button-group>
              </div>
            </div>
          </div>
        </div>
        <div v-if="cart_item.length == 0" class="px-3 py-2">
          <div style="text-align: center">
            <span style="font-size: larger">Cart is empty</span>
          </div>
        </div>
      </template>
      <template #footer="{ hide }">
        <div class="px-3 py-2">
          <div
            style="
              text-align: left;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            "
          >
            <span style="font-size: xx-large">Total</span>
            <span style="font-size: xx-large">
              ₹
              {{
                cart_item.reduce(
                  (total, item) =>
                    total +
                    products.filter((product) => product.id == item.id)[0]
                      .price *
                      item.qty,
                  0
                )
              }}
            </span>
          </div>
          <div style="padding: 10px"></div>
          <b-button variant="primary" @click="order(hide)">Checkout</b-button>
        </div>
      </template>
    </b-sidebar>

    <b-sidebar
      id="account"
      title="My Account"
      backdrop
      backdrop-varient="dark"
      no-header
      right
      shadow
    >
      <div class="px-3 py-2">
        <div style="padding: 15px">
          <h2>My Account</h2>
        </div>
        <div style="text-align: left">
          <span>Name : {{ account.name }}</span>
          <br />
          <span>Email : {{ account.email }}</span>
          <br />
          <span>Phone : {{ account.phone }}</span>
          <br />
          <span>Address : {{ account.address }}</span>
        </div>
        <div style="padding: 10px"></div>
        <b-button variant="primary" @click="logout">Logout</b-button>
      </div>
    </b-sidebar>

    <b-modal
      id="signup"
      centered
      title="Signup"
      @show="resetModal"
      @hidden="resetModal"
    >
      <template #modal-footer="{ cancel }">
        <b-button variant="outline-secondary" @click="cancel()"
          >Cancel</b-button
        >
        <b-button variant="primary" @click="signup('user')">Signup</b-button>
      </template>
      <div class="px-3 py-2">
        <b-form>
          <b-form-group
            id="input-group-1"
            label="Name"
            label-for="input-1"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-input
              v-model="form.name"
              id="input-1"
              type="text"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Email"
            label-for="input-2"
            invalid-feedback="Email is required"
            :state="emailState"
          >
            <b-form-input
              v-model="form.email"
              id="input-2"
              type="email"
              :state="emailState"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Password"
            label-for="input-3"
            invalid-feedback="Password is required"
            :state="passwordState"
          >
            <b-form-input
              v-model="form.password"
              id="input-3"
              type="password"
              :state="passwordState"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Confirm Password"
            label-for="input-4"
            invalid-feedback="Confirm Password is required"
            :state="confirmPasswordState"
          >
            <b-form-input
              v-model="form.confirmPassword"
              id="input-4"
              type="password"
              :state="confirmPasswordState"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Phone"
            label-for="input-5"
            invalid-feedback="Phone is required"
            :state="phoneState"
          >
            <b-form-input
              v-model="form.phone"
              id="input-5"
              type="text"
              :state="phoneState"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-6"
            label="Address"
            label-for="input-6"
            invalid-feedback="Address is required"
            :state="addressState"
          >
            <b-form-input
              v-model="form.address"
              id="input-6"
              type="text"
              :state="addressState"
              required
            ></b-form-input>
          </b-form-group>
        </b-form>
      </div>
    </b-modal>

    <b-modal
      id="signup-manager"
      centered
      title="Signup as Manager"
      @show="resetModal"
      @hidden="resetModal"
    >
      <template #modal-footer="{ cancel }">
        <b-button variant="outline-secondary" @click="cancel()"
          >Cancel</b-button
        >
        <b-button variant="primary" @click="signup('manager')">Signup</b-button>
      </template>
      <div class="px-3 py-2">
        <b-form>
          <b-form-group
            id="input-group-1"
            label="Name"
            label-for="input-1"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-input
              v-model="form.name"
              id="input-1"
              type="text"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Email"
            label-for="input-2"
            invalid-feedback="Email is required"
            :state="emailState"
          >
            <b-form-input
              v-model="form.email"
              id="input-2"
              type="email"
              :state="emailState"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Password"
            label-for="input-3"
            invalid-feedback="Password is required"
            :state="passwordState"
          >
            <b-form-input
              v-model="form.password"
              id="input-3"
              type="password"
              :state="passwordState"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Confirm Password"
            label-for="input-4"
            invalid-feedback="Confirm Password is required"
            :state="confirmPasswordState"
          >
            <b-form-input
              v-model="form.confirmPassword"
              id="input-4"
              type="password"
              :state="confirmPasswordState"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Phone"
            label-for="input-5"
            invalid-feedback="Phone is required"
            :state="phoneState"
          >
            <b-form-input
              v-model="form.phone"
              id="input-5"
              type="text"
              :state="phoneState"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-6"
            label="Address"
            label-for="input-6"
            invalid-feedback="Address is required"
            :state="addressState"
          >
            <b-form-input
              v-model="form.address"
              id="input-6"
              type="text"
              :state="addressState"
              required
            ></b-form-input>
          </b-form-group>
        </b-form>
      </div>
    </b-modal>

    <b-modal
      id="search"
      centered
      hide-header
      hide-footer
      hide-body
      @shown="focusSearch"
    >
      <div style="transition: all 0.5s ease-in-out">
        <input
          type="text"
          name="search"
          id="search-input"
          placeholder="Search..."
          @keyup="search"
        />
        <ul
          id="search-results"
          style="display: none; padding: 0px; margin: 0px"
        ></ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
// import { mapActions } from "vuex";
import { store } from "../main";
export default {
  name: "NavBar",
  computed: {
    cart_item() {
      return store.state.cart;
    },
    products() {
      return store.state.products;
    },
    categories() {
      return store.state.categories;
    },
    units() {
      return store.state.units;
    },
  },
  data() {
    return {
      role: localStorage.getItem("role"),
      account: {
        email: localStorage.getItem("email"),
        name: localStorage.getItem("name"),
        phone: localStorage.getItem("phone"),
        address: localStorage.getItem("address"),
      },
      error: null,
      form: {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        phone: "",
        address: "",
      },
      show: true,
      loginstat: localStorage.getItem("auth-token"),
      nameState: null,
      emailState: null,
      passwordState: null,
      confirmPasswordState: null,
      phoneState: null,
      addressState: null,
    };
  },
  methods: {
    focusSearch() {
      document.getElementById("search-input").focus();
    },
    search() {
      const searchInput = document.getElementById("search-input");
      const searchResults = document.getElementById("search-results");
      let count = 0;
      const maxResults = 3;
      // search from products and categories
      const filteredProducts = this.products
        .filter((product) => {
          if (searchInput.value == "") {
            searchResults.style.display = "none";
            searchInput.style.borderBottom = "0px";
            return false;
          }
          searchResults.style.display = "block";
          searchInput.style.borderBottom = "1px solid #454545";
          return product.name
            .toLowerCase()
            .includes(searchInput.value.toLowerCase());
        })
        .sort((a, b) => {
          const scoreA = a.name
            .toLowerCase()
            .split(searchInput.value.toLowerCase()).length;
          const scoreB = b.name
            .toLowerCase()
            .split(searchInput.value.toLowerCase()).length;
          return scoreB - scoreA;
        });
      const filteredCategories = this.categories
        .filter((category) => {
          if (searchInput.value == "") {
            searchResults.style.display = "none";
            searchInput.style.borderBottom = "0px";
            return false;
          }
          searchResults.style.display = "block";
          searchInput.style.borderBottom = "1px solid #454545";
          return category.name
            .toLowerCase()
            .includes(searchInput.value.toLowerCase());
        })
        .sort((a, b) => {
          const searchTerm = searchInput.value.toLowerCase();
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          const scoreA = nameA.startsWith(searchTerm) ? 1 : 0;
          const scoreB = nameB.startsWith(searchTerm) ? 1 : 0;
          return scoreB - scoreA || nameA.localeCompare(nameB);
        });

      const filteredItems = [...filteredProducts, ...filteredCategories].sort(
        (a, b) => {
          const searchTerm = searchInput.value.toLowerCase();
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          const scoreA = nameA.startsWith(searchTerm) ? 1 : 0;
          const scoreB = nameB.startsWith(searchTerm) ? 1 : 0;
          return scoreB - scoreA || nameA.localeCompare(nameB);
        }
      );

      searchResults.innerHTML = "";
      filteredItems.forEach((item) => {
        if (count >= maxResults) return;
        const li = document.createElement("li");
        li.style.listStyleType = "none";
        li.style.marginTop = "8px";
        const div = document.createElement("a");
        if (item.price) {
          div.href = "#";
          div.addEventListener("click", () => {
            this.$bvModal.show("product-" + item.id);
          });
        } else {
          div.addEventListener("click", () => {
            this.$router.push({ name: "category", params: { id: item.id } });
            this.$bvModal.hide("search");
          });
        }
        div.style.textDecoration = "none";
        div.style.color = "#232529";
        div.style.display = "flex";
        div.style.flexDirection = "row";
        div.style.justifyContent = "space-between";
        div.style.alignItems = "center";
        div.style.border = "1px solid #b7b7b7";
        div.addEventListener("mouseover", () => {
          div.style.backgroundColor = "#f5f5f5";
        });
        div.addEventListener("mouseout", () => {
          div.style.backgroundColor = "#fff";
        });
        div.style.boxShadow =
          "0 1.9px 2.5px rgba(0, 0, 0, 0.017), 0 4.8px 6.4px rgba(0, 0, 0, 0.024), 0 12.5px 16.7px rgba(0, 0, 0, 0.03), 0 42px 56px rgba(0, 0, 0, 0.05)";
        div.style.padding = "10px";
        div.style.borderRadius = "5px";
        const div1 = document.createElement("div");
        const name = document.createElement("h5");
        name.style.margin = "0px";
        name.innerHTML = item.name;
        div1.appendChild(name);
        if (item.price) {
          const sub = document.createElement("h7");
          sub.style.marginBottom = "0px";
          sub.innerHTML =
            "₹" +
            item.price +
            "/" +
            this.units.find((unit) => unit.id == item.unit).name;
          div1.appendChild(sub);
        }
        div.appendChild(div1);
        const badge = document.createElement("span");
        badge.className = "badge badge-pill";
        badge.style.backgroundColor = item.price ? "#007bff" : "#70757c";
        badge.innerHTML = item.price ? "Product" : "Category";
        div.appendChild(badge);
        li.appendChild(div);
        searchResults.appendChild(li);
        count++;
      });

      if (filteredProducts.length == 0 && filteredCategories.length == 0) {
        const li = document.createElement("li");
        li.style.listStyleType = "none";
        li.style.marginTop = "8px";
        const div = document.createElement("div");
        div.style.color = "#fff";
        div.style.border = "1px solid #b7b7b7";
        div.style.display = "flex";
        div.style.flexDirection = "row";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";
        div.style.backgroundColor = "#454545";
        div.style.boxShadow =
          "0 1.9px 2.5px rgba(0, 0, 0, 0.017), 0 4.8px 6.4px rgba(0, 0, 0, 0.024), 0 12.5px 16.7px rgba(0, 0, 0, 0.03), 0 42px 56px rgba(0, 0, 0, 0.05)";
        div.style.padding = "10px";
        div.style.borderRadius = "5px";
        const h1 = document.createElement("h5");
        h1.style.marginBottom = "0px";
        h1.innerHTML = "No results found";
        div.appendChild(h1);
        li.appendChild(div);
        searchResults.appendChild(li);
      }

      if (
        filteredProducts.length > maxResults ||
        filteredCategories.length > maxResults
      ) {
        const li = document.createElement("li");
        li.style.listStyleType = "none";
        li.style.marginTop = "8px";
        const div = document.createElement("a");
        div.href = "/category/";
        div.style.textDecoration = "none";
        div.style.color = "#232529";
        div.style.border = "1px solid #b7b7b7";
        div.style.display = "flex";
        div.style.flexDirection = "row";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";
        div.addEventListener("mouseover", () => {
          div.style.backgroundColor = "#f5f5f5";
        });
        div.addEventListener("mouseout", () => {
          div.style.backgroundColor = "#fff";
        });
        div.style.boxShadow =
          "0 1.9px 2.5px rgba(0, 0, 0, 0.017), 0 4.8px 6.4px rgba(0, 0, 0, 0.024), 0 12.5px 16.7px rgba(0, 0, 0, 0.03), 0 42px 56px rgba(0, 0, 0, 0.05)";
        div.style.padding = "10px";
        div.style.borderRadius = "5px";
        const h1 = document.createElement("h5");
        h1.style.marginBottom = "0px";
        h1.innerHTML = "Show all results";
        div.appendChild(h1);
        li.appendChild(div);
        searchResults.appendChild(li);
      }
    },
    async login() {
      const host = new URL(window.location.href).hostname;
      const res = await fetch("http://" + host + ":5000/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("auth-token", data.token);
        localStorage.setItem("role", data.role);
        this.loginstat = localStorage.getItem("auth-token");
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("address", data.address);
        localStorage.setItem("phone", data.phone);
        window.location.reload();
      } else {
        this.error = data.message;
        alert(this.error);
      }
    },
    logout() {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("address");
      localStorage.removeItem("phone");
      this.loginstat = null;
      if (new URL(window.location.href).pathname != "/") {
        this.$router.push("/");
      } else {
        window.location.reload();
      }
    },
    resetModal() {
      this.form.email = "";
      this.form.password = "";
      this.form.confirmPassword = "";
      this.form.name = "";
      this.form.phone = "";
      this.form.address = "";
    },
    async signup(role) {
      const host = new URL(window.location.href).hostname;
      await fetch("http://" + host + ":5000/register/" + role, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.form),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            this.error = data.error;
          } else {
            this.$bvModal.hide("signup");
            this.$bvModal.hide("signup-manager");
            alert(data.message);
          }
        })
        .catch((err) => {
          this.error = err;
          alert(this.error);
        });
    },
    IncCart(id) {
      store.dispatch("IncrementCart", { id });
    },
    DecCart(id) {
      store.dispatch("DecrementCart", { id });
    },
    async order(hide) {
      const host = new URL(window.location.href).hostname;
      const res = await fetch("http://" + host + ":5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": this.loginstat,
        },
        body: JSON.stringify({
          cart: [this.cart_item],
        }),
      });
      const data = await res.json();
      if (res.ok) {
        store.dispatch("ClearCart");
        hide();
        alert(data.message);
      } else {
        alert(data.message);
      }
    },
  },
};
</script>

<style>
container-fluid {
  max-width: 1600px;
}

.nav-pill {
  background-color: #ffffff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.4);
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: content-box;
  border-radius: 15px;
}

.cart-card {
  flex-direction: row !important;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
}
.search-box {
  position: absolute;
  display: block;
  width: 300px;
  transition: all 0.3s ease-in-out;
}

#search-input {
  width: 100%;
  border: 0px solid #ddd;
  font-size: larger;
  /* transistion */
  transition: all 0.3s ease-in-out;
}

#search-input:focus {
  outline: none;
}

#nav-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 1000;
}
</style>

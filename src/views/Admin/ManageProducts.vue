<template>
  <div>
    <h1>Manage Products</h1>
    <b-button v-b-modal.add-product class="b-right"
      ><b-icon-plus></b-icon-plus
    ></b-button>
    <b-modal
      id="add-product"
      centered
      title="Add Product"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="aform" @submit.stop.prevent="handleSubmit">
        <b-form-group
          id="input-group-1"
          label="Product Name:"
          label-for="product-name"
          invalid-feedback="Name is required"
          :state="form_state.nameState"
        >
          <b-form-input
            v-model="form.productName"
            id="product-name"
            type="text"
            :state="form_state.nameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Quantity:"
          label-for="product-quantity"
          invalid-feedback="Quantity is required"
          :state="form_state.quantityState"
        >
          <b-form-input
            v-model="form.productQuantity"
            id="product-quantity"
            type="number"
            :state="form_state.quantityState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Description:"
          label-for="product-description"
          invalid-feedback="Description is required"
          :state="form_state.descriptionState"
        >
          <b-form-input
            v-model="form.productDescription"
            id="product-description"
            type="text"
            :state="form_state.descriptionState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Category:"
          invalid-feedback="Category is required"
          :state="form_state.categoryState"
          label-for="product-category"
        >
          <b-form-select
            v-model="form.productCategory"
            :options="categories"
            id="product-category"
            :state="form_state.categoryState"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Price:"
          label-for="product-price"
          invalid-feedback="Price is required"
          :state="form_state.priceState"
        >
          <b-form-input
            v-model="form.productPrice"
            id="product-price"
            type="number"
            :state="form_state.priceState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="Unit:"
          label-for="product-unit"
          invalid-feedback="Unit is required"
          :state="form_state.unitState"
        >
          <b-form-select
            v-model="form.productUnit"
            :options="units"
            id="product-unit"
            type="text"
            :state="form_state.unitState"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-7"
          label="Expiry:"
          label-for="product-expiry"
          invalid-feedback="Expiry is required"
          :state="form_state.expiryState"
        >
          <b-form-input
            v-model="form.productExpiry"
            id="product-expiry"
            type="date"
            :state="form_state.expiryState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal id="edit-modal" centered title="Edit Product" @ok="handleEdit">
      <form ref="eform" @submit.stop.prevent="handleEdit">
        <b-form-group
          id="input-group-1"
          label="Product Name:"
          label-for="product-name"
          invalid-feedback="Name is required"
          :state="form_state.nameState"
        >
          <b-form-input
            v-model="form.productName"
            id="product-name"
            type="text"
            :state="form_state.nameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Quantity:"
          label-for="product-quantity"
          invalid-feedback="Quantity is required"
          :state="form_state.quantityState"
        >
          <b-form-input
            v-model="form.productQuantity"
            id="product-quantity"
            type="number"
            :state="form_state.quantityState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Description:"
          label-for="product-description"
          invalid-feedback="Description is required"
          :state="form_state.descriptionState"
        >
          <b-form-input
            v-model="form.productDescription"
            id="product-description"
            type="text"
            :state="form_state.descriptionState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="Category:"
          invalid-feedback="Category is required"
          :state="form_state.categoryState"
          label-for="product-category"
        >
          <b-form-select
            v-model="form.productCategory"
            :options="categories"
            id="product-category"
            :state="form_state.categoryState"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Price:"
          label-for="product-price"
          invalid-feedback="Price is required"
          :state="form_state.priceState"
        >
          <b-form-input
            v-model="form.productPrice"
            id="product-price"
            type="number"
            :state="form_state.priceState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="Unit:"
          label-for="product-unit"
          invalid-feedback="Unit is required"
          :state="form_state.unitState"
        >
          <b-form-select
            v-model="form.productUnit"
            :options="units"
            id="product-unit"
            type="text"
            :state="form_state.unitState"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-7"
          label="Expiry:"
          label-for="product-expiry"
          invalid-feedback="Expiry is required"
          :state="form_state.expiryState"
        >
          <b-form-input
            v-model="form.productExpiry"
            id="product-expiry"
            type="date"
            :state="form_state.expiryState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <div class="container" style="display: block">
      <div style="display: flex; flex-direction: row">
        <b-form-input
          placeholder="Search"
          style="margin-right: 15px"
          v-model="search"
          @keyup="searchItems"
        ></b-form-input>
        <b-button @click="export_csv()">Export</b-button>
      </div>
      <br />
      <b-table :fields="fields" :items="products">
        <template #cell(actions)="row">
          <b-button @click="EditBtn(row.item)" style="margin-right: 5px">
            <b-icon-pencil></b-icon-pencil>
          </b-button>
          <b-button @click="deleteProducts(row.item)">
            <b-icon-trash></b-icon-trash>
          </b-button>
        </template>
        <template #cell(category)="row">
          {{ categories.at(row.item.category)["text"] }}
        </template>
        <template #cell(unit)="row">
          {{ units.at(row.item.unit)["text"] }}
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageCategories",
  data() {
    return {
      products: [],
      error: null,
      token: localStorage.getItem("auth-token"),
      fields: [
        "id",
        "name",
        "price",
        "quantity",
        "description",
        "category",
        "unit",
        "expiry",
        "created_at",
        "updated_at",
        "actions",
      ],
      form: {
        productName: null,
        productCategory: null,
        productPrice: null,
        productQuantity: null,
        productDescription: null,
        productUnit: null,
        productExpiry: null,
      },
      categories: [],
      units: [],
      form_state: {
        nameState: null,
        priceState: null,
        quantityState: null,
        descriptionState: null,
        categoryState: null,
        unitState: null,
        expiryState: null,
      },
      currentEdit: null,
      search: "",
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    searchItems() {
      if (this.search) {
        this.products = this.products.filter((item) => {
          return item.name.toLowerCase().includes(this.search.toLowerCase());
        });
      } else {
        this.fetchProducts();
      }
    },
    fetchProducts() {
      const host = new URL(window.location.href).hostname;
      fetch("http://" + host + ":5000/api/product")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.products = data;
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });

      fetch("http://" + host + ":5000/api/category")
        .then((response) => response.json())
        .then((data) => {
          this.categories = [];
          this.categories.push({ text: "Select a Category", value: null });
          data.forEach((category) => {
            if (category.active) {
              this.categories.push({ text: category.name, value: category.id });
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });

      fetch("http://" + host + ":5000/api/unit")
        .then((response) => response.json())
        .then((data) => {
          this.units = [];
          this.units.push({ text: "Select a Unit", value: null });
          data.forEach((unit) => {
            this.units.push({ text: unit.name, value: unit.id });
          });
        })
        .catch((error) => {
          console.error("Error fetching units:", error);
        });
    },
    checkAddFormValidity() {
      const valid = this.$refs.aform.checkValidity();
      this.form_state.nameState = valid;
      this.form_state.priceState = valid;
      this.form_state.quantityState = valid;
      this.form_state.descriptionState = valid;
      this.form_state.categoryState = valid;
      this.form_state.unitState = valid;
      this.form_state.expiryState = valid;
      return valid;
    },
    checkEditFormValidity() {
      const valid = this.$refs.eform.checkValidity();
      this.form_state.nameState = valid;
      this.form_state.priceState = valid;
      this.form_state.quantityState = valid;
      this.form_state.descriptionState = valid;
      this.form_state.categoryState = valid;
      this.form_state.unitState = valid;
      this.form_state.expiryState = valid;
      return valid;
    },
    resetModal() {
      this.form.productName = null;
      this.form.productCategory = null;
      this.form.productPrice = null;
      this.form.productQuantity = null;
      this.form.productDescription = null;
      this.form.productUnit = null;
      this.form.productExpiry = null;
      this.nameState = null;
      this.priceState = null;
      this.quantityState = null;
      this.descriptionState = null;
      this.categoryState = null;
      this.unitState = null;
      this.expiryState = null;
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkAddFormValidity()) {
        return;
      }
      const host = new URL(window.location.href).hostname;
      const res = await fetch("http://" + host + ":5000/api/product", {
        method: "POST",
        headers: {
          "Authentication-Token": this.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.form.productName,
          category: this.form.productCategory,
          price: this.form.productPrice,
          quantity: this.form.productQuantity,
          description: this.form.productDescription,
          unit: this.form.productUnit,
          expiry: this.form.productExpiry,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        this.fetchProducts();
        alert(data.message);
        this.$nextTick(() => {
          this.$bvModal.hide("add-product");
        });
      } else {
        // Handle error
        if (data.message) {
          this.error = data.message;
        } else {
          this.error = "Error adding product";
        }
        alert(data.message);
        this.$nextTick(() => {
          this.$bvModal.hide("add-product");
        });
        console.error(data.message);
      }
    },
    handleEdit(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.editProducts();
    },
    EditBtn(product) {
      this.$nextTick(() => {
        this.$bvModal.show("edit-modal");
      });
      this.currentEdit = product;
      this.form.productName = product.name;
      this.form.productCategory = product.category;
      this.form.productPrice = product.price;
      this.form.productQuantity = product.quantity;
      this.form.productDescription = product.description;
      this.form.productUnit = product.unit;
      this.form.productExpiry = product.expiry;
    },
    async editProducts() {
      const product = this.currentEdit;
      if (!this.checkEditFormValidity()) {
        return;
      }
      const host = new URL(window.location.href).hostname;
      const res = await fetch(
        `http://` + host + `:5000/api/product/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Authentication-Token": this.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.form.productName,
            category: this.form.productCategory,
            price: this.form.productPrice,
            quantity: this.form.productQuantity,
            description: this.form.productDescription,
            unit: this.form.productUnit,
            expiry: this.form.productExpiry,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        // Refresh the list of products
        this.fetchProducts();
        alert(data.message);
        this.$nextTick(() => {
          this.$bvModal.hide("edit-modal");
        });
      } else {
        // Handle error
        if (data.message) {
          this.error = data.message;
        } else {
          this.error = "Error editing product";
        }
        alert(data.message);
        this.$nextTick(() => {
          this.$bvModal.hide("edit-modal");
        });
        console.error(data.message);
      }
    },
    async deleteProducts(product) {
      const host = new URL(window.location.href).hostname;
      const res = await fetch(
        `http://` + host + `:5000/api/product/${product.id}`,
        {
          method: "DELETE",
          headers: {
            "Authentication-Token": this.token,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        // Refresh the list of products
        this.fetchProducts();
        alert(data.message);
      } else {
        // Handle error
        if (data.message) {
          this.error = data.message;
        } else {
          this.error = "Error deleting product";
        }
        alert(data.message);
        console.error(data.message);
      }
    },
    async export_csv() {
      const host = new URL(window.location.href).hostname;
      const res = await fetch(`http://` + host + `:5000/download-csv`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": this.token,
        },
      });
      const data = await res.json();
      if (res.ok) {
        const taskId = data["task-id"];
        const intv = setInterval(async () => {
          const csv_res = await fetch(
            `http://` + host + `:5000/download-csv/${taskId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authentication-Token": this.token,
              },
            }
          );
          if (csv_res.ok) {
            this.isWaiting = false;
            clearInterval(intv);
            window.location.href =
              `http://` + host + `:5000/download-csv/${taskId}`;
          }
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
.b-right {
  display: block; /* Hidden by default */
  position: fixed; /* Fixed/sticky position */
  bottom: 20px; /* Place the button at the bottom of the page */
  right: 30px; /* Place the button 30px from the right */
  z-index: 99; /* Make sure it does not overlap */
  padding: 15px; /* Some padding */
  border-radius: 10px; /* Rounded corners */
  font-size: 18px;
}
</style>

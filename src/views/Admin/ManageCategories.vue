<template>
  <div>
    <h1>Manage Categories</h1>
    <b-button v-b-modal.add-category class="b-right"
      ><b-icon-plus></b-icon-plus
    ></b-button>
    <b-modal
      id="add-category"
      centered
      title="Add Category"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          id="input-group-1"
          label="Category Name:"
          label-for="input-1"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            v-model="categoryName"
            id="category-name"
            type="text"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <div class="container" style="display: block">
      <b-form-input
        placeholder="Search"
        style="margin-right: 15px"
        v-model="search"
        @keyup="searchItems"
      ></b-form-input>
      <br />
      <b-table :fields="fields" :items="categories">
        <template #cell(active)="row">
          <b-icon-check-circle
            v-if="row.item.active == true"
            variant="success"
          ></b-icon-check-circle>
          <b-icon-x-circle v-else variant="danger"></b-icon-x-circle>
        </template>
        <template #cell(action)="row">
          <b-button-group v-if="role == 'admin'" size="sm">
            <b-button
              v-if="row.item.active"
              variant="outline-danger"
              @click="activate(row.item)"
            >
              Deactivate
            </b-button>
            <b-button
              v-else
              variant="outline-success"
              @click="activate(row.item)"
            >
              Activate
            </b-button>
          </b-button-group>
          <b-button
            @click="editCategory(row.item)"
            style="margin-left: 5px; margin-right: 5px"
          >
            <b-icon-pencil></b-icon-pencil>
          </b-button>
          <b-button v-if="role == 'admin'" @click="deleteCategory(row.item)">
            <b-icon-trash></b-icon-trash>
          </b-button>
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
      categories: [],
      categoryName: "",
      nameState: null,
      error: null,
      token: localStorage.getItem("auth-token"),
      fields: ["id", "name", "active", "action"],
      requests: [],
      role: localStorage.getItem("role"),
      search: "",
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    searchItems() {
      if (this.search) {
        this.categories = this.categories.filter((item) => {
          return item.name.toLowerCase().includes(this.search.toLowerCase());
        });
      } else {
        this.fetchCategories();
      }
    },
    fetchCategories() {
      const host = new URL(window.location.href).hostname;
      fetch("http://" + host + ":5000/api/category")
        .then((response) => response.json())
        .then((data) => {
          this.categories = data;
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.categoryName = "";
      this.nameState = null;
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Make an API request to add a new category
      const host = new URL(window.location.href).hostname;
      const res = await fetch("http://" + host + ":5000/api/category", {
        method: "POST",
        headers: {
          "Authentication-Token": this.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.categoryName,
          active: 0,
          request_action: 0,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        this.fetchCategories();
        alert(data.message);
        this.$nextTick(() => {
          this.$bvModal.hide("add-category");
        });
      } else {
        alert(data.message);
        this.$nextTick(() => {
          this.$bvModal.hide("add-category");
        });
        console.error(data.message);
      }
    },
    async editCategory(category) {
      // change the category name to text field and save button in actions
      const newName = prompt("Enter new category name", category.name);
      if (!newName) {
        return;
      }
      const host = new URL(window.location.href).hostname;
      const res = await fetch(
        `http://` + host + `:5000/api/category/${category.id}`,
        {
          method: "PUT",
          headers: {
            "Authentication-Token": this.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
            active: 0,
            request_action: category.request_action,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        // Refresh the list of categories
        this.fetchCategories();
        alert(data.message);
      } else {
        // Handle error
        if (data.message) {
          this.error = data.message;
        } else {
          this.error = "Error editing category";
        }
        alert(data.message);
        console.error(data.message);
      }
    },
    async deleteCategory(category) {
      // delete confirmation
      if (!confirm("Are you sure you want to delete this category?")) {
        return;
      }
      const host = new URL(window.location.href).hostname;
      const res = await fetch(
        `http://` + host + `:5000/api/category/${category.id}`,
        {
          method: "DELETE",
          headers: {
            "Authentication-Token": this.token,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        // Refresh the list of categories
        this.fetchCategories();
        alert(data.message);
      } else {
        // Handle error
        if (data.message) {
          this.error = data.message;
        } else {
          this.error = "Error deleting category";
        }
        alert(data.message);
        console.error(data.message);
      }
    },
    async activate(category) {
      // change the category name to text field and save button in actions
      const host = new URL(window.location.href).hostname;
      const res = await fetch(
        `http://` + host + `:5000/api/category/${category.id}`,
        {
          method: "PUT",
          headers: {
            "Authentication-Token": this.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: category.name,
            active: !category.active,
            request_action: category.request_action,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        // Refresh the list of categories
        this.fetchCategories();
        alert(data.message);
      } else {
        // Handle error
        if (data.message) {
          this.error = data.message;
        } else {
          this.error = "Error editing category";
        }
        alert(data.message);
        console.error(data.message);
      }
    },
  },
};
</script>

<style scoped>
.b-right {
  display: block;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  padding: 15px;
  border-radius: 10px;
  font-size: 18px;
}
</style>

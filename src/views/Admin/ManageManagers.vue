<template>
  <div>
    <h1>Manage Store Managers</h1>
    <div class="container" style="display: block">
      <b-form-input
        placeholder="Search"
        style="margin-right: 15px"
        v-model="search"
        @keyup="searchItems"
      ></b-form-input>
      <br />
      <b-table :fields="fields" :items="users">
        <template #cell(action)="row">
          <b-button-group size="sm">
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
          <b-button @click="deleteUser(row.item)" style="margin-left: 5px">
            <b-icon-trash></b-icon-trash>
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageUsers",
  data() {
    return {
      users: [],
      search: "",
      error: null,
      token: localStorage.getItem("auth-token"),
      fields: [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone Number" },
        { key: "address", label: "Address" },
        { key: "action", label: "Action" },
      ],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    searchItems() {
      if (this.search) {
        this.users = this.users.filter((user) => {
          return user.name.toLowerCase().includes(this.search.toLowerCase());
        });
      } else {
        this.fetchUsers();
      }
    },
    fetchUsers() {
      this.error = null;
      const host = new URL(window.location.href).hostname;
      fetch("http://" + host + ":5000/api/user/manager", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": this.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            this.error = data.error;
          } else {
            this.users = data;
          }
        })
        .catch((err) => {
          this.error = err;
        });
    },
    deleteUser(user) {
      this.error = null;
      const host = new URL(window.location.href).hostname;
      fetch("http://" + host + ":5000/api/user/" + user.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": this.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            this.error = data.error;
            alert(this.error);
          } else {
            alert(data.message);
            this.fetchUsers();
          }
        })
        .catch((err) => {
          this.error = err;
          alert(this.error);
        });
    },
    activate(user) {
      this.error = null;
      const host = new URL(window.location.href).hostname;
      fetch("http://" + host + ":5000/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authentication-Token": this.token,
        },
        body: JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          active: user.active,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            this.error = data.error;
            alert(this.error);
          } else {
            alert(data.message);
            this.fetchUsers();
          }
        })
        .catch((err) => {
          this.error = err;
          alert(this.error);
        });
    },
  },
};
</script>

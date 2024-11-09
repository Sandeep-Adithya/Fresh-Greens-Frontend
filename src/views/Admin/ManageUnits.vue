<template>
  <div>
    <h1>Manage Units</h1>
    <b-button v-b-modal.add-unit class="b-right"
      ><b-icon-plus></b-icon-plus
    ></b-button>
    <b-modal
      id="add-unit"
      centered
      title="Add Unit"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          id="input-group-1"
          label="Unit Name:"
          label-for="input-1"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            v-model="unitName"
            id="unit-name"
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
      <b-table :fields="fields" :items="units">
        <template #cell(action)="row">
          <b-button @click="editUnit(row.item)" style="margin-right: 5px">
            <b-icon-pencil></b-icon-pencil>
          </b-button>
          <b-button @click="deleteUnit(row.item)">
            <b-icon-trash></b-icon-trash>
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageUnits",
  data() {
    return {
      unitName: "",
      nameState: null,
      units: [],
      fields: [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "action", label: "Action" },
      ],
      unitId: null,
      token: localStorage.getItem("auth-token"),
      search: "",
    };
  },
  mounted() {
    this.getUnits();
  },
  methods: {
    searchItems() {
      if (this.search) {
        this.units = this.units.filter((unit) => {
          return unit.name.toLowerCase().includes(this.search.toLowerCase());
        });
      } else {
        this.getUnits();
      }
    },
    async getUnits() {
      const host = new URL(window.location.href).hostname;
      fetch("http://" + host + ":5000/api/unit")
        .then((res) => res.json())
        .then((data) => {
          this.units = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.unitName = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    async handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      const host = new URL(window.location.href).hostname;
      const res = await fetch("http://" + host + ":5000/api/unit", {
        method: "POST",
        headers: {
          "Authentication-Token": this.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: this.unitName }),
      });
      const data = await res.json();
      if (res.ok) {
        this.getUnits();
        this.$nextTick(() => {
          this.$bvModal.hide("add-unit");
        });
      } else {
        this.error = data.message;
        alert(data.message);
        this.$nextTick(() => {
          this.$bvModal.hide("add-category");
        });
        console.error(data.message);
      }
    },
    async editUnit(unit) {
      const newName = prompt("Enter new category name", unit.name);
      if (!newName) {
        return;
      }
      const host = new URL(window.location.href).hostname;
      const res = await fetch("http://" + host + ":5000/api/unit/" + unit.id, {
        method: "PUT",
        headers: {
          "Authentication-Token": this.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });
      const data = await res.json();
      if (res.ok) {
        this.getUnits();
        alert(data.message);
      } else {
        alert(data.message);
        console.error(data.message);
      }
    },
    async deleteUnit(unit) {
      const host = new URL(window.location.href).hostname;
      const res = await fetch("http://" + host + ":5000/api/unit/" + unit.id, {
        method: "DELETE",
        headers: {
          "Authentication-Token": this.token,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        this.getUnits();
        alert(data.message);
      } else {
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

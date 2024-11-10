import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import ManageProducts from "@/views/Admin/ManageProducts.vue";
import ManageUsers from "@/views/Admin/ManageUsers.vue";
import ManageCategories from "@/views/Admin/ManageCategories.vue";
import ManageUnits from "@/views/Admin/ManageUnits.vue";
import ManageManagers from "@/views/Admin/ManageManagers.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/category/:id",
    name: "category",
    component: CategoriesView,
  },
  {
    path: "/manage/products",
    name: "manage-products",
    component: ManageProducts,
  },
  {
    path: "/manage/users",
    name: "manage-users",
    component: ManageUsers,
  },
  {
    path: "/manage/categories",
    name: "manage-categories",
    component: ManageCategories,
  },
  {
    path: "/manage/units",
    name: "manage-units",
    component: ManageUnits,
  },
  {
    path: "/manage/managers",
    name: "manage-managers",
    component: ManageManagers,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

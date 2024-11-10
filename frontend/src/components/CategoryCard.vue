<template>
  <div class="category-item" :key="id" @click="goToCategory(id)">
    <h2 style="margin-block-end: 0px">{{ name }}</h2>
  </div>
</template>

<script>
export default {
  name: "CategoryCard",
  props: {
    name: String,
    id: Number,
  },
  methods: {
    goToCategory(categoryId) {
      // this.$router.push(`/category/${categoryId}`);
      this.$router.push({ name: "category", params: { id: categoryId } });
    },
  },
};
</script>

<style scoped>
.category-item {
  padding: 20px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 300px;
  vertical-align: middle;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  /* shadow */
  box-shadow: 0 1.9px 2.5px rgba(0, 0, 0, 0.017),
    0 4.8px 6.4px rgba(0, 0, 0, 0.024), 0 12.5px 16.7px rgba(0, 0, 0, 0.03),
    0 42px 56px rgba(0, 0, 0, 0.05);
}

.category-item:hover {
  background-color: #f5f5f5;
}
</style>

<template>
<div></div>
</template>

<script>
export default {
  name: "index",
  beforeCreate() {
    const {params, query} = this.$route
    const {path} = params
    this.$router.replace({path: '/' + path, query})
  }
}
</script>

<style scoped>

</style>
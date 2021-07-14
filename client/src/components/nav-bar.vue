<template>
  <header class="nav-bar">
    <button class="nav-bar-back" @click="$emit('back')"> <font-awesome-icon icon="arrow-left"></font-awesome-icon> </button>
    <h1 class="title">{{ title }}</h1>
  </header>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  name: 'nav-bar',
  components: { FontAwesomeIcon },
  props: {
    title: {
      type: String
    },
  }
};
</script>

<style scoped lang="scss">
  .nav-bar {
    position: relative;
    display: flex;
    align-items: center;
    background: #fff;
    padding: 10px 15px;
    box-shadow: 0 0 6px 1px rgba(0,0,0,0.1);
    z-index: 1;
    max-height: 60px;
  }

  .nav-bar-back {
    outline: none;
    border: none;
    background: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      background: #eee;
    }
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
  }
</style>

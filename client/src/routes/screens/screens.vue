<template>
  <div class="screens">
    <div class="screens-grid">
      <screen-item v-for="(screenshot, index) in log(screenshots)"
        :key="index"
        :screenshot="screenshot.pic"
        :html="screenshot.html"
        :selector="screenshot.selector"
      >
      </screen-item>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import ScreenItem from './screen-item';

  export default {
    components: {  ScreenItem },
    name: 'screens',
    computed: {
      ...mapState(['screenshots'])
    },
    methods: {
      log(any) {
        console.log(any);
        return any
      }
    }
  };
</script>

<style scoped>
  .screens {
    background: #f9f9f9;
    min-height: 100%;
  }

  .screens-grid {
    display: grid;
    grid-gap: 10px;
    padding: 30px;
    justify-items:center;
    grid-template-columns: repeat(auto-fill, 232px);
  }
</style>

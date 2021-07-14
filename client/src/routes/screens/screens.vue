<template>
  <div class="screens">
    <div class="screens-grid">
      <screen-item v-for="(screenshot, index) in screenshots"
        :order="index"
        :key="index"
        :screenshot="screenshot.pic"
      >
      </screen-item>
    </div>
    <loader
        v-if="!isScreensGrabCompleted"
        v-bind:class="{ absolute: screenshots.length < 1 }"
        class="screens-loader">

    </loader>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import ScreenItem from './screen-item';
  import Loader from '@/components/loader';

  export default {
    components: {  ScreenItem, Loader },
    name: 'screens',
    computed: {
      ...mapState(['screenshots', 'isScreensGrabCompleted'])
    }
  };
</script>

<style scoped lang="scss">
  .screens {
    background: #f9f9f9;
    min-height: 100%;
    padding: 30px;
  }

  .screens-grid {
    display: grid;
    grid-gap: 10px;
    justify-items:center;
    grid-template-columns: repeat(auto-fill, 232px);
  }

  .screens-loader {
    --size: 20px;
    margin: 15px auto;
    display: block;

    &.absolute {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: 0;
      transform: translate(-50%, -50%);
    }
  }
</style>

<template>
  <div class="screens">
    <div class="screens-grid">
      <screen-item v-for="(screenshot, index) in screenshots"
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
  import Store from '@/store';
  import { SetScreenshots } from '@/store/actions';
  import ScreenItem from './screen-item';

  export default {
    components: {  ScreenItem },
    name: 'screens',
    computed: {
      ...mapState(['screenshots'])
    },
    beforeCreate() {
      Store.commit('setScreenshots', new SetScreenshots([{
        html: 'qwe',
        pic: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
        selector: ''
      }]))
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

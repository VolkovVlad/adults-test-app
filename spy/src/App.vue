<template>
  <div class="wrapper" v-if="isInside">
    <button class="electron-opener" @click="open">
      Open in separate window
    </button>
    <webview
        ref="clientRoot"
        class="main-app"
        src="http://localhost:3000"
        disablewebsecurity
        nodeintegrationinsubframes
        nodeintegration
        webpreferences="contextIsolation=false">
    </webview>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { openOutside, onOpenInside } from './state-utils';

export default {
  name: 'App',
  setup(){
    const isInside = ref(true);
    const clientRoot = ref(null)

    const open = () => {
      (clientRoot.value as any).send('will-close');
      isInside.value = false;
      openOutside();
    };

    onOpenInside(() => isInside.value = true);

    return {
      isInside,
      clientRoot,
      open
    }
  }
}

</script>

<style lang="css" scoped>
  .wrapper {
    position: fixed;
    border: 1px solid #eee;
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.2);
    top: 20px;
    right: 20px;
    height: calc(100vh - 40px);
    width: 560px;
    transition: 0.5s;
    z-index: 1000;
  }

  .wrapper:hover .main-app {
    opacity: 1;
  }

  .main-app {
    height: calc(100% - 45px);
    width: 100%;
    opacity: 0.95;
    transition: 0.3s;
  }

  .electron-opener {
    display: block;
    border: none;
    background: #41b883;
    padding: 15px 0;
    width: 100%;
    text-align: center;
    color: #fff;
    transition: 0.3s;
    cursor: pointer;
  }

  .electron-opener:hover {
    background: #188964;
  }
</style>

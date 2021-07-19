<template>
  <div class="wrapper" v-bind:class="{ 'with-bar': withBar }">
    <nav-bar v-if="withBar" :title="title" v-on:back="onBack()"></nav-bar>
    <main class="scroller">
      <router-view></router-view>
    </main>
    <nav class="nav">
      <router-link class="nav-link" to="/screens">Screenshots</router-link>
      <router-link class="nav-link" to="/navigations">Navigation History</router-link>
      <router-link class="nav-link" to="/api-history">API History</router-link>
    </nav>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { RouteLocationRaw, useRouter } from 'vue-router';
  import NavBar from '@/components/nav-bar.vue';

  export default defineComponent({
    name: 'App',
    components: { NavBar },
    setup() {
      const router = useRouter();
      const withBar = ref(false);
      const title = ref('');

      router.beforeEach(({ name, meta }, from, next) => {
        withBar.value = meta.withBar as boolean;
        title.value = name as string;
        next();
      });

      onMounted(() => router.push({ path: localStorage.getItem('latest') || '/'  }));


      router.afterEach(({ path }) => {
        localStorage.setItem('latest', path);
      })

      const onBack = () => {
        router.push(router.currentRoute.value.meta.back as RouteLocationRaw)
      }

      return {
        withBar,
        title,
        onBack
      }
    }
  });
</script>

<style lang="scss">
  body {
    padding: 0;
    margin: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .wrapper {
    display: grid;
    grid-template-rows: 1fr;
    height: 100vh;
    overflow: hidden;

    background: #fff;

    &.with-bar {
      grid-template-rows: auto 1fr auto;
    }
  }

  main {
    overflow: auto;
  }

  .nav {
    display: flex;
    width: 100%;
  }

  .nav-link {
    display: block;
    padding: 20px;
    width: 100%;
    text-decoration: none;
    text-align: center;
    color: #b1b1b1;
    border-top: 1px solid #dedede;

    transition: 0.3s;

    &.router-link-active {
      cursor: default;
      color: #fff;
      background: #4189fc;
      border-top: 1px solid #4189fc;
      font-weight: bold;
    }
    
    &:not(.router-link-active):hover {
      background: #f1f1f1;
    }
  }

  .scroller {
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;

      border-left: 1px solid #dedede;

      transition: 0.3s;
      &:hover {
        background: #ededed;
      }
    }
    &::-webkit-scrollbar-track-piece {
      border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb:vertical {
      height: 8px;

      background-color: #d5d5d5;
      border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb:horizontal {
      width: 8px;

      background-color: #d5d5d5;
      border-radius: 3px;
    }
  }
</style>

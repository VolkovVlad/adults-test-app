<template>
  <div class="wrapper">
    <main>
      <router-view/>
    </main>
    <nav class="nav">
      <router-link class="nav-link" to="/screens">Screenshots</router-link>
      <router-link class="nav-link" to="/">Navigation History</router-link>
      <router-link class="nav-link" to="/about">API History</router-link>
    </nav>
  </div>
</template>

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
</style>

<template>
  <div class="wrapper">
    <webview
        class="main-app"
        src="http://localhost:3000"
        disablewebsecurity
        nodeintegrationinsubframes
        nodeintegration
        webpreferences="contextIsolation=false">
    </webview>
  </div>

</template>

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
    height: 100%;
    width: 100%;
    opacity: 0.95;
    transition: 0.3s;
  }
</style>

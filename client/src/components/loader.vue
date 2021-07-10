<template>
  <div class="loader">
    <div class="loader-piece"></div>
    <div class="loader-piece"></div>
    <div class="loader-piece"></div>
    <div class="loader-piece"></div>
  </div>
</template>

<style lang="scss" scoped>
  .loader {
    --color: #4189fc;
    --size: 80px;
    position: relative;

    display: inline-block;
    width: var(--size);
    height: var(--size);
  }

  .loader-piece {
    position: absolute;

    display: block;
    box-sizing: border-box;
    width: calc(var(--size) / 10 * 8);
    height: calc(var(--size) / 10 * 8);
    margin: calc(var(--size) / 10);

    border: calc(var(--size) / 10) solid var(--color);
    border-color: var(--color) transparent transparent transparent;
    border-radius: 50%;

    animation: app-loader-anim 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }

  @keyframes app-loader-anim {
    to {
      transform: rotate(360deg);
    }
  }
</style>

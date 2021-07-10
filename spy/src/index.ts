import { createApp } from 'vue';

import App from './App.vue';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div');
  document.body.insertAdjacentElement('afterbegin', root);
  createApp(App).mount(root);
});

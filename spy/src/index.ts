import { createApp } from 'vue';
import App from './App.vue';
import { Store } from './store';
import { grabScreenshots } from './elements-render';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div');
  document.body.insertAdjacentElement('beforeend', root);
  createApp(App).mount(root);
});

window.addEventListener('load', async () => {
  const screenshots = await grabScreenshots('a');
  Store.dispatch({
    type: 'setScreenshots',
    payload: screenshots
  }
  );
  alert('done');
});


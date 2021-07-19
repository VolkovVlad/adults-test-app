import { createApp } from 'vue';
import App from './App.vue';
import { registerNavigationByClickGrabber, registerNavigationByFrontendEventGrabber } from './grabbers/navigation';
import { registerScreenshotsGrabber } from './grabbers/screenshots';
import { registerNetworkGrabber } from './grabbers/network';

registerNetworkGrabber(async (input, init, originalFetch) => {
  if ( input === 'https://www.ozon.ru/api/composer-api.bx/_action/favoriteCountItems' ) {
    await originalFetch(input, init);
    return new Response('{"count":444}', {
      status: 200,
      statusText: 'ok',
      headers: {
        'content-encoding': 'gzip',
        'content-type': 'application/json; charset=UTF-8'
      }
    })
  }
  return await originalFetch(input, init)
});

window.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div');
  document.body.insertAdjacentElement('beforeend', root);
  createApp(App).mount(root);
});

window.addEventListener('load', async () => {
  const screenshotsGrabber = registerScreenshotsGrabber('a');
  const clickNavigationGrabber = registerNavigationByClickGrabber();
  const frontendEventNavigationGrabber = registerNavigationByFrontendEventGrabber();


  clickNavigationGrabber.onStepAdd(({ to }) => window.location.href = to);
  frontendEventNavigationGrabber.onStepAdd(({ to }) => window.location.href = to);
  screenshotsGrabber.run();
});


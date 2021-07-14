import { createApp } from 'vue';
import App from './App.vue';
import { registerNavigationByClickGrabber, registerNavigationByFrontendEventGrabber } from './grabbers/navigation';
import { registerScreenshotsGrabber } from './grabbers/screenshots';

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


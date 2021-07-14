import { toBlob } from 'html-to-image';
// @ts-ignore
import unique from 'unique-selector';
import { addScreenshotInState, patch } from '../state-utils';

const uniqSelectorAsync = async (node: HTMLElement) => new Promise<string>(
  resolve => requestAnimationFrame(() => resolve(unique(node)))
);

export const registerScreenshotsGrabber = (selectElementsBy: string) => {
  let stopped = false;

  const unsubscribe = () => stopped = true;

  const run = async () => {
    patch({ screenshots: [], isScreensGrabCompleted: false });

    const elems = document.querySelectorAll<HTMLElement>(selectElementsBy);

    for ( const elem of elems ) {
      if (stopped) {
        break;
      }

      try {
        const selector = await uniqSelectorAsync(elem);
        const blob = await toBlob(elem);
        if (!blob) {
          throw new Error('too small to render');
        }
        const pic = window.URL.createObjectURL(blob);
        const html = elem.outerHTML;
        addScreenshotInState({ selector, pic, html });
      } catch (e) {
        console.warn(e);
      }
    }

    if (!stopped) {
      patch({ isScreensGrabCompleted: true });
    }
  }

  return {
    run,
    unsubscribe
  }

}

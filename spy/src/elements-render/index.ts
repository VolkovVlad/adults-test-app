import { toBlob } from 'html-to-image';
// @ts-ignore
import unique from 'unique-selector';
import { ScreenshotModel } from '@app-common/store';

export const uniqSelectorAsync = async (node: Element) => new Promise<string>(
  resolve => requestAnimationFrame(() => resolve(unique(node)))
);


export const grabScreenshots = async (bySelector: string): Promise<ScreenshotModel[]> => {
  const results: ScreenshotModel[] = [];
  const elems = [...document.querySelectorAll<HTMLElement>(bySelector)].slice(0, 20);
  for (const elem of elems) {
    const selector = await uniqSelectorAsync(elem);
    const blob = await toBlob(elem);
    if (!blob) {
      console.log(selector);
      continue;
    }
    const pic = window.URL.createObjectURL(blob);
    const html = elem.outerHTML;
    results.push({ selector, pic, html })
  }

  return results;
}

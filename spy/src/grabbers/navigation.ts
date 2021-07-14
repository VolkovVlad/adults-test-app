import { addNavigation, getLatestNavigationStep } from '../state-utils';
import { LinkNavigation } from '@app-common/state';

export type OnStepFn = (step: LinkNavigation) => any;

export const registerNavigationByClickGrabber = () => {
  let onStepFns: OnStepFn[] = [];
  const listener = (e: MouseEvent) => {
    const clickedLink = (e.target as HTMLElement).closest('a');
    if (!clickedLink) {
      return;
    }

    const step = {
      from: window.location.href,
      to: clickedLink.href,
      event: 'click'
    };

    addNavigation(step);
    onStepFns.forEach(fn => fn(step));
  }

  window.addEventListener('click', listener);

  return {
    unsubscribe: () => {
      window.removeEventListener('click', listener);
      onStepFns = []
    },
    onStepAdd: (fn: OnStepFn) => onStepFns.push(fn)
  }
}

export const registerNavigationByFrontendEventGrabber = () => {
  let onStepFns: OnStepFn[] = [];
  let from = window.location.href;
  const timerId = setInterval(() => {
    const to = window.location.href;
    const latest = getLatestNavigationStep();

    if (to === from) {
      return;
    }

    if (latest.from === from && latest.to === to) {
      from = latest.to;
      return;
    }

    const step = {
      to,
      from,
      event: 'frontend-event'
    };

    addNavigation(step);
    onStepFns.forEach(fn => fn(step));
    from = to;
  }, 200)

  return {
    unsubscribe: () => {
      window.clearInterval(timerId);
      onStepFns = []
    },
    onStepAdd: (fn: OnStepFn) => onStepFns.push(fn)
  }
}

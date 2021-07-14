import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { StoreModel } from './__internal/interfaces';
import { GetSelection, StreamSelection } from './__internal/types';

const AppStateInitial = {
  screenshots: [],
  isScreensGrabCompleted: false,
  navigation: []
};

const State = new BehaviorSubject<StoreModel>(AppStateInitial);

export const get: GetSelection = (selector?) => {
  return selector === 'function' ?
    selector(State.value) :
    State.value;
}

export const select: StreamSelection = (selector?) => {
  const stream$$ = typeof selector === 'function' ?
    State.asObservable().pipe<any>(map(selector)) :
    State.asObservable();

  return stream$$.pipe(distinctUntilChanged());
}

export const patch = (state: Partial<StoreModel>) => State.next({ ...get(), ...state });

export const reset = () => State.next(AppStateInitial);

export const registerState = (electron) => { electron.app.AppState = { select, patch, get, reset } }

export * from './__internal/interfaces';

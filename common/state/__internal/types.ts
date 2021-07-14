import { Observable } from 'rxjs';
import { StoreModel } from './interfaces';

export type Selector<R> = {
  (state: StoreModel): R;
};

export type GetSelection = {
  (): StoreModel;
  <T>(selector?: Selector<T>): T;
};

export type StreamSelection = {
  (): Observable<StoreModel>;
  <T>(selector?: Selector<T>): Observable<T>;
};

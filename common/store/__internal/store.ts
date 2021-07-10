import { createStore } from 'vuex';
import { SetScreenshots } from './actions';
import { StoreModel } from './types';

export const Store = createStore<StoreModel>({
  state: {
    screenshots: []
  },
  mutations: {
    setScreenshots(state, { payload }: SetScreenshots): void {
      state.screenshots = payload;
    }
  },
  actions: {
  },
  modules: {
  },
})

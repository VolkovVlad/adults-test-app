import { createStore } from 'vuex';
import { createAppStatePatcher } from './electron-state-map.plugin';
import { StoreModel } from '@app-common/state';

export const Store = createStore<StoreModel>({
  plugins: [ createAppStatePatcher() ],
  getters: {},
  state: {
    screenshots: [],
    isScreensGrabCompleted: false,
    navigation: []
  },
  mutations: {
    setStore(state, received): void {
      for ( const key in received ) {
        (state as any)[(key as any)] = received[key];
      }
    }
  },
  actions: {
  },
  modules: {
  },
})

import { createStore } from 'vuex';
import { createAppStatePatcher } from './electron-state-map.plugin';
import { StoreModel } from '@app-common/state';

export const Store = createStore<StoreModel>({
  plugins: [ createAppStatePatcher() ],
  getters: {
    shortApiHistory({ apiHistory }) {
      return apiHistory.map(({ id, url, method }) => ({ id, url, method }))
    },
    apiHistoryCount({ apiHistory }) {
      return apiHistory.length
    }
  },
  state: {
    screenshots: [],
    isScreensGrabCompleted: false,
    navigation: [],
    apiHistory: []
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

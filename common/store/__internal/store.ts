import { createStore } from 'vuex';
// import { createSharedMutations } from 'vuex-electron';
import { SetScreenshots } from './actions';
import { StoreModel } from './types';

export const Store = createStore<StoreModel>({
  plugins: [  ],
  getters: {
    all: state => state
  },
  state: {
    screenshots: []
  },
  mutations: {
    setScreenshots(state, { payload }: SetScreenshots): void {
      state.screenshots = payload;
    }
  },
  actions: {
    setScreenshots({ commit }, data: SetScreenshots): void {
      console.log('here');
      commit('setScreenshots', data)
    }
  },
  modules: {
  },
})

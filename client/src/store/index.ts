import { createStore } from 'vuex'
import { SetScreenshots } from './actions'
import { StoreModel } from './types'

export default createStore<StoreModel>({
  state: {
    screenshots: [{ pic: 'qwe', selector: 'wwww', html: '22222' }]
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

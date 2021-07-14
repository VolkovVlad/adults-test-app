import { Store } from 'vuex';
import { StoreModel } from '@app-common/state';
const { remote } = __non_webpack_require__('electron');
const { app: { AppState }} = remote;


export const createAppStatePatcher = () => ({ commit }: Store<StoreModel>) =>
  AppState.select().subscribe((state: StoreModel) => commit('setStore', state)
)

import { Store } from 'vuex';
import { StoreModel } from '@app-common/state';
import { debounce } from 'lodash';
const { remote, ipcRenderer } = __non_webpack_require__('electron');
const { app: { AppState }} = remote;


export const createAppStatePatcher = () => ({ commit }: Store<StoreModel>) => {
  const sub = AppState.select().subscribe(debounce((state: StoreModel) => commit('setStore', state), 50));
  remote.getCurrentWindow().once('close', () => sub.unsubscribe());
  window.addEventListener('beforeunload', () => sub.unsubscribe());
  window.addEventListener('unload', () => sub.unsubscribe());
  window.addEventListener('close', () => sub.unsubscribe());
  ipcRenderer.on('will-close', () => sub.unsubscribe());
}

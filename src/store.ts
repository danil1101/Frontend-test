import { createPinia } from 'pinia';
import { markRaw } from 'vue';
import router from '@/router';

const store = createPinia();
store.use(({ store: s }) => {
  s.$router = markRaw(router);
});

export {
  store,
};


import { Router } from './router.js';
import { initStore } from './store.js';
import { initGlobalUI } from './ui.js';
import { attachFormHandlers } from './forms.js';

initStore();
initGlobalUI();

const router = new Router('#app');

router.define('/', 'home');
router.define('/projetos', 'projects');
router.define('/cadastro', 'signup');
router.define('/doar', 'donate');
router.define('/admin', 'admin');

router.start();

attachFormHandlers(document);
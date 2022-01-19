import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
	{
		component: () => import('./views/Home.vue'),
		path: '/'
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;

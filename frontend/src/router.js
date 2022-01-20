import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		name: 'Home',
		component: () => import('./views/Home.vue'),
		path: '/'
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	document.title = `${String(to.name)} | ChatBubble`;
	next();
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		name: 'Home',
		component: () => import('./views/Home.vue'),
		path: '/'
	},
	{
		name: 'Rooms',
		component: () => import('./views/Rooms.vue'),
		path: '/rooms'
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

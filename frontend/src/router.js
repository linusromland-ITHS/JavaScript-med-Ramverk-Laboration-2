//External Dependencies import:
import { createRouter, createWebHistory } from 'vue-router';

//Vue-Router Routes
const routes = [
	{
		//Route for the home page
		name: 'Home',
		component: () => import('./views/Home.vue'),
		path: '/'
	},
	{
		//Route for the room page
		name: 'Rooms',
		component: () => import('./views/Rooms.vue'),
		path: '/rooms'
	}
];

// Creates vue-router and sets mode to history
const router = createRouter({
	history: createWebHistory(),
	routes
});

//Updates title of each page
router.beforeEach((to, from, next) => {
	document.title = `${String(to.name)} | ChatBubble`;
	next();
});

//Exports vue-router
export default router;

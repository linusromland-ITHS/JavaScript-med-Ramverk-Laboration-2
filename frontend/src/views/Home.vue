<template>
	<h1>Home</h1>
</template>

<script>
export default {
	name: 'Home'
	data() {
		return {
			rooms: []
		};
	},
	methods: {
		async getRooms() {
			const request = await this.axios.get('/api/rooms');
			const result = await request.data;
			this.rooms = result;
		}
	},
	created() {
		this.getRooms();
		console.log(this.rooms);
	}
};
</script>

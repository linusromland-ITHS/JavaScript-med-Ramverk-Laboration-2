<template>
	<div class="w-full flex">
		<RoomCard
			v-for="(room, index) in rooms"
			:key="index"
			:room="room"
		></RoomCard>
	</div>
</template>

<script>
import RoomCard from '../components/RoomCard.vue';

export default {
	name: 'Home',
	components: {
		RoomCard
	},
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
	}
};
</script>

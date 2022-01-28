<template>
	<Navbar />
	<div class="mx-5">
		<div class="lg:flex lg:justify-between lg:align-center m-4">
			<h1 class="text-3xl text-bold text-sky-500 p-4">{{ room.name }}</h1>

			<!--Button to show create Room Modal-->
			<button
				@click="showCreateRoom"
				class="p-2 rounded-md my-2 bg-gray-500 hover:bg-gray-400 text-white cursor-pointer"
			>
				Admin Settings
			</button>
		</div>

		<div class="divider"></div>
	</div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
	name: 'Room',
	components: {
		Navbar
	},
	data() {
		return {
			room: {}
		};
	},
	methods: {
		async fetchRoom() {
			const response = await this.axios.get(
				`/api/rooms/${this.$route.params.roomId}`
			);
			this.room = response.data;
		}
	},
	created() {
		this.fetchRoom();
	}
};
</script>

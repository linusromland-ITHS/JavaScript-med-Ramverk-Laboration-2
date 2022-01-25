<template>
	<div
		class="bg-white p-6 cursor-pointer rounded-lg shadow-lg m-2 hover:bg-gray-100 transition duration-100 hover:scale-105"
		@click="roomClick()"
	>
		<h2 class="text-2xl font-bold mb-2 text-gray-800 flex">
			<img v-if="privateRoom" class="p" src="../assets/lock.svg" />
			{{ room.name }}
		</h2>
		<p class="text-gray-700">
			<span class="font-semibold">Last Active:</span> {{ lastActive }}
		</p>
	</div>
</template>
<script>
export default {
	name: 'RoomCard',
	props: {
		room: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			privateRoom: false
		};
	},
	methods: {
		roomClick() {
			if (!this.privateRoom) this.$router.push('/room/' + this.room._id);
		}
	},
	computed: {
		lastActive() {
			const now = new Date();
			let lastActive;

			if (this.room.messages && this.room.messages.length > 0) {
				lastActive = new Date(
					this.room.messages[this.room.messages.length - 1].createdAt
				);
			} else {
				lastActive = new Date(this.room.createdAt);
			}

			const diff = now - lastActive;
			const diffInMinutes = Math.round(diff / 1000 / 60);
			const diffInHours = Math.round(diff / 1000 / 60 / 60);
			const diffInDays = Math.round(diff / 1000 / 60 / 60 / 24);
			if (diffInMinutes < 1) {
				return 'Just now';
			} else if (diffInMinutes < 60) {
				return `${diffInMinutes} minutes ago`;
			} else if (diffInHours < 24) {
				return `${diffInHours} hours ago`;
			} else {
				return `${diffInDays} days ago`;
			}
		}
	},
	created() {
		this.privateRoom = this.room.private;
	}
};
</script>

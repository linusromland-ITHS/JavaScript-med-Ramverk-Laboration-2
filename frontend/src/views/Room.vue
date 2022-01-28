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
		<div id="messages">
			<div v-for="(message, index) in messages" :key="index">
				<p>{{ message.message }}</p>
				<p>From:{{ message.sender }}</p>
			</div>
		</div>
		<input
			type="text"
			name="Message"
			class="text-black"
			v-model="messageInput"
		/>
		<button @click="sendMessage">Send</button>
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
			room: {}, //Object containg room data
			messages: [], //Array of messages
			messageInput: '' //Message input
		};
	},
	methods: {
		async fetchRoom() {
			const response = await this.axios.get(
				`/api/rooms/${this.$route.params.roomId}`
			);
			this.room = response.data;
			this.messages = response.data.messages; //Get messages
		},
		sendMessage() {
			this.$socket.emit('message', {
				roomId: this.$route.params.roomId,
				message: this.message,
				sender: localStorage.username
			});
			this.message = '';
		}
	},
	mounted() {
		this.fetchRoom(); //Get room data

		this.sockets.subscribe(this.$route.params.roomId, function (message) {
			//Listen to messages
			this.messages.push(message);
		});

		this.sockets.subscribe(
			this.$route.params.roomId + '/typing',
			function (data) {
				console.log(data);
			}
		);

		if (!navigator.onLine) {
			//Check if user is offline and set error
			this.$store.commit('setChatError', true);
			this.$router.push('/rooms');
		}
	},
	watch: {
		$route() {
			//If route changes, fetch new room data
			this.fetchRoom();
		},
		messageInput() {
			this.$socket.emit('typing', {
				roomId: this.$route.params.roomId,
				sender: localStorage.username
			});
		}
	}
};
</script>

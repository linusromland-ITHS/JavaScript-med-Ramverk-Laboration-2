<template>
	<Navbar />
	<div class="mx-5">
		<div class="lg:h-16 md:h-42 border-b-2 border-slate-50 rounded-sm">
			<div class="lg:flex lg:justify-between lg:items-center">
				<h1 class="text-3xl text-bold text-sky-500 p-1">
					{{ room.name }}
				</h1>

				<!--Button to show create Room Modal-->
				<button
					@click="roomSettingsModal = true"
					class="p-1 rounded-md m-2 bg-gray-500 hover:bg-gray-400 h-10 text-white cursor-pointer"
				>
					Admin Settings
				</button>
			</div>
		</div>
		<div id="messages" class="mt-2 scroll-smooth" ref="messages">
			<div v-for="(message, index) in messages" :key="index">
				<p>{{ message.message }}</p>
				<p>From:{{ message.sender }}</p>
			</div>
		</div>
		<div class="w-full flex mt-1 items-center justify-center">
			<input
				type="text"
				name="Message"
				id="messageInput"
				class="text-black w-11/12 p-2 rounded-l-md"
				placeholder="Type your message here..."
				v-model="messageInput"
				@keyup.enter="sendMessage"
				autofocus="true"
				ref="input"
			/>
			<button
				@click="sendMessage"
				class="w-1/12 p-2 bg-blue-500 disabled:bg-blue-300 disabled:hover:bg-blue-300 hover:bg-blue-400 text-white cursor-pointer rounded-r-md"
				ref="sendButton"
				disabled
			>
				Send
			</button>
		</div>
	</div>
	<RoomSettingsModal
		v-if="roomSettingsModal"
		@close="roomSettingsModal = false"
		@update="updateData"
		:roomObj="room"
	/>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import RoomSettingsModal from '../components/RoomSettingsModal.vue';

export default {
	name: 'Room',
	components: {
		Navbar,
		RoomSettingsModal,
	},
	data() {
		return {
			room: {},
			messages: [],
			messageInput: '',
			roomSettingsModal: false
		};
	},
	methods: {
		async fetchRoom() {
			const response = await this.axios.get(
				`/api/rooms/${this.$route.params.roomId}`
			);
			this.room = response.data;
			if (response.data.messages) this.messages = response.data.messages; //Get messages
		},
		updateData(data) {
			this.room = data;
		},
		sendMessage() {
			if (this.messageInput.length > 0) {
				this.$socket.emit('message', {
					roomId: this.$route.params.roomId,
					message: this.messageInput,
					sender: localStorage.username
				});
				this.messageInput = '';
				this.$refs['input'].value = '';
			}
		}
	},
	watch: {
		$route() {
			this.fetchRoom();
		},
		messageInput(value) {
			if (value === '') this.$refs['sendButton'].disabled = true;
			else this.$refs['sendButton'].disabled = false;
		}
	},
	mounted() {
		this.fetchRoom(); //Get room data
		this.sockets.subscribe(this.$route.params.roomId, function (message) {
			//Listen to messages
			this.messages.push(message);
		});

		if (!navigator.onLine) {
			//Check if user is offline and set error
			this.$store.commit('setChatError', true);
			this.$router.push('/rooms');
		}
	},
	beforeUnmount() {
		this.sockets.unsubscribe(this.$route.params.roomId);
	}
};
</script>
<style scoped>
#messages {
	height: calc(100vh - 12rem);
	overflow-y: scroll;
}
</style>

<template>
	<Navbar />
	<div class="mx-5">
		<div class="lg:h-16 md:h-42 border-b-2 border-slate-50 rounded-sm">
			<div class="md:flex md:justify-between md:items-center">
				<router-link
					to="/rooms"
					class="p-1 w-36 rounded-md m-2 bg-gray-500 hover:bg-gray-400 h-10 text-white cursor-pointer flex items-center"
					><img src="../assets/back.svg" class="invert" />
					<p>Back to rooms</p></router-link
				>
				<h1 class="text-3xl text-bold text-sky-500 p-1 justify-self-start">
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
		<div id="messages" class="mt-2 scroll-smooth bg-slate-500 p-4 rounded-md" ref="messages">
			<div v-for="message in messages" :key="message.id" class="w-full border-b border-slate-400 my-1">
				<ChatMessage :message="message.message" :sender="message.sender" :sentAt="message.sentAt" />
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
				:disabled="disabledButton"
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
//Components imports:
import Navbar from '../components/Navbar.vue';
import RoomSettingsModal from '../components/RoomSettingsModal.vue';
import ChatMessage from '../components/ChatMessage.vue';

export default {
	name: 'Room',
	components: {
		Navbar,
		RoomSettingsModal,
		ChatMessage
	},
	data() {
		return {
			room: {}, // Room object
			messages: [], // Array of messages
			messageInput: '', // Input field for message
			roomSettingsModal: false, // Modal for room settings
			disabledButton: true // Disables send button if messageInput is empty
		};
	},
	methods: {
		/**
		 * @name fetchRoom
		 * @description Fetch room data from server
		 */
		async fetchRoom() {
			const response = await this.axios.get(`/api/rooms/${this.$route.params.roomId}`);
			if (!response.data) this.$router.push('/rooms');
			this.room = response.data;
			if (response.data.messages) this.messages = response.data.messages; //Get messages
		},

		/**
		 * @name updateData
		 * @description Updates room data from input
		 * @param {Object} room - Room data
		 */
		updateData(data) {
			this.room = data;
		},

		/**
		 * @name sendMessage
		 * @description Send message to server
		 */
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

		/**
		 * @description Checks if input field is empty and sets button to disabled if empty
		 * @param {string} value - Value from input field
		 */
		messageInput(value) {
			if (value === '') this.disabledButton = true;
			else this.disabledButton = false;
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

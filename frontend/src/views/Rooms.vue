<template>
	<Navbar />
	<div class="mx-5">
		<div
			class="lg:h-28 md:h-52 border-b-2 border-slate-50 flex items-center rounded-sm"
		>
			<div class="lg:flex lg:justify-between items-center w-full">
				<div class="flex flex-col justify-around">
					<h1 class="text-4xl text-bold text-sky-500">Rooms</h1>
					<p class="text-xl my-2 text-slate-50">
						To join a room, just click the room you want to join
						below and start chatting!
					</p>
				</div>

				<!--Button to show create Room Modal-->
				<button
					@click="showCreateRoom"
					class="bg-blue-500 hover:bg-blue-400 text-white p-1 rounded-md m-2 h-12 cursor-pointer"
				>
					Create Room
				</button>
			</div>
		</div>

		<!--Create Room Modal -->
		<Modal
			v-if="createModal"
			@close="createModal = false"
			@submit="createRoom"
			:showSubmitBtn="true"
			submitBtnValue="Create Room"
			title="Create Room"
			:error="error"
			:errorMessage="errorMessage"
		>
			<input
				type="text"
				class="w-5/6 p-2 m-5 rounded-md bg-gray-200 text-black"
				placeholder="Room Name"
				autocomplete="off"
				v-model="roomName"
			/>
			<input
				type="password"
				class="w-5/6 p-2 m-5 mt-0 rounded-md bg-gray-200 text-black"
				placeholder="Admin Password"
				autocomplete="off"
				v-model="adminPassword"
			/>
			<div class="flex align-center">
				<input
					type="checkbox"
					class="w-6 h-6 m-1 rounded-md bg-gray-200 text-black"
					v-model="privateRoom"
				/>
				<p class="p-1 m-1 text-black">Private Room</p>
			</div>
			<input
				v-if="privateRoom"
				type="password"
				class="w-5/6 p-2 m-5 rounded-md bg-gray-200"
				placeholder="Private Room Password"
				autocomplete="off"
				v-model="privateRoomPassword"
			/>
		</Modal>

		<!--Network Create Room error Modal-->
		<Modal
			v-if="offlineErrorModal"
			@close="offlineErrorModal = false"
			:showSubmitBtn="false"
			cancelBtnValue="Close"
			title="Network error!"
		>
			<p class="text-black">
				You need to be online to create a room! Go online and try again!
			</p>
		</Modal>

		<!--Network Chat Room error Modal-->
		<Modal
			v-if="chatOfflineErrorModal"
			@close="chatOfflineErrorModal = false"
			:showSubmitBtn="false"
			cancelBtnValue="Close"
			title="Network error!"
		>
			<p class="text-black">
				You need to be online to chat in a room! Go online and try
				again!
			</p>
		</Modal>

		<div class="w-full flex flex-wrap">
			<!-- Loops through rooms and displays RoomCard -->
			<RoomCard
				v-for="(room, index) in rooms"
				:key="index"
				:room="room"
			></RoomCard>
		</div>
	</div>
</template>

<script>
//Components imports:
import RoomCard from '../components/RoomCard.vue';
import Modal from '../components/Modal.vue';
import Navbar from '../components/Navbar.vue';

export default {
	name: 'Home',
	components: {
		RoomCard,
		Modal,
		Navbar
	},
	data() {
		return {
			rooms: [], //Array of all rooms
			createModal: false, //Boolean to show/hide the create room modal
			offlineErrorModal: false, //Boolean to show/hide the network error modal
			chatOfflineErrorModal: false, //Boolean to show/hide the network error modal
			roomName: '', //Room name
			adminPassword: '', //Admin password
			privateRoom: false, //Boolean to check if the room is private
			privateRoomPassword: '', //Private room password
			error: false, //Boolean to show/hide error message
			errorMessage: '' //Error message
		};
	},
	methods: {
		/**
		 * @name getRooms
		 * @description - Fetches all rooms from the database
		 */
		async getRooms() {
			const request = await this.axios.get('/api/rooms');
			const result = await request.data;
			this.rooms = result;
		},
		/**
		 * @name createRoom
		 * @description - Creates a room from the data entered in the modal
		 */
		createRoom() {
			if (
				!this.roomName ||
				!this.adminPassword ||
				(this.privateRoom && !this.privateRoomPassword)
			) {
				//Check if all fields are filled
				this.errorMessage = 'Please fill out all fields';
				return;
			}
			this.axios //Post request to create room
				.post('/api/rooms/new', {
					name: this.roomName,
					adminPassword: this.adminPassword,
					private: this.privateRoom,
					password: this.privateRoomPassword
				})
				.then(() => {
					//If successful, clear the modal and get all rooms
					this.createModal = false;
					this.roomName = '';
					this.adminPassword = '';
					this.privateRoom = false;
					this.privateRoomPassword = '';
					this.getRooms();
				})
				.catch((error) => {
					//If unsuccessful, show error message
					this.errorMessage = error.response.data;
					console.log(error.response);
				});
		},
		/**
		 * @name showCreateRoom
		 * @description - Shows the create room modal
		 */
		showCreateRoom() {
			if (navigator.onLine) {
				this.createModal = true;
			} else {
				this.offlineErrorModal = true;
			}
		}
	},
	created() {
		//Get all rooms on page load
		this.getRooms();

		if (this.$store.state.chatError) {
			this.chatOfflineErrorModal = true;
			this.$store.commit('setChatError', false);
		}
	}
};
</script>

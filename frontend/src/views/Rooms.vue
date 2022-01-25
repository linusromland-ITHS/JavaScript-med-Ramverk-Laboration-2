<template>
	<Navbar />
	<div>
		<button
			@click="createModal = true"
			class="p-2 rounded-md m-2 bg-blue-500 hover:bg-blue-400 text-white cursor-pointer"
		>
			Create Room
		</button>
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
				class="w-5/6 p-2 m-5 rounded-md bg-gray-200"
				placeholder="Room Name"
				autocomplete="off"
				v-model="roomName"
			/>
			<input
				type="password"
				class="w-5/6 p-2 m-5 mt-0 rounded-md bg-gray-200"
				placeholder="Admin Password"
				autocomplete="off"
				v-model="adminPassword"
			/>
			<div class="flex align-center">
				<input
					type="checkbox"
					class="w-6 h-6 m-1 rounded-md bg-gray-200"
					v-model="privateRoom"
				/>
				<p class="p-1 m-1">Private Room</p>
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

		<div class="w-full flex flex-wrap">
			<RoomCard
				v-for="(room, index) in rooms"
				:key="index"
				:room="room"
			></RoomCard>
		</div>
	</div>
</template>

<script>
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
			rooms: [],
			createModal: false,
			roomName: '',
			adminPassword: '',
			privateRoom: false,
			privateRoomPassword: '',
			error: false,
			errorMessage: ''
		};
	},
	methods: {
		async getRooms() {
			const request = await this.axios.get('/api/rooms');
			const result = await request.data;
			this.rooms = result;
		},
		createRoom() {
			if (
				!this.roomName ||
				!this.adminPassword ||
				(this.privateRoom && !this.privateRoomPassword)
			) {
				this.errorMessage = 'Please fill out all fields';
				return;
			}
			this.axios
				.post('/api/rooms/new', {
					name: this.roomName,
					adminPassword: this.adminPassword,
					private: this.privateRoom,
					password: this.privateRoomPassword
				})
				.then(() => {
					this.createModal = false;
					this.roomName = '';
					this.adminPassword = '';
					this.privateRoom = false;
					this.privateRoomPassword = '';
					this.getRooms();
				})
				.catch((error) => {
					this.errorMessage = error.response.data;
					console.log(error.response);
				});
		}
	},
	created() {
		this.getRooms();
	}
};
</script>

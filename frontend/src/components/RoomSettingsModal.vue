<template>
	<Modal
		@close="close"
		@submit="submit"
		:showSubmitBtn="!correctAdminPassword"
		:showCancelBtn="true"
		submitBtnValue="Authenticate"
		cancelBtnValue="Close"
		:title="title"
		:errorMessage="errorMessage"
	>
		<div v-if="!correctAdminPassword" class="flex flex-col items-center">
			<p class="w-5/6 p-2 rounded-md text-black">
				To access admin settings you need to enter the admin password.
				Do this below.
			</p>
			<input
				class="w-5/6 p-2 m-5 mb-0 rounded-md bg-gray-200 text-black"
				placeholder="Admin Password"
				type="password"
				autocomplete="off"
				v-model="adminPassword"
			/>
		</div>
		<div
			v-else-if="correctAdminPassword && deleteRoom"
			class="flex flex-col items-center"
		>
			<p class="w-5/6 p-2 rounded-md text-black">
				This action will permanently delete the room and all messages
				that have been sent in the room. This is not reversible!
			</p>
			<button
				@click="deleteRoomSubmit"
				class="w-4/12 p-2 bg-red-500 hover:bg-red-400 text-white cursor-pointer rounded-md"
			>
				Delete Room
			</button>
		</div>
		<div v-else class="w-full flex items-center flex-col">
			<p class="text-black text-sm pl-9 self-start">Update room name:</p>

			<div class="w-full flex justify-center">
				<input
					type="text"
					class="text-black w-6/12 p-2 rounded-l-md bg-slate-200"
					placeholder="Room Name"
					v-model="roomName"
				/>
				<button
					@click="updateRoomName"
					class="w-4/12 p-2 bg-blue-500 hover:bg-blue-400 text-white cursor-pointer rounded-r-md"
				>
					Update
				</button>
			</div>
			<div
				class="px-4 py-2 mt-4 mx-4 border-2 border-red-500 rounded-md flex flex-col items-center lg:w-1/2 w-full"
			>
				<p class="text-red-500 text-lg">Danger Area!</p>

				<button
					@click="deleteRoomClick"
					class="p-2 bg-red-500 hover:bg-red-400 text-white cursor-pointer rounded-md"
				>
					Delete Room
				</button>
			</div>
		</div>
	</Modal>
</template>

<script>
import Modal from './Modal.vue';

export default {
	name: 'RoomSettingsModal',
	components: {
		Modal
	},
	emits: ['update'],
	data() {
		return {
			room: {},
			adminPassword: '',
			correctAdminPassword: false,
			deleteRoom: false,
			roomName: '',
			title: 'Admin Settings',
			errorMessage: '' //error message
		};
	},
	props: {
		roomObj: {
			//Object containg room data
			type: Object,
			required: true
		}
	},
	methods: {
		async submit() {
			const request = await this.axios.post(
				`/api/rooms/checkAdminPassword/${this.room._id}`,
				{
					password: this.adminPassword
				}
			);
			if (request.data) {
				this.error = false;
				this.errorMessage = '';
				this.correctAdminPassword = true;
			} else {
				this.errorMessage = 'Wrong password!';
			}
		},
		async updateRoomName() {
			const request = await this.axios.post(
				`/api/rooms/updateRoomName/${this.room._id}`,
				{
					name: this.roomName,
					password: this.adminPassword
				}
			);
			if (request.data) {
				this.errorMessage = '';
				this.correctAdminPassword = true;
				this.fetchRoom();
			} else {
				this.errorMessage = 'Unknown Error!';
			}
		},
		deleteRoomClick() {
			this.deleteRoom = true;
			this.title = 'Are you sure you want to delete this room?';
		},
		async fetchRoom() {
			const response = await this.axios.get(
				`/api/rooms/${this.$route.params.roomId}`
			);
			this.room = response.data;
			this.$emit('update', response.data);
		},
		deleteRoomSubmit() {
			this.axios
				.post(`/api/rooms/deleteRoom/${this.room._id}`, {
					password: this.adminPassword
				})
				.then(() => {
					this.$router.push('/rooms');
				});
		}
	},
	mounted() {
		this.room = this.roomObj;
		this.roomName = this.room.name;
	}
};
</script>

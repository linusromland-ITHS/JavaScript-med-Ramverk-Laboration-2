<template>
	<Modal
		v-if="!deleteRoom"
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
				Have you forgotten your password? Contact the administrator.
			</p>
			<input
				class="w-5/6 p-2 m-5 mb-0 rounded-md bg-gray-200 text-black"
				placeholder="Admin Password"
				type="password"
				autocomplete="off"
				v-model="adminPassword"
			/>
		</div>
		<div v-else class="w-full flex items-center flex-col">
			<p class="text-black text-sm pl-10 self-start">Update room name:</p>

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
				class="w-full flex lg:justify-around lg:flex-row flex-col justify-center items-center"
			>
				<div
					class="p-2 mt-4 mx-6 border-2 border-red-500 rounded-md flex flex-col items-center justify-around lg:w-4/12 w-1/2"
				>
					<p class="text-red-500 text-lg">Danger Area!</p>

					<button
						@click="deleteRoomClick"
						class="p-2 bg-red-500 hover:bg-red-400 text-white cursor-pointer rounded-md"
					>
						Delete Room
					</button>
				</div>
				<div
					class="lg:w-5/12 w-full flex flex-col mt-4 items-center justify-center"
				>
					<div>
						<button
							@click="changeAdminPasswordModal = true"
							class="p-2 m-2 bg-slate-500 hover:bg-slate-400 text-white cursor-pointer rounded-md"
						>
							Change Admin Password
						</button>
						<ChangePasswordModal
							v-if="changeAdminPasswordModal"
							@close="close"
							@submit="changeAdminPassword"
							modalTitle="Edit Admin Password"
							:errorMessage="adminChangeErrorMessage"
						/>
					</div>
					<div v-if="this.room.private">
						<button
							@click="changeRoomPasswordModal = true"
							class="p-2 m-2 bg-slate-500 hover:bg-slate-400 text-white cursor-pointer rounded-md"
						>
							Change Room Password
						</button>
						<ChangePasswordModal
							v-if="changeRoomPasswordModal"
							@close="close"
							@submit="changeRoomPassword"
							modalTitle="Edit Room Password"
							:errorMessage="roomChangeErrorMessage"
						/>
					</div>
				</div>
			</div>
		</div>
	</Modal>
	<Modal
		v-else
		@close="deleteRoomSubmit"
		@submit="close"
		:showSubmitBtn="true"
		:showCancelBtn="true"
		submitBtnValue="Cancel"
		cancelBtnValue="Delete Room"
		:title="title"
		:errorMessage="errorMessage"
	>
		<div class="flex flex-col items-center">
			<p class="w-5/6 p-2 rounded-md text-black">
				This action will permanently delete the room and all messages
				that have been sent in the room. This is not reversible!
			</p>
		</div>
	</Modal>
</template>

<script>
import Modal from './Modal.vue';
import ChangePasswordModal from './ChangePasswordModal.vue';

export default {
	name: 'RoomSettingsModal',
	components: {
		Modal,
		ChangePasswordModal
	},
	emits: ['update', 'close'],
	data() {
		return {
			room: {},
			adminPassword: '',
			correctAdminPassword: false,
			deleteRoom: false,
			changeAdminPasswordModal: false,
			changeRoomPasswordModal: false,
			roomName: '',
			title: 'Admin Settings',
			adminChangeErrorMessage: '',
			roomChangeErrorMessage: '',
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
		},
		close() {
			this.correctAdminPassword = false;
			this.deleteRoom = false;
			this.title = 'Admin Settings';
			this.errorMessage = '';
			this.$emit('close');
		},
		async changeAdminPassword(data) {
			if (data.newPassword !== data.confirmPassword) {
				this.adminChangeErrorMessage = 'Passwords do not match!';
				return;
			}
			const request = await this.axios.post(
				`/api/rooms/changeAdminPassword/${this.room._id}`,
				{
					password: data.oldPassword,
					newPassword: data.newPassword,
					roomId: this.room._id
				}
			);
			if (request.data.success === true) {
				this.adminChangeErrorMessage = '';
				this.close();
			} else if (request.data.success === false) {
				this.adminChangeErrorMessage = request.data.errorMessage;
			} else {
				this.adminChangeErrorMessage = 'Unknown Error!';
			}
		},
		async changeRoomPassword(data) {
			if (data.newPassword !== data.confirmPassword) {
				this.roomChangeErrorMessage = 'Passwords do not match!';
				return;
			}
			const request = await this.axios.post(
				`/api/rooms/changeRoomPassword/${this.room._id}`,
				{
					password: data.oldPassword,
					newPassword: data.newPassword,
					roomId: this.room._id
				}
			);
			if (request.data.success === true) {
				this.roomChangeErrorMessage = '';
				this.close();
			} else if (request.data.success === false) {
				this.roomChangeErrorMessage = request.data.errorMessage;
			} else {
				this.roomChangeErrorMessage = 'Unknown Error!';
			}
		}
	},
	mounted() {
		this.room = this.roomObj;
		this.roomName = this.room.name;
	}
};
</script>

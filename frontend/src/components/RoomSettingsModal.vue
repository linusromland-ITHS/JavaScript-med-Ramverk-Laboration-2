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
		<!-- Password Input to show Admin Settings -->
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
		<!-- Admin Settings -->
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

	<!-- Confirm Delete Modal -->
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
//Components imports:
import Modal from './Modal.vue';
import ChangePasswordModal from './ChangePasswordModal.vue';

export default {
	name: 'RoomSettingsModal',
	components: {
		Modal,
		ChangePasswordModal
	},
	emits: ['update', 'close'], //Emits to parent component
	data() {
		return {
			room: {}, //Room object
			adminPassword: '', //Admin password
			correctAdminPassword: false, //If admin password is correct
			deleteRoom: false, //If user wants to delete the room
			changeAdminPasswordModal: false, //If user wants to change admin password (shows ChangePasswordModal)
			changeRoomPasswordModal: false, //If user wants to change room password (shows ChangePasswordModal)
			roomName: '', //Room name
			title: 'Admin Settings', //Modal title
			adminChangeErrorMessage: '', //Admin password change error message
			roomChangeErrorMessage: '', //Room password change error message
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
		/**
		 * @name submit
		 * @description This checks if the admin password is correct and shows admin settings if correct
		 */
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

		/**
		 * @name updateRoomName
		 * @description This send request to update Room Name
		 */
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

		/**
		 * @name deleteRoomClick
		 * @description This shows the delete room modal
		 */
		deleteRoomClick() {
			this.deleteRoom = true;
			this.title = 'Are you sure you want to delete this room?';
		},

		/**
		 * @name fetchRoom
		 * @description This gets the latest room information
		 */
		async fetchRoom() {
			const response = await this.axios.get(
				`/api/rooms/${this.$route.params.roomId}`
			);
			this.room = response.data;
			this.$emit('update', response.data);
		},

		/**
		 * @name deleteRoomSubmit
		 * @description This sends a request to delete the room
		 */
		deleteRoomSubmit() {
			this.axios
				.post(`/api/rooms/deleteRoom/${this.room._id}`, {
					password: this.adminPassword
				})
				.then(() => {
					this.$router.push('/rooms');
				});
		},

		/**
		 * @name close
		 * @description This resets all props and data and emits to parent to close settings modal
		 */
		close() {
			this.correctAdminPassword = false;
			this.deleteRoom = false;
			this.title = 'Admin Settings';
			this.errorMessage = '';
			this.$emit('close');
		},

		/**
		 * @name changeAdminPassword
		 * @description This sends a request to change admin password
		 */
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
				//If successful admin name change
				this.adminChangeErrorMessage = '';
				this.close();
			} else if (request.data.success === false) {
				//If unsuccessful admin name change shows error from server
				this.adminChangeErrorMessage = request.data.errorMessage;
			} else {
				//If unknown error
				this.adminChangeErrorMessage = 'Unknown Error!';
			}
		},

		/**
		 * @name changeRoomPassword
		 * @description This sends a request to change room password
		 */
		async changeRoomPassword(data) {
			if (data.newPassword !== data.confirmPassword) {
				//Checks if passwords match
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
				//If successful room name change
				this.roomChangeErrorMessage = '';
				this.close();
			} else if (request.data.success === false) {
				//If unsuccessful room name change shows error from server
				this.roomChangeErrorMessage = request.data.errorMessage;
			} else {
				//If unknown error
				this.roomChangeErrorMessage = 'Unknown Error!';
			}
		}
	},
	mounted() {
		this.room = this.roomObj; //Sets room object in data from prop
		this.roomName = this.room.name; //Sets room name in data from prop
	}
};
</script>

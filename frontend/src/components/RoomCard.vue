<template>
	<div
		class="bg-slate-200 p-2 cursor-pointer rounded-lg shadow-lg m-2 flex justify-center flex-col lg:w-80 w-full hover:bg-gray-100 transition duration-100 hover:scale-105"
		@click="roomClick()"
	>
		<h2 class="text-2xl font-bold mb-2 text-gray-800 flex overflow-hidden">
			<img v-if="privateRoom" src="../assets/lock.svg" />
			{{ room.name }}
		</h2>
		<p class="text-gray-700">
			<span class="font-semibold">Last Active:</span> {{ lastActive }}
		</p>
	</div>
	<!--Password Modal-->
	<Modal
		v-if="passwordModal && privateRoom"
		@close="passwordModal = false"
		@submit="submitPassword"
		:showSubmitBtn="true"
		submitBtnValue="Join Room"
		:title="roomPassModalText"
		:error="error"
		:errorMessage="errorMessage"
	>
		<p class="text-black">
			This room is password protected. Enter the password below to join.
		</p>
		<input
			type="password"
			class="w-5/6 p-2 mt-5 mb-0 rounded-md bg-gray-200"
			placeholder="Password"
			autocomplete="off"
			v-model="password"
		/>
	</Modal>

	<!--Network error Modal-->
	<Modal
		v-if="offlineErrorModal"
		@close="offlineErrorModal = false"
		:showSubmitBtn="false"
		title="Network error!"
	>
		<p class="text-black">
			You need to be online to connect to a room! Go online and try again!
		</p>
	</Modal>
</template>
<script>
//Components imports:
import Modal from './Modal.vue';

export default {
	name: 'RoomCard',
	components: {
		Modal
	},
	props: {
		room: {
			//Object containg room data
			type: Object,
			required: true
		}
	},
	data() {
		return {
			privateRoom: false, //if the room is private
			passwordModal: false, //Boolean to show password modal
			error: false, //if there is an error
			errorMessage: '', //error message
			offlineErrorModal: false, //Boolean to show offline error modal
			password: '' //password
		};
	},
	methods: {
		/**
		 * @name RoomClick
		 * @description checks if the room is private and if it is password protected and opens the modal
		 */
		roomClick() {
			if (!navigator.onLine) {
				//If offline, show error message
				this.offlineErrorModal = true;
				return;
			}
			if (!this.privateRoom) this.connectToRoom();
			else this.passwordModal = true;
		},
		/**
		 * @name submitPassword
		 * @description Checks if the password is correct and if so connects to the room
		 */
		async submitPassword() {
			const request = await this.axios.post(
				`/api/rooms/checkPassword/${this.room._id}`,
				{
					password: this.password
				}
			);
			if (request.data) {
				this.error = false;
				this.errorMessage = '';
				this.connectToRoom();
			} else {
				this.errorMessage = 'Wrong password!';
			}
		},
		/**
		 * @name ConnectToRoom
		 * @description Connects to room
		 */
		async connectToRoom() {
			this.$store.commit('joinRoom', this.password);
			this.$router.push('/room/' + this.room._id);
		}
	},
	computed: {
		/**
		 * @name lastActive
		 * @description Gets the last active time of the room
		 * @returns {string}
		 */
		lastActive() {
			const now = new Date();
			let lastActive;

			if (this.room.messages && this.room.messages.length > 0) {
				// If there are messages
				lastActive = new Date( // Get the time of the last message
					this.room.messages[this.room.messages.length - 1].sentAt
				);
			} else {
				// If there are no messages
				lastActive = new Date(this.room.createdAt); // Get the time of the room creation
			}

			const diff = now - lastActive; // Get the difference between now and the last active time
			const diffInSeconds = Math.round(diff / 1000); // Convert to seconds
			const diffInMinutes = Math.round(diff / 1000 / 60); // Convert to minutes
			const diffInHours = Math.round(diff / 1000 / 60 / 60); // Convert to hours
			const diffInDays = Math.round(diff / 1000 / 60 / 60 / 24); // Convert to days
			if (diffInSeconds < 15) {
				// If less than 15 seconds ago
				return 'Just now';
			} else if (diffInSeconds < 60) {
				// If less than a minute
				return `${diffInSeconds} seconds ago`;
			} else if (diffInMinutes < 60) {
				// If less than an hour
				return `${diffInMinutes} minute${
					diffInMinutes > 1 ? 's' : ''
				} ago`;
			} else if (diffInHours < 24) {
				// If less than a day
				return `${diffInHours} hour${diffInHours >= 1 ? 's' : ''} ago`;
			} else {
				// If more than a day
				return `${diffInDays} day${diffInDays >= 1 ? 's' : ''} ago`;
			}
		},
		/**
		 * @name roomPassModalText
		 * @description Returns the text for the password modal
		 * @returns {string}
		 */
		roomPassModalText() {
			return `Join Room "${this.room.name}"`;
		}
	},
	created() {
		this.privateRoom = this.room.private; //Checks if room is private on page load
	}
};
</script>

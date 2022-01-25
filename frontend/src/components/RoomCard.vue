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
		<p>
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
</template>
<script>
import Modal from './Modal.vue';

export default {
	name: 'RoomCard',
	components: {
		Modal
	},
	props: {
		room: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			privateRoom: false,
			passwordModal: false,
			error: false,
			errorMessage: '',
			password: ''
		};
	},
	methods: {
		roomClick() {
			if (!this.privateRoom) this.connectToRoom();
			else this.passwordModal = true;
		},
		submitPassword() {
			//TODO add password validation request
			this.error = false;
			this.errorMessage = '';
			this.connectToRoom();
		},
		connectToRoom() {
			this.$store
				.commit('joinRoom', {
					roomId: this.room._id,
					password: this.password
				})
				.then(() => {
					this.$router.push('/room/' + this.room._id);
				})
				.catch((err) => {
					this.error = true;
					this.errorMessage = err.message;
				});
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
		},
		roomPassModalText() {
			return `Join Room "${this.room.name}"`;
		}
	},
	created() {
		this.privateRoom = this.room.private;
	}
};
</script>

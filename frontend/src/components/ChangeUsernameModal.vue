<template>
	<!--Username Modal-->
	<Modal
		@close="close"
		@submit="submit"
		:showSubmitBtn="true"
		:showCancelBtn="false"
		submitBtnValue="Change"
		:title="modalTitle"
		:errorMessage="errorMessage"
	>
		<!-- Shows Text for change if the user is not setting name for the first time-->
		<p v-if="setBefore" class="w-5/6 p-2 rounded-md">To change your username enter your new one below!</p>
		<p v-else class="w-5/6 p-2 rounded-md">To use ChatBubble you need a username! Choose your username below!</p>
		<input
			type="text"
			class="w-5/6 p-2 m-5 mb-0 rounded-md bg-gray-200"
			placeholder="Username"
			autocomplete="off"
			maxlength="16"
			v-model="username"
		/>
	</Modal>
</template>

<script>
//Components imports:
import Modal from './Modal.vue';

export default {
	name: 'ChangeUsernameModal',
	components: {
		Modal
	},
	emits: ['close', 'submit'], //Emits events to parent component
	data() {
		return {
			username: '', //username
			errorMessage: '', //error message
			setBefore: false, //if the user is setting name for the first time
			modalTitle: '' //title of the modal
		};
	},
	methods: {
		/**
		 * @name Close
		 * @description Emits to parent to close modal
		 */
		close() {
			this.$emit('close');
		},
		/**
		 * @name Submit
		 * @description Emits to parent to submit username
		 */
		submit() {
			if (this.username.length < 3) {
				//if username is less than 3 characters show error
				this.errorMessage = 'Username must be at least 3 characters long';
				return;
			} else if (this.username.length > 16) {
				//if username is more than 3 characters, update username and close modal
				this.errorMessage = '';
				localStorage.username = this.username;
				this.$emit('close');
			} else {
				this.errorMessage = 'Something went wrong!';
			}
		}
	},
	created() {
		this.setBefore = localStorage.username ? true : false; //if the user is setting name for the first time
		this.modalTitle = this.setBefore ? 'Change Username' : 'Set Username'; //title of the modal
		this.username = localStorage.username; //Gets username from localStorage
	}
};
</script>

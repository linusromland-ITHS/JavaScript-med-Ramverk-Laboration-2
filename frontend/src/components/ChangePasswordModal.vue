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
		<p class="w-5/6 p-2 rounded-md">
			To change password, just type your old password and then choose a
			new one.
		</p>
		<!-- Old Password Input -->
		<input
			type="password"
			class="w-5/6 p-2 m-5 mb-0 rounded-md bg-gray-200"
			placeholder="Old Password"
			autocomplete="off"
			v-model="oldPassword"
		/>
		<!-- New Password Input -->
		<input
			type="password"
			class="w-5/6 p-2 m-5 mb-0 rounded-md bg-gray-200"
			placeholder="New Password"
			autocomplete="off"
			v-model="newPassword"
		/>
		<!-- Confirm Password Input -->
		<input
			type="password"
			class="w-5/6 p-2 m-5 mb-0 rounded-md bg-gray-200"
			placeholder="Confirm new password"
			autocomplete="off"
			v-model="confirmPassword"
		/>
	</Modal>
</template>

<script>
//Components imports:
import Modal from './Modal.vue';

export default {
	name: 'ChangePasswordModal',
	components: {
		Modal
	},
	emits: ['close', 'submit'], //Emits events to parent component
	data() {
		return {
			oldPassword: '', //Old password
			newPassword: '', //New password
			confirmPassword: '' //Confirm new password
		};
	},
	props: {
		//Props passed from parent component
		modalTitle: {
			//Modal title
			type: String,
			default: 'Change Password'
		},
		errorMessage: {
			//Error message
			type: String,
			default: ''
		}
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
		 * @description Emits to parent to submit
		 */
		submit() {
			this.$emit('submit', {
				oldPassword: this.oldPassword,
				newPassword: this.newPassword,
				confirmPassword: this.confirmPassword
			});
		}
	}
};
</script>

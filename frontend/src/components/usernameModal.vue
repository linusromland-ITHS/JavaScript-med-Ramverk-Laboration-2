<template>
	<Modal
		@close="close"
		@submit="submit"
		:showSubmitBtn="true"
		submitBtnValue="Change"
		:title="modalTitle"
		:errorMessage="errorMessage"
	>
		<p v-if="setBefore" class="w-5/6 p-2 rounded-md">
			To change your username enter your new one below!
		</p>
		<p v-else class="w-5/6 p-2 rounded-md">
			To use ChatBubble you need a username! Choose your username below!
		</p>
		<input
			type="text"
			class="w-5/6 p-2 m-5 mb-0 rounded-md bg-gray-200"
			placeholder="Username"
			autocomplete="off"
			v-model="username"
		/>
	</Modal>
</template>

<script>
import Modal from './Modal.vue';

export default {
	name: 'UsernameModal',
	components: {
		Modal
	},
	emits: ['close', 'submit'],
	data() {
		return {
			username: '',
			errorMessage: '',
			setBefore: false,
			modalTitle: ''
		};
	},
	methods: {
		close() {
			this.$emit('close');
		},
		submit() {
			if (this.username.length < 3) {
				this.errorMessage =
					'Username must be at least 3 characters long';
				return;
			} else {
				this.errorMessage = '';
				localStorage.username = this.username;
				this.$emit('close');
			}
		}
	},
	created() {
		this.setBefore = localStorage.username ? true : false;
		this.modalTitle = this.setBefore ? 'Change Username' : 'Set Username';
		this.username = localStorage.username;
	}
};
</script>

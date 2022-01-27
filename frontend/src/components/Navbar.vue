<template>
	<div class="bg-slate-900 px-6 h-16">
		<div class="py-4 flex justify-between">
			<a href="/rooms" class="flex">
				<img src="../assets/icon.svg" class="invert h-8" />
				<span class="pl-2 text-sky-500 font-semibold text-xl"
					>ChatBubble</span
				></a
			>
			<div class="relative flex items-center ml-auto">
				<a
					@click="usernameModal = true"
					class="text-slate-200 cursor-pointer text-right text-md"
				>
					<span class="text-slate-300 font-bold"> Username: </span>
					<span class="px-2">{{
						username ? username : 'Not Set'
					}}</span>
					<span class="text-sm text-slate-400 hover:text-sky-200"
						>(change)</span
					>
				</a>
			</div>
		</div>
	</div>
	<!--Username Modal-->
	<usernameModal v-if="usernameModal" @close="usernameSet" />
</template>

<script>
//Components imports:
import usernameModal from './usernameModal.vue';

export default {
	name: 'Navbar',
	components: {
		usernameModal
	},
	data() {
		return {
			usernameModal: '', //Boolean to show username modal
			username: '' //username
		};
	},
	methods: {
		/**
		 * @name usernameSet
		 * @description Sets the username
		 */
		usernameSet() {
			this.username = localStorage.username;
			this.usernameModal = false;
		}
	},
	created() {
		if (!localStorage.username) {
			//if the username is not set
			this.usernameModal = true; //show username modal
		}
		this.username = localStorage.username; //get username from local storage
	}
};
</script>

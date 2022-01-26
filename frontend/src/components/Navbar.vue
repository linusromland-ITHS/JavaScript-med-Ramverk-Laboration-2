<template>
	<div class="flex-none bg-slate-900 px-6 h-16">
		<div class="mx-auto">
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
						class="text-slate-200 cursor-pointer text-md"
					>
						<span class="text-slate-300 font-bold">
							Username:
						</span>
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
	</div>
	<usernameModal v-if="usernameModal" @close="usernameSet" />
</template>

<script>
import usernameModal from './usernameModal.vue';

export default {
	name: 'Navbar',
	components: {
		usernameModal
	},
	data() {
		return {
			usernameModal: '',
			username: ''
		};
	},
	methods: {
		usernameSet() {
			this.username = localStorage.username;
			this.usernameModal = false;
		}
	},
	created() {
		if (!localStorage.username) {
			this.usernameModal = true;
		}
		this.username = localStorage.username;
	}
};
</script>

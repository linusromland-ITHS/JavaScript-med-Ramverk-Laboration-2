<template>
	<div class="my-2 p-1 hover:bg-slate-400 rounded-md cursor-default w-full">
		<div class="flex items-center">
			<p class="text-md font-bold mr-4">{{ sender }}</p>
			<p class="text-sm">{{ time }}</p>
		</div>

		<p class="text-lg whitespace-normal" id="message">{{ message }}</p>
	</div>
</template>

<script>
export default {
	name: 'ChatMessage',
	inject: ['dayjs'],

	props: {
		message: {
			type: String,
			required: true
		},
		sender: {
			type: String,
			required: true
		},
		sentAt: {
			type: String,
			required: true
		}
	},
	computed: {
		time() {
			return this.dayjs(this.sentAt).fromNow();
		}
	}
};
</script>
<style scoped>
#message {
	overflow-wrap: break-word;
}
</style>

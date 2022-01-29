<template>
	<div class="my-2 p-1 hover:bg-slate-400 rounded-md cursor-default w-full">
		<div class="flex items-center">
			<!-- Username of the user that sent message -->
			<p class="text-md font-bold mr-4">{{ sender }}</p>
			<!-- Time of message -->
			<p class="text-sm">{{ time }}</p>
		</div>
		<!-- Message -->
		<p class="text-lg whitespace-normal" id="message">{{ message }}</p>
	</div>
</template>

<script>
export default {
	name: 'ChatMessage',
	inject: ['dayjs'], //Injects dayjs dependency

	props: {
		message: {
			//Message
			type: String,
			required: true
		},
		sender: {
			//Username of the user that sent message
			type: String,
			required: true
		},
		sentAt: {
			//Time of message
			type: String,
			required: true
		}
	},
	computed: {
		// Converts the ISO Time string to Relative Time
		time() {
			return this.dayjs(this.sentAt).fromNow();
		}
	}
};
</script>
<style scoped>
#message {
	/* Sets break-word on message */
	overflow-wrap: break-word;
}
</style>

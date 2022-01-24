<template>
	<div class="bg-white p-6 rounded-lg shadow-lg">
		<h2 class="text-2xl font-bold mb-2 text-gray-800">Lisse's Coola Rum</h2>
		<p class="text-gray-700">
			<span class="font-semibold">Last Active:</span> 2 hours ago
		</p>
	</div>
</template>
<script>
export default {
	name: 'RoomCard',
	props: {
		room: {
			type: Object,
			required: true
		}
	}
};
</script>

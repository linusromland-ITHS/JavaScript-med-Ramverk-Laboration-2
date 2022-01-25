<template>
	<main
		class="h-full flex items-center px-6 lg:px-32 bg-slate-900 text-white"
	>
		<section class="w-full md:w-9/12 xl:w-8/12">
			<h1 class="text-9xl lg:text-5xl font-bold text-sky-500">
				ChatBubble
			</h1>
			<p class="font-bold text-2xl">
				The free and open source chat platform!
			</p>
			<router-link
				class="text-white font-semibold h-12 px-6 my-6 rounded-lg flex items-center justify-center w-2/6 bg-sky-500 hover:bg-sky-400"
				to="/rooms"
				>Start Chatting...
			</router-link>
		</section>
	</main>
</template>

<script>
export default {
	name: 'Home'
};
</script>

<style>
main {
	background-image: url('../assets/wallpaper.png');
	background-size: cover;
}
</style>

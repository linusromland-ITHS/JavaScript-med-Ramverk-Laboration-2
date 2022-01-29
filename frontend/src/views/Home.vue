<template>
	<main
		class="h-screen w-screen flex items-center px-6 lg:px-32 bg-slate-900 text-white"
	>
		<section
			class="w-full md:w-9/12 xl:w-8/12 flex flex-col items-center justify-center lg:block"
		>
			<h1 class="text-5xl font-bold text-sky-500">ChatBubble</h1>
			<p class="font-bold text-2xl text-center lg:text-left">
				The free and open source chat platform!
			</p>
			<router-link
				class="text-white font-semibold h-12 px-6 my-6 rounded-lg flex items-center justify-center lg:w-2/6 w-10/12 bg-sky-500 hover:bg-sky-400"
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
	background-position: right;
}
</style>

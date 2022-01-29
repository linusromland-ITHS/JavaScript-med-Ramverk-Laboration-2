<template>
	<router-view></router-view>
</template>

<script>
if (!navigator.onLine) {
	console.log('App is running in offline mode! Usage of the app will be limited.');
} else {
	console.log('App is running in online mode!');
}
</script>

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
			manifest: {
				background_color: 'grey',
				display: 'standalone',
				icons: [
					{
						src: 'public/manifest-icon-192.maskable.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: 'public/manifest-icon-192.maskable.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable'
					},
					{
						src: 'public/manifest-icon-512.maskable.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: 'public/manifest-icon-512.maskable.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				],
				name: 'ChatBubble',
				short_name: 'ChatBubble',
				start_url: '.',
				theme_color: 'blue'
			},
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: [
					'assets/**',
					'index.html',
					'manifest.webmanifest'
				],
				runtimeCaching: [
					{
						handler: 'NetworkFirst',
						urlPattern: '/api/room/'
					}
				]
			}
		})
	]
});

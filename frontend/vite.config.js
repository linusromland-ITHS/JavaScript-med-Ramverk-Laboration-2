import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [
		VitePWA({
			manifest: {
				background_color: '#0f172a',
				display: 'standalone',
				icons: [
					{
						purpose: 'any',
						sizes: '192x192',
						src: 'manifest-icon-192.maskable.png',
						type: 'image/png'
					},
					{
						purpose: 'maskable',
						sizes: '192x192',
						src: 'manifest-icon-192.maskable.png',
						type: 'image/png'
					},
					{
						purpose: 'any',
						sizes: '512x512',
						src: 'manifest-icon-512.maskable.png',
						type: 'image/png'
					},
					{
						purpose: 'maskable',
						sizes: '512x512',
						src: 'manifest-icon-512.maskable.png',
						type: 'image/png'
					}
				],
				name: 'ChatBubble',
				short_name: 'ChtBbl',
				start_url: '.',
				theme_color: '#3b82f6'
			},
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['assets/**', 'index.html', 'manifest.webmanifest'],
				runtimeCaching: [
					{
						handler: 'NetworkFirst',
						// Cache GET requests to /api/rooms/
						urlPattern: '/api/rooms/'
					}
				]
			}
		}),
		vue()
	]
});

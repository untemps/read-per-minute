import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		lib: {
			name: '@untemps/read-per-minute',
			entry: './src/index.js',
			fileName: 'index'
		},
	},
})

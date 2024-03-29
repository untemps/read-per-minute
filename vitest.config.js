import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		global: true,
		coverage: {
			reporter: ['text', 'lcov'],
		},
	},
})

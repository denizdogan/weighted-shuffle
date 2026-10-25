import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		include: ["tests/**/*.test.ts"],
		globals: false,
		restoreMocks: true,
		coverage: {
			provider: "v8",
			enabled: true,
			include: ["src/**/*.ts"],

			reporter: ["text", "lcov"],
		},
	},
});

import { dts } from "rolldown-plugin-dts";
import { defineConfig, perEnvironmentPlugin } from "vite";

export default defineConfig({
	builder: {},
	plugins: [
		perEnvironmentPlugin("declarations", (environment) =>
			environment.name === "types"
				? dts({ generator: "oxc", emitDtsOnly: true })
				: false,
		),
	],
	oxc: { exclude: [/\.js$/, /\.d\.[cm]?ts$/] },
	build: { target: "es2022" },
	environments: {
		client: {
			build: {
				lib: {
					entry: "src/index.ts",
					formats: ["es", "cjs"],
					fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
				},
				rolldownOptions: { output: { exports: "named" } },
			},
		},
		types: {
			consumer: "client",
			build: {
				emptyOutDir: false,
				lib: { entry: "src/index.ts" },
				rolldownOptions: {
					// Declarations use ES output even for the CommonJS type variant.
					output: [
						{ format: "es", entryFileNames: "[name].mjs" },
						{ format: "es", entryFileNames: "[name].cjs" },
					],
				},
			},
		},
	},
});

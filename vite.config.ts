import { defineConfig } from "vite";
import fs from "node:fs";
import path from "node:path";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import commonjs from "vite-plugin-commonjs";

const port = +(process.env.SERVER_PORT || 8080);

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				app: "./src/entry.tsx",
				extension: "./packages/extension/entry.tsx",
				// "bundle-back": "./electron.js",
			},
		},
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
	resolve: {
		alias: {
			dist: "/dist",
			scss: "/src/scss",
			json: "/src/json",
			Lib: "/src/lib",
			img: "/src/assets/img",
			Store: "/src/store",
			Component: "/src/component",
			Interface: "/src/interface",
			Model: "/src/model",
			Docs: "/src/docs",
		},
	},
	publicDir: "dist",
	server: {
		port: port,
		host: "localhost",
	},
	optimizeDeps: {
		include: ["@anytype/proto"],
	},
	plugins: [
		commonjs(),
		viteCommonjs({
			include: ["@anytype/proto"],
		}),
		reactVirtualized(),
	],
});

function reactVirtualized() {
	return {
		name: "patch:react-virtualized",
		configResolved() {
			const file = require
				.resolve("react-virtualized")
				.replace(
					path.join("dist", "commonjs", "index.js"),
					path.join(
						"dist",
						"es",
						"WindowScroller",
						"utils",
						"onScroll.js",
					),
				);
			const code = fs.readFileSync(file, "utf-8");
			const modified = code.replace(
				`import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`,
				"",
			);
			fs.writeFileSync(file, modified);
		},
	};
}

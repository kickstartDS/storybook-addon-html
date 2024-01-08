import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

const shared = {
  entryPoints: ["src/index.ts", "src/manager.ts", "src/preview.ts"],
  bundle: true,
  platform: "browser",
  outdir: "dist",
  plugins: [
    nodeExternalsPlugin({
      dependencies: true,
      devDependencies: true,
      peerDependencies: true,
    }),
  ],
  metafile: true,
};

const results = await Promise.all([
  esbuild.build({
    ...shared,
    splitting: true,
    format: "esm",
    outExtension: { ".js": ".mjs" },
  }),
  esbuild.build({
    ...shared,
    format: "cjs",
  }),
]);

for (const result of results) {
  console.log(await esbuild.analyzeMetafile(result.metafile));
}

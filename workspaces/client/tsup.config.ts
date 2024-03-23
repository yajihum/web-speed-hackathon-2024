import path from 'node:path';

import { polyfillNode } from 'esbuild-plugin-polyfill-node';
import findPackageDir from 'pkg-dir';
import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

export default defineConfig(async (): Promise<Options[]> => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const PACKAGE_DIR = (await findPackageDir(process.cwd()))!;

  const OUTPUT_DIR = path.resolve(PACKAGE_DIR, './dist');

  return [
    {
      bundle: true,
      clean: true,
      entry: {
        client: path.resolve(PACKAGE_DIR, './src/index.tsx'),
        serviceworker: path.resolve(
          PACKAGE_DIR,
          './src/serviceworker/index.ts',
        ),
      },
      env: {
        API_URL: '',
        NODE_ENV: 'production',
      },
      esbuildOptions(options) {
        options.define = {
          ...options.define,
          global: 'globalThis',
        };
        options.publicPath = '/';
      },
      esbuildPlugins: [
        polyfillNode({
          globals: {
            process: false,
          },
        }),
      ],
      format: 'esm',
      loader: {
        '.wasm': 'binary',
      },
      minify: true,
      noExternal: [/.*/],
      outDir: OUTPUT_DIR,
      platform: 'browser',
      sourcemap: false,
      splitting: true,
      target: ['chrome123'],
      treeshake: true,
    },
  ];
});

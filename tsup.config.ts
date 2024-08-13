import { defineConfig } from 'tsup';

export default defineConfig((option) => ({
  format: ['cjs', 'esm'],
  entry: ['./src/index.ts'],
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  jsxFactory: option.jsxFactory,
  jsxFragment: option.jsxFragment,
  external: ['react', 'react-dom'],
}));

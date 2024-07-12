import {defineConfig} from 'tsup'

export default defineConfig({
    format: ['cjs', 'esm'],
    entry: [
        './src/hooks/usePrecognition.ts',
        './src/PrecognitionContext/index.tsx',
    ],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
})

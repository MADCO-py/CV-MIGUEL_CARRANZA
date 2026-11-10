import { mkdir, copyFile } from 'node:fs/promises';
import { build, context } from 'esbuild';
await mkdir('js/retro-fonts', { recursive: true });
for (const font of ['vt323', 'ibm-plex-mono']) {
  await copyFile(`node_modules/@fontsource/${font}/LICENSE`, `js/retro-fonts/LICENSE-${font}.txt`);
}
const options = {
  entryPoints: ['src/retro/index.jsx'],
  bundle: true,
  outfile: 'js/retro-ui.bundle.js',
  minify: true,
  jsx: 'automatic',
  platform: 'browser',
  target: ['es2020'],
  define: { 'process.env.NODE_ENV': '"production"' },
  loader: { '.woff': 'file', '.woff2': 'file' },
  assetNames: 'retro-fonts/[name]-[hash]',
  legalComments: 'linked',
  metafile: true
};
if (process.argv.includes('--watch')) {
  const session = await context(options);
  await session.watch();
  console.log('Watching JSX and styles. Reload the browser after edits.');
} else {
  const result = await build(options);
  const { gzipSync } = await import('node:zlib');
  const { readFileSync } = await import('node:fs');
  console.log(`Retro UI built: ${Math.round(gzipSync(readFileSync(options.outfile)).length / 1024)} KiB gzip; ${Object.keys(result.metafile.outputs).length} outputs.`);
}

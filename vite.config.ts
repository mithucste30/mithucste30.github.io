import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';

// Parse YAML at build time so js-yaml never ships to the client.
function yamlPlugin(): Plugin {
  return {
    name: 'yaml-to-json',
    enforce: 'pre',
    load(id) {
      if (/\.ya?ml$/.test(id)) {
        const data = yaml.load(readFileSync(id, 'utf8'));
        return { code: `export default ${JSON.stringify(data)}`, map: null };
      }
      return null;
    },
  };
}

// Relative base so the built site works at any GitHub Pages path
// (project page: mithucste30.github.io/cv-builder/) without rebuilds.
export default defineConfig({
  base: './',
  plugins: [yamlPlugin(), react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
  },
});

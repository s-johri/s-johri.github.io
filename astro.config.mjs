// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://s-johri.github.io',
  // The default HTML compressor deletes whitespace containing a newline when it
  // touches a tag boundary, gluing words to inline tags like <strong>.
  compressHTML: false,
});

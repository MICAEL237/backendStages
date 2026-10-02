import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // On exclut le dossier dist pour ne pas exécuter les fichiers compilés
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
});

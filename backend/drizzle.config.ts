import { defineConfig } from 'drizzle-kit';

import 'dotenv/config';

export default defineConfig({

  // emplament des schemas typescript
  schema: './src/db/schema.ts',

  // dossier de sortie des migrations
  out: './drizzle',

  // le type de base de donnne utiliser
  dialect: 'mysql',

  // identigfiant de connexion du dossier .env
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

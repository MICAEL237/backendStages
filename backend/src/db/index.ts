import 'dotenv/config'; // 👈 Charge .env en premier
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

// 1. Configuration des options du pool
// Ces options évitent que votre base de données ne sature sous la charge
const poolConnection = mysql.createPool({
  // uri: process.env.DATABASE_URL!,
  uri: "mysql://micael123:dev123@127.0.0.1/schooldatabase",
  waitForConnections: true,
  connectionLimit: 10,  // Nombre max de connexions simultanées dans le pool
  queueLimit: 0,        // Pas de limite d'attente en file si toutes les connexions sont prises
});

// 2. Initialisation de Drizzle avec le pool
export const db = drizzle({ client: poolConnection.pool });

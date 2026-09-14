import { drizzle } from 'drizzle-orm/mysql2';
import* as schema from './schema.js';
import 'dotenv/config'
import { config } from 'zod/v4/core';

config()

  export const db = drizzle(process.env.DABASE_URL!);

  console.log('Début du seed...');

  // 1. Roles -----------------------------------------------------------
  await db.insert(schema.Role).values([
    { id: 1, statuUser: 'admin' },
    { id: 2, statuUser: 'User' },
  ]);

  await db.insert(schema.users).values([
    {
      id: 1,
      name: 'Admin Principal',
      email: 'admin@ecole.test',
      specialite: 'Administration',
      tel: '699000001',
      passeword: 'password123',
      id_role: 1,
    },
    {
      id: 2,
      name: 'Jean Mballa',
      email: 'jean.mballa@ecole.test',
      specialite: 'Mathématiques',
      tel: '699000002',
      passeword: 'password123',
      id_role: 2,
    },
    {
      id: 3,
      name: 'Aïcha Ndjock',
      email: 'aicha.ndjock@ecole.test',
      specialite: 'Français',
      tel: '699000003',
      passeword: 'password123',
      id_role: 2,
    },
    {
      id: 4,
      name: 'Paul Etoundi',
      email: 'paul.etoundi@ecole.test',
      specialite: 'Physique-Chimie',
      tel: '699000004',
      passeword: 'password123',
      id_role: 2,
    },
  ]);

  // 3. Matieres ----------------------------------------------------------
  await db.insert(schema.matiere).values([
    { id: 1, intitule: 'Mathématiques' },
    { id: 2, intitule: 'Français' },
    { id: 3, intitule: 'Anglais' },
    { id: 4, intitule: 'Physique-Chimie' },
    { id: 5, intitule: 'Sciences de la Vie et de la Terre' },
    { id: 6, intitule: 'Histoire-Géographie' },
    { id: 7, intitule: 'Philosophie' },
  ]);

//   // 4. Eleves --------------------------------------------------------------
//   await db.insert(eleve).values([
//     {
//       id: 1,
//       matricule: 'MAT2026001',
//       nom: 'Fotso',
//       prenom: 'Line',
//       date_naiss: '2009-03-14',
//       lieu: 'Garoua',
//       sexe: 'F',
//     },
//     {
//       id: 2,
//       matricule: 'MAT2026002',
//       nom: 'Bello',
//       prenom: 'Ahmadou',
//       date_naiss: '2008-11-02',
//       lieu: 'Maroua',
//       sexe: 'M',
//     },
//     {
//       id: 3,
//       matricule: 'MAT2026003',
//       nom: 'Nguemo',
//       prenom: 'Sarah',
//       date_naiss: '2009-07-21',
//       lieu: 'Ngaoundéré',
//       sexe: 'F',
//     },
//     {
//       id: 4,
//       matricule: 'MAT2026004',
//       nom: 'Oumarou',
//       prenom: 'Idriss',
//       date_naiss: '2008-01-30',
//       lieu: 'Garoua',
//       sexe: 'M',
//     },
//   ]);

  // 5. Classes -------------------------------------------------------------
  await db.insert(schema.classe).values([
    { id: 1, niveau: 'Seconde', cycle: 'Second cycle', sous_section: 'A' },
    { id: 2, niveau: 'Première', cycle: 'Second cycle', sous_section: 'C' },
    { id: 3, niveau: 'Terminale', cycle: 'Second cycle', sous_section: 'D' },
  ]);

  // 6. Series ----------------------------------------------------------------
  await db.insert(schema.serie).values([
    { id: 1, intitule: 'Scientifique', code: 'C' },
    { id: 2, intitule: 'Sciences Exp', code: 'D' },
    { id: 3, intitule: 'Littéraire', code: 'A' },
  ]);

  // 7. Salles (classe + serie) -------------------------------------------
  await db.insert(schema.salle).values([
    { id: 1, nom_salle: 'Salle-2ndeA', effectif: 45, id_classe: 1, id_serie: 3 },
    { id: 2, nom_salle: 'Salle-1ereC', effectif: 40, id_classe: 2, id_serie: 1 },
    { id: 3, nom_salle: 'Salle-TleD', effectif: 38, id_classe: 3, id_serie: 2 },
  ]);

  // 8. Notes -----------------------------------------------------------------
  await db.insert(schema.note).values([
    { id: 1, valeur: 14.5, sequence: 1, annee: '2025-2026', id_mat: 1, id_ele: 1 },
    { id: 2, valeur: 12.0, sequence: 1, annee: '2025-2026', id_mat: 2, id_ele: 1 },
    { id: 3, valeur: 16.75, sequence: 1, annee: '2025-2026', id_mat: 1, id_ele: 2 },
    { id: 4, valeur: 9.5, sequence: 2, annee: '2025-2026', id_mat: 4, id_ele: 3 },
    { id: 5, valeur: 11.25, sequence: 2, annee: '2025-2026', id_mat: 3, id_ele: 4 },
  ]);

  // 9. Table pivot matieresalle (matière <-> salle, avec coefficient) -------
  await db.insert(schema.matieresalle).values([
    { id_matiere: 1, id_salle: 1, coef: 4, annee: 2026 },
    { id_matiere: 2, id_salle: 1, coef: 3, annee: 2026 },
    { id_matiere: 1, id_salle: 2, coef: 5, annee: 2026 },
    { id_matiere: 4, id_salle: 3, coef: 6, annee: 2026 },
  ]);

  // 10. Table pivot usermatiere (enseignant <-> matière) --------------------
  await db.insert(schema.usermatiere).values([
    { id_ur: 2, id_matiere: 1, annee: 2026 }, // Jean Mballa -> Maths
    { id_ur: 3, id_matiere: 2, annee: 2026 }, // Aïcha -> Français
    { id_ur: 4, id_matiere: 4, annee: 2026 }, // Paul -> Physique-Chimie
  ]);

  // 11. Table pivot elevesalle (élève <-> salle) -----------------------------
  await db.insert(schema.elevesalle).values([
    { id_salle: 1, id_ele: 1, annee: 2026 },
    { id_salle: 1, id_ele: 2, annee: 2026 },
    { id_salle: 2, id_ele: 3, annee: 2026 },
    { id_salle: 3, id_ele: 4, annee: 2026 },
  ]);

  // 12. Table pivot usersame / usersalle (enseignant <-> salle, titulaire) ---
  await db.insert(schema.usersame).values([
    { id_ur: 2, id_salle: 1, annee: 2026, titulaire: true },
    { id_ur: 3, id_salle: 2, annee: 2026, titulaire: false },
    { id_ur: 4, id_salle: 3, annee: 2026, titulaire: true },
  ]);


  console.log('terminer')
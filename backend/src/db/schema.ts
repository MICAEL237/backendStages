import { mysqlTable,float, varchar, int, timestamp, mysqlEnum, date, primaryKey, boolean } from 'drizzle-orm/mysql-core';



  
export const Role = mysqlTable('role', {
  id: int ('id_role').primaryKey().autoincrement(),
  statuUser: mysqlEnum(['admin', 'User']),
  creer: timestamp('cree_le').defaultNow().notNull(),
  mod: timestamp('mod_le').defaultNow().notNull(),
})

  
 export const users = mysqlTable('users', { 
  
  id: int('id_ur').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  specialite: varchar('specialite', {length: 255}).notNull(),
  tel: varchar('tel', {length: 25}).notNull(),
  passeword:varchar('password', {length: 15}),
  id_role: int('id_role').notNull().references(() => Role.id)
});


export const  matiere = mysqlTable('matiere', {
  id: int('id_matiere').primaryKey().autoincrement(),
  intitule: varchar('intitule', {length: 255}),
  creer: timestamp('cree_le').defaultNow().notNull(),
  mod: timestamp('mod_le').defaultNow().notNull(),
})

export const eleve = mysqlTable('eleve', {
  id: int('id_ele').primaryKey().autoincrement(),
  matricule: varchar('matricule', {length: 20}).notNull().unique(),
  nom: varchar('nom', {length: 255}).notNull(),
  prenom:varchar('prenom', {length: 255}),
  date_naiss: date('date_naiss').notNull(),
  lieu: varchar('lieu_naiss', {length: 255}).notNull(),
  sexe: mysqlEnum(['M', 'F']).notNull(),
  creer: timestamp('cree_le').defaultNow().notNull(),
  mod: timestamp('mod_le').defaultNow().notNull(),
})

export const note = mysqlTable('note', {
  id: int('id_note').primaryKey().autoincrement(),
  valeur: float('valeur').notNull(),
  sequence: int('sequence').notNull(),
  creer: timestamp('cree_le').defaultNow().notNull(),
  mod: timestamp('mod_le').defaultNow().notNull(),
  annee: varchar('anneeScolaire', {length: 10}),
  id_mat: int('id_matiere').references(() => matiere.id, {onUpdate:'cascade'}),
  id_ele: int('id_ele').references(() => eleve.id, {onUpdate:'cascade'}),

})


export const classe = mysqlTable('classe', {
  id: int('id_classe').primaryKey().autoincrement(),
  niveau: varchar('niveau', {length: 30}).notNull(),
  cycle: varchar('cycle', {length:20 }),
  sous_section: varchar('sous_section', {length:30}).notNull(),
  creer: timestamp('cree_le').defaultNow().notNull(),
  mod: timestamp('mod_le').defaultNow().notNull(),
  
})



export const serie = mysqlTable('serie', {
  id: int('id_serie').primaryKey().autoincrement(),
  intitule: varchar('intitule', {length:20}).notNull(),
  code: varchar('code', {length:20}).unique().notNull(),
  creer: timestamp('cree_le').defaultNow().notNull(),
  mod: timestamp('mod_le').defaultNow().notNull(),
})




export const  salle =  mysqlTable('salles', {
  id: int('id_salle').primaryKey().autoincrement(),
  nom_salle:varchar('nom_salle', {length:20}).notNull().unique(),
  effectif: int('effectif').notNull(),
  creer: timestamp('cree_le').defaultNow().notNull(),
  mod: timestamp('mod_le').defaultNow().notNull(),
  id_classe: int('id_classe').references(() => classe.id),
  id_serie: int('id_serie').references(() => serie.id, {onDelete:'cascade', onUpdate:'cascade'})
}) 


export const matieresalle = mysqlTable('matieresalle',{
  id_matiere: int('id_matiere').references(() => matiere.id, {onDelete:'cascade', onUpdate:'cascade'}),
  id_salle: int('id_salle').references(() => salle.id, {onDelete:'cascade', onUpdate:'cascade'}),
  coef: int('coef').notNull(),
  annee: int('annee').notNull(),
  
},
(table) => [
    primaryKey({name:'cle_primaire', columns:[table.id_matiere, table.id_salle]})
]
)


export const usermatiere = mysqlTable('usermatiere', {
  id_ur: int('int_ur').references(() => users.id, {onDelete:'cascade', onUpdate:'cascade'}),
  id_matiere: int('id_matiere').references(() => matiere.id, {onDelete:'cascade', onUpdate:'cascade'}),
  annee: int('annee').notNull()

  },

  (table) => [
    primaryKey({name:'clePrimaire', columns:[table.id_matiere,  table.id_ur]})
  ]

)



export const elevesalle = mysqlTable('elevesalle', {
  id_salle: int('id_salle').references(() => salle.id, {onDelete:'cascade', onUpdate:'cascade'}),
  id_ele: int('id_ele').references(() => eleve.id, {onDelete:'cascade', onUpdate:'cascade'}),
  annee: int('annee').notNull()
},
(table) => [
  primaryKey({name:'cle_primaire', columns:[table.id_ele, table.id_salle]})
])


export const usersame= mysqlTable('usersalle', {
    id_ur: int('int_ur').references(() => users.id, {onDelete:'cascade', onUpdate:'cascade'}),
    id_salle: int('id_salle').references(() => salle.id, {onDelete:'cascade', onUpdate:'cascade'}),
    annee: int('annee').notNull(),
    titulaire: boolean('titulaire').notNull()
},

(table) => [
  primaryKey({name:'preimary_key', columns:[table.id_salle, table.id_ur]})

])
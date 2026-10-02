import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './schema.js';
import 'dotenv/config';
import { config } from 'zod/v4/core';
import { db } from '../db/index.js';
import { eq, sql, and, asc, sum } from 'drizzle-orm';
import { ModelStudent } from '../features/students/models/students.model.js';
import type { StudentSDTO } from '../features/students/type.js';
import { ServiceStudent } from '../features/students/services/student.sevice.js';
import { read } from 'fs';

config();

// const NodeStudentP = await db.select({
//     nom: sql<string>`CONCAT(${model.eleve.nom}, ' ', ${model.eleve.prenom})`,
//     note:model.note.valeur,
//     matiere:model.matiere.intitule,
//     coef: model.note.coef,
//     sequence: model.note.sequence,
//     notepondere: sql<number>`${model.note.valeur} * ${model.note.coef}`.as ('notepondere')
// }).from(model.note).innerJoin(model.eleve, eq(model.note.id_ele, model.eleve.id))
//                     .innerJoin( model.matiere, eq(model.note.id_mat, model.matiere.id)).where(and (eq(model.eleve.id, 1),
//                                                                                                         eq(model.note.sequence, 1)))

// const NodeStudentP = await db.select({
//     nom: sql<string>`CONCAT(${model.eleve.nom}, ' ', ${model.eleve.prenom})`,
//     note:model.note.valeur,
//     matiere:model.matiere.intitule,
//     coef: model.note.coef,
//     sequence: model.note.sequence,
//     notepondere: sql<number>`${model.note.valeur} * ${model.note.coef}`.as ('notepondere')
// }).from(model.note).innerJoin(model.eleve, eq(model.note.id_ele, model.eleve.id))
//                     .innerJoin( model.matiere, eq(model.note.id_mat, model.matiere.id)).where(eq(model.eleve.id, 1))
// console.log(NodeStudentP)

// const listClasse = await db.select({

//               nom: sql<string> `CONCAT( ${model.eleve.nom}, ' ' ,${model.eleve.prenom})`,
//               classe: model.salle.nom_salle,

// }).from(model.elevesalle)
//   .innerJoin(model.eleve,eq( model.elevesalle.id_ele, model.eleve.id))
//   .innerJoin(model.salle, eq(model.elevesalle.id_salle, model.salle.id)).where(eq(model.salle.id, 1)).orderBy(asc(model.eleve.nom))
// console.log(listClasse)

// const noteMatiere = await db.select({
//             nom: sql<string>`CONCAT(${model.eleve.nom}, ' ', ${model.eleve.prenom})`,
//             intituler: model.matiere.intitule,
//             note: model.note.valeur,
//             salle: model.salle.nom_salle,
//             coef:model.matieresalle.coef,
//             seq:model.note.sequence
// }).from((model.note))
//   .innerJoin(model.matieresalle, eq(model.note.id_mat, model.matieresalle.id_matiere))
//   .innerJoin(model.salle, eq(model.matieresalle.id_salle, model.salle.id))
//   .innerJoin(model.matiere, eq(model.matiere.id, model.matieresalle.id_matiere))
//   .innerJoin(model.eleve, eq(model.eleve.id, model.note.id_ele)).where(and(eq(model.eleve.id, 1),
//                                                                             eq(model.salle.id, 1),
//                                                                             eq(model.note.sequence, 2)))

// console.log(noteMatiere)

//   const modelStudent  = new ModelStudent()

//  const res= await  modelStudent.ListeNoteMat('23LT001', 1, 2026)
//  console.log(res)

// const InfoEtud = await db.select({
//         name: sql<string>`${model.users.name}`,
//         salle: model.salle.nom_salle,
//         annee:model.usermatiere.annee,
//         specialite: model.users.specialite
// }).from(model.matiere)
// .innerJoin(model.matiere, eq( model.matiere.id, model.matieresalle.id_matiere))
// .innerJoin(model.salle, eq(model.salle.id,  model.matieresalle.id_salle))
// .innerJoin(model.users, eq(model.usermatiere.id_ur, model.users.id))
// .where(and(eq(model.salle.id, 3), eq(model.usermatiere.annee, 2026)))

// console.log(InfoEtud)

//  const userSalle = await db.select({

//             salle: model.salle.nom_salle,
//             name: model.users.name,
//             nom: model.matiere.intitule,
//         }).from(model.usersalle)
//           .innerJoin(model.users, eq(model.usersalle.id_ur, model.users.id))
//           .innerJoin(model.usermatiere, eq(model.usermatiere.id_ur, model.users.id))
//           .innerJoin(model.matiere, eq(model.matiere.id, model.usermatiere.id_matiere))
//           .innerJoin(model.salle, eq(model.usersalle.id_salle, model.salle.id))
//           .where(and ( eq(model.salle.nom_salle, '6M2'), eq(model.usersalle.annee, 2026)))

// console.log(userSalle)

// const scoef = await db.select({
//   matricule: model.eleve.matricule,
//   sum: (sql<number>`sum(${model.note.valeur } * ${model.note.coef})`),
//   coef:(sql<number>`sum(${model.note.coef})`),
//   salle: model.salle.nom_salle
// }).from(model.salle)
//   .innerJoin(model.elevesalle, eq(model.salle.id, model.elevesalle.id_salle))
//   .innerJoin(model.eleve, eq(model.elevesalle.id_ele, model.eleve.id))
//  .innerJoin(model.note, eq(model.eleve.id, model.note.id_ele))
//  .groupBy(model.salle.nom_salle, model.eleve.matricule, model.note.sequence)
//   .where(and(eq(model.salle.nom_salle, '6M2'), eq(model.note.annee, '2025/2026'),eq(model.note.sequence, 1)))

// console.log(scoef)

// const infos = await db
//   .select({
//     name: schema.users.name,
//     salle: schema.salle.nom_salle,
//     matiere: schema.matiere.intitule,
//     annee: schema.usersalle.annee,
//   })
//   .from(schema.matiere)
//   .innerJoin(schema.salle, eq(schema.salle.id, schema.usersalle.id_salle))
//     .innerJoin(schema.users, eq(schema.usersalle.id_ur, schema.users.id))

//   .innerJoin(schema.usersalle, eq(schema.usersalle.id_ur, schema.users.id))
//   .innerJoin( schema.usermatiere, eq(schema.usermatiere.id_matiere, schema.matiere.id),
//   )
//   .where(and(eq(schema.users.email, 'lienoumicael@gmail.com')));

// console.log(infos);

const params = {
   annee:'2026',
    salle: '6M1'
}


async function  MoyApreciation(params: StudentSDTO) {
    try {
        const s = new ServiceStudent()
        let M
        let v = 'Admis'
        const Moyenne: {
            [key: string]:{
                moyenne: number;
                appreciation: string;
                validation: string;

            }[];
        } = {}
        const res = await s.sommeCoef(params)
        if(!res?.objet || !res.objet[0]){
            console.log('existe pas ')
            return 0
        }
        for(const r of res?.objet){
            
             const NoteMoyenne =  r.sum! / r.coef!
            
             if (NoteMoyenne! < 8) {
                    M = 'Faible';
                  } else if (NoteMoyenne! <= 9.49) {
                    M = 'Mediocre';
                    v = "Echec"
                  } else if (NoteMoyenne! <= 11.99) {
                    M = 'Passable';
                  } else if (NoteMoyenne! <= 13.99) {
                    M = 'Assez Bien';
                  } else if (NoteMoyenne! <= 15.99) {
                    M = 'Bien';
                  } else {
                    M = 'Tres Bien';
                  }
                   
                  if (!Moyenne[r.matricule]) {
                      Moyenne[r.matricule] = [];
                    }
                  Moyenne[r.matricule]!.push({
                    moyenne: NoteMoyenne,
                    appreciation: M,
                    validation: v
                  })
        }

       
       return Moyenne
    } catch (error) {
      console.log(error)
    }
  }

  const res = await MoyApreciation(params)
  console.log(res)


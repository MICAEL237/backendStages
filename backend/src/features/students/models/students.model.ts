import * as model from '../../../db/schema.js'
import type { StudentDIO, StudentNDTO, StudentSDTO } from '../type.js';
import { db } from '../../../db/index.js'
import { and, desc, eq, sql } from 'drizzle-orm';


export class ModelStudent{

    async create(studentData: StudentDIO){
        try {

            return await db.insert(model.eleve).values(studentData)

        } catch (error) {
            
            console.log('Erreur model eleve: ', error)
            
        }
    }

    async list(){
        try {

            const liste = await db.select().from(model.eleve)
            return liste 

        } catch (error) {

            console.log("Erreur modelStudent liste: ", error)
            
        }
    }

    async delete(matricule: string){
        try {
            console.log('ok')
           return await db.delete(model.eleve).where(eq(model.eleve.matricule, matricule))


        } catch (error) {
            console.log('Erreur delete studentmodel: ', error)
            
        }

    }

    //recuperation des sequences
    async ReturnSeqs(){
        const seqs = await db.selectDistinct({ seqs: model.note.sequence}).from(model.note)
        return seqs
    }

     async ReturnIdMat(salle: string){
        const Idsalle = await db.select({id: model.salle.id}).from(model.salle)
        const idMatiere = await db.select({
             id: model.matieresalle.id_matiere
        }).from(model.matieresalle)
        .innerJoin(model.matiere, eq(model.matieresalle.id_matiere, model.matiere.id))
        .innerJoin(model.salle, eq(model.matieresalle.id_salle, model.salle.id))
        .where(eq(model.salle.id, Idsalle[0]?.id!))
        return idMatiere
    }

    //recuperation des matricules
    async ReturnMat(){
        const matricule = await db.select({matricule: model.eleve.matricule}).from(model.eleve).orderBy(desc(model.eleve.creer))
        return matricule
    }

     //recuperation des id_salle
     async ReturnIdsalle(){
        const IdSalle = db.select({id: model.salle.id}).from(model.salle)
        return IdSalle
     }

     //Annee scolaire
     async ReturnAnnee(){
        const AnneSC = db.selectDistinct({annee: model.elevesalle.annee}).from(model.elevesalle)
        return AnneSC
     }




    // somme(note * coef) somme des coefficients
    async SomCoefNote(seq: number,  StudentNDATA: StudentSDTO){
    const scoef = await db.select({
      matricule: model.eleve.matricule,
      sum: (sql<number>`sum(${model.note.valeur } * ${model.note.coef})`),
      coef:(sql<number>`sum(${model.note.coef})`),
      salle: model.salle.nom_salle,
      rangClassement: sql<number>`DENSE_RANK() OVER (ORDER BY (sum(${model.note.valeur } * ${model.note.coef})) DESC)`

    }).from(model.salle)
      .innerJoin(model.elevesalle, eq(model.salle.id, model.elevesalle.id_salle))
      .innerJoin(model.eleve, eq(model.elevesalle.id_ele, model.eleve.id))
     .innerJoin(model.note, eq(model.eleve.id, model.note.id_ele))
     .groupBy(model.salle.nom_salle, model.eleve.matricule, model.note.sequence)
      .where(and(eq(model.salle.nom_salle, StudentNDATA.salle), eq(model.note.annee,  StudentNDATA.annee)))
    
        return scoef
    }

    //matiere note coef coef*note pour chaque eleve groupe(matiere) salle

    async ListeNoteMat(matricule:string, mat: number,seq: number,  StudentNDATA: StudentNDTO){
            const EleId = await db.select({id: model.eleve.id}).from(model.eleve).where(eq(model.eleve.matricule, matricule))                
            const Idsalle = await db.selectDistinct({id: model.salle.id}).from(model.salle).where(eq(model.salle.nom_salle, StudentNDATA.salle))
            console.log("rien", Idsalle[0]?.id!)
            const selct = await db.select(
            {
                matricule: model.eleve.matricule,
                matiere: model.matiere.intitule,
                note:model.note.valeur,
                groupe: model.matiere.groupe,
                coef: model.note.coef,
                NC:sql<number>`${model.note.valeur} * ${model.note.coef}`,
                seq:model.note.sequence,
                salle: model.salle.nom_salle,
                effectif:model.salle.effectif

            }
            ).from(model.eleve)
            .innerJoin(model.note, eq(model.eleve.id, model.note.id_ele))
            .innerJoin(model.elevesalle, eq(model.eleve.id, model.elevesalle.id_ele))
            .innerJoin(model.salle, eq(model.salle.id, model.elevesalle.id_salle))
            .innerJoin(model.matiere, eq(model.matiere.id, model.note.id_mat))
            .where(and(eq(model.eleve.id, 
                EleId[0]?.id!), 
                eq(model.elevesalle.annee, StudentNDATA.annee), 
                eq(model.note.sequence, seq), 
                eq(model.salle.id, Idsalle[0]?.id!),
                eq(model.matiere.id, mat)))


            return selct
    }

//entete du bulletin ce qui concerne les ifos de l'eleve

    async InfoEtu(StudentNDATA: StudentNDTO){
        try {
            const Idsalle = await db.selectDistinct({id: model.salle.id}).from(model.salle).where(eq(model.salle.nom_salle, StudentNDATA.salle))
            const InfoEtud = await db.select({
                    Matricule: model.eleve.matricule,
                    Nom: model.eleve.nom,
                    Prenom: model.eleve.prenom,
                    date_ais:model.eleve.date_naiss,
                    lieu: model.eleve.lieu,
                    salle: model.salle.nom_salle,
                    effectif: model.salle.effectif,
                    annee:model.elevesalle.annee,
                    sexe: model.eleve.sexe
            }).from(model.elevesalle)
            .innerJoin(model.eleve, eq( model.eleve.id, model.elevesalle.id_ele))
            .innerJoin(model.salle, eq(model.salle.id,  model.elevesalle.id_salle))
            .where(and(eq(model.salle.id, Idsalle[0]?.id!), eq(model.elevesalle.annee, StudentNDATA.annee)))
            console.log(InfoEtud, Idsalle)
            return InfoEtud
            
        } catch (error) {
            console.log('Probleme select info eleve', error)
            
        }
    }




}




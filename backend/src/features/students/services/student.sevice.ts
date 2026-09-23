import z, { safeParse } from "zod"
import { ModelStudent } from "../models/students.model.js"
import type { StudentDIO, StudentNDTO } from "../type.js"
const model = z.object( {
    matricule: z.string(),
    nom: z.string(),
    prenom: z.string(),
    date_naiss: z.coerce.date(),
    lieu: z.string(),
    sexe: z.string()

})

const ModelND =z.object({
    annee: z.coerce.number(), 
    salle: z.string()

})




export class ServiceStudent{
     

    async create(studentData: StudentDIO){
        const modelStudent = new ModelStudent

        const result = model.safeParse(studentData)

        if(result.success){
            modelStudent.create(studentData)
            console.log('Creation reussite')
            return result
        }
        return console.log('Entrer non valide serivce create student')
    }


    async   NoteMoyenne( StudentNDATA: StudentNDTO){
        const FinalObjet: {
        [key: string]: {
        eleve: {

            seq: number;
            notecoef: number;
            // nom: string;
            somcoef: number;
            }
  
        Moyenne: number;
        mention: string
    }[];
} = {};
        let NoteCoef
        let M
        let note
        const  modelstudent = new ModelStudent()

        const matricule = await modelstudent.ReturnMat()
        const res = ModelND.safeParse(StudentNDATA)
        const seqs = await modelstudent.ReturnSeqs()


        try {
          
          if(res.success){
            // console.log(seq)
                
                for(const seq of seqs ){
                for(const mat of matricule){

                    NoteCoef = await modelstudent.SomCoefNote(mat.matricule, StudentNDATA, seq.seqs)
                    
                    if(NoteCoef[0]?.seq === null){
                        // console.log('')
                    }else{
                        
                        NoteCoef[0]?.notecoef || 0
                        NoteCoef[0]?.somcoef||1
                
                            
                        // console.log(NoteCoef)
                        note = NoteCoef[0]?.notecoef! / NoteCoef[0]?.somcoef!

                        
                        if(note! < 8 ){
                            M = 'Faible'
                        }else if(note! <= 9.99 ){
                            M = 'Mediocre'
                        }else if( note! <= 11.99){
                            M = 'Passable'
                        }else if(note! <= 13.99){
                            M = 'Assez Bien'
                        }else if(note! <= 15.99){
                            M = 'Bien'
                        }else{
                            M = 'Tres Bien'
                        }


                        if (!FinalObjet[mat.matricule]) {
                            FinalObjet[mat.matricule] = [];
                            }
                        FinalObjet[mat.matricule]!.push({
                            eleve: NoteCoef[0]!,
                            Moyenne: note,
                            mention: M
                            
                        })
                        // console.log(FinalObjet)
                        // console.log(M)

                    }
                }
            }
                
                
            }

             console.log('moi la')
            return {FinalObjet, res}
        } catch (error) {
            console.log('problem declacul de moyenne...', error)
            
        }
        
    }

    async   ListeNoteMat(StudentNDATA: StudentNDTO){
        const FinalObjet: {
        [key: string]: {
        eleve: { 
            matricule: string;
            matiere: string | null;
            note: number;
            groupe: "Groupe 1" | "Groupe 2" | "Groupe 3";
            coef: number;
            NC: number;
            seq: number;
            salle: string;
            effectif: number
          
            }
  
        appreciation: string;
    }[];} = {};
        let NoteCoefMat
        let M: string
        const  modelstudent = new ModelStudent()
        const res = ModelND.safeParse(StudentNDATA)
        const seqs = await modelstudent.ReturnSeqs()

        const matricule = await modelstudent.ReturnMat()
        const idMatiere = await modelstudent.ReturnIdMat(StudentNDATA.salle)



        try {
                if(res.success){
                    for(const seq of seqs ){
                    for(const mats of idMatiere){
                        for( const mat of matricule){
                            if(mats.id === null){

                            }else{

                    NoteCoefMat = await modelstudent.ListeNoteMat(mat.matricule, mats.id,seq.seqs , StudentNDATA)
                    if(NoteCoefMat[0]?.seq === null){
                        // console.log('')
                    }else{
                        let note = NoteCoefMat[0]?.note
                        if(note! < 8 ){
                            M = 'Faible'
                        }else if(note! <= 9.99 ){
                            M = 'Mediocre'
                        }else if( note! <= 11.99){
                            M = 'Passable'
                        }else if(note! <= 13.99){
                            M = 'Assez Bien'
                        }else if(note! <= 15.99){
                            M = 'Bien'
                        }else{
                            M = 'Tres Bien'
                        }

                        if(!NoteCoefMat[0]){

                        }else{

                            if (!FinalObjet[mat.matricule]) {
                                FinalObjet[mat.matricule] = []
                            }

                            FinalObjet[mat.matricule]!.push({
                                eleve: NoteCoefMat[0]!,
                                appreciation: M
                            })
                            //                             // console.log(NoteCoefMat)
                            // FinalObjet[mat.matricule].push = ({
                            // eleve: NoteCoefMat[0]!,                      
                            // appreciation: M
                            
                        // })

                        }
                            
                        
                        //  console.log(FinalObjet)
                        // console.log(M)

                    }
                }
            }
                }
            }
            }

            return {FinalObjet, res}
        } catch (error) {
            console.log('problem liste  de notes...', error)
            
        }
        
    }



        async ListeElClass(studentData: StudentNDTO){
        const modelStudent = new ModelStudent

        const result = ModelND.safeParse(studentData)

        if(result.success){
           const FinalObjet= await modelStudent.InfoEtu(studentData)
            console.log('ok')
            return {FinalObjet, result}
        }
        return console.log('Entrer non valide serivce Liste des  Eleves')
    }
}




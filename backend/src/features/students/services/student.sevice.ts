import z, { number, object, safeParse, string } from 'zod';
import { ModelStudent } from '../models/students.model.js';
import type { StudentDIO, StudentNDTO, StudentSDTO } from '../type.js';
const model = z.object({
  matricule: z.string(),
  nom: z.string(),
  prenom: z.string(),
  date_naiss: z.coerce.date(),
  lieu: z.string(),
  sexe: z.string(),
});

const ModelND = z.object({
  annee: z.coerce.number(),
  salle: z.string(),
});

const ModelN = z.object({
  annee: z.string(),
  salle: z.string(),
});

export class ServiceStudent {
  async create(studentData: StudentDIO) {
    const modelStudent = new ModelStudent();

    const result = model.safeParse(studentData);

    if (result.success) {
      modelStudent.create(studentData);
      console.log('Creation reussite');
      return result;
    }
    return console.log('Entrer non valide serivce create student');
  }

  async sommeCoef(StudentNDATA: StudentSDTO) {
    const modelstudent = new ModelStudent();
    const res = ModelN.safeParse(StudentNDATA);
    const seqs = await modelstudent.ReturnSeqs();
    const matricule = await modelstudent.ReturnMat();


    try {
      let objet;

      if (res.success) {
        for (const seq of seqs) {
          

           objet = await modelstudent.SomCoefNote(seq.seqs, StudentNDATA);
        }
    
        return { objet, res };
      }
    } catch (error) {
      console.log('problem declacul de somme coef...', error);
    }
  }


  //test sur lui
  async  MoyApreciation(params: StudentSDTO) {
    try {
        
        let M
        const Moyenne: {
            [key: string]:{
                moyenne: number;
                appreciation: string;

            }[];
        } = {}
        const res = await this.sommeCoef(params)
        if(!res?.objet || !res.objet[0]){
            console.log('existe pas ')
            return 0
        }
        for(const r of res?.objet){
            
             const NoteMoyenne =  r.sum! / r.coef!
            
             if (NoteMoyenne! < 8) {
                    M = 'Faible';
                  } else if (NoteMoyenne! <= 9.99) {
                    M = 'Mediocre';
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
                    appreciation: M
                  })
                  console.log(Moyenne)
        }

       
       console.log(Moyenne)
       return {Moyenne}
    } catch (error) {}
  }

  async ListeNoteMat(StudentNDATA: StudentNDTO) {
    const FinalObjet: {
      [key: string]: {
        eleve: {
          matricule: string;
          matiere: string | null;
          note: number;
          groupe: 'Groupe 1' | 'Groupe 2' | 'Groupe 3';
          coef: number;
          NC: number;
          seq: number;
          salle: string;
          effectif: number;
        };

        appreciation: string;
      }[];
    } = {};
    let NoteCoefMat;
    let M: string;
    const modelstudent = new ModelStudent();
    const res = ModelND.safeParse(StudentNDATA);
    const seqs = await modelstudent.ReturnSeqs();

    const matricule = await modelstudent.ReturnMat();
    const idMatiere = await modelstudent.ReturnIdMat(StudentNDATA.salle);

    try {
      if (res.success) {
        for (const seq of seqs) {
          for (const mats of idMatiere) {
            for (const mat of matricule) {
              if (mats.id === null) {
              } else {
                NoteCoefMat = await modelstudent.ListeNoteMat(
                  mat.matricule,
                  mats.id,
                  seq.seqs,
                  StudentNDATA,
                );
                if (NoteCoefMat[0]?.seq === null) {
                  // console.log('')
                } else {
                  let note = NoteCoefMat[0]?.note;
                  if (note! < 8) {
                    M = 'Faible';
                  } else if (note! <= 9.99) {
                    M = 'Mediocre';
                  } else if (note! <= 11.99) {
                    M = 'Passable';
                  } else if (note! <= 13.99) {
                    M = 'Assez Bien';
                  } else if (note! <= 15.99) {
                    M = 'Bien';
                  } else {
                    M = 'Tres Bien';
                  }

                  if (!NoteCoefMat[0]) {
                  } else {
                    if (!FinalObjet[mat.matricule]) {
                      FinalObjet[mat.matricule] = [];
                    }

                    FinalObjet[mat.matricule]!.push({
                      eleve: NoteCoefMat[0]!,
                      appreciation: M,
                    });
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

      return { FinalObjet, res };
    } catch (error) {
      console.log('problem liste  de notes...', error);
    }
  }

  async ListeElClass(studentData: StudentNDTO) {
    const modelStudent = new ModelStudent();

    const result = ModelND.safeParse(studentData);

    if (result.success) {
      const FinalObjet = await modelStudent.InfoEtu(studentData);
      console.log('ok');
      return { FinalObjet, result };
    }
    return console.log('Entrer non valide serivce Liste des  Eleves');
  }
}

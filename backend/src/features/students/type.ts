export interface StudentDIO{
    matricule: string,
    nom: string,
    prenom?:string,
    date_naiss: Date,
    lieu:string,
    sexe: "M" | "F"

}
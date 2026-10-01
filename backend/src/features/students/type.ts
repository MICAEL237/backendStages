export interface StudentDIO{
    matricule: string,
    nom: string,
    prenom?:string,
    date_naiss: Date,
    lieu:string,
    sexe: "M" | "F"

}


export interface StudentNDTO{
    annee: number, 
    salle: string
}

export interface StudentSDTO{
    annee: string, 
    salle: string
}
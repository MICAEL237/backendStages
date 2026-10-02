import z from "zod"


export const schema = z.object({
     valeur: z.number().min(0).max(20),
    sequence: z.number().min(1).max(6),
    annee: z.string().min(4).max(10),
    coef: z.number().min(1),
    id_mat: z.number().min(1),
    id_ele: z.number().min(1)
}) 

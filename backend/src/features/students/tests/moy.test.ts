import { describe, test, expect } from 'vitest'; 

import { ModelStudent } from "../models/students.model.js";
import { ServiceStudent } from "../services/student.sevice.js";


const modelStudent = new ModelStudent()

 const teste =  test('test pour moyennne et appreciation', async () =>{
    const modelStudent = new ServiceStudent()
    const data = {
        
     annee:'2026',
     salle: '6M1'
    }

     const attente = { Moyenne : {
  '23LT001': [
    {
      moyenne: 13.014285714285714,
      appreciation: 'Assez Bien',
      validation: 'Admis'
    },
    {
      moyenne: 14.333333333333334,
      appreciation: 'Bien',
      validation: 'Admis'
    }
  ],
  '20SW100': [ { moyenne: 15, appreciation: 'Bien', validation: 'Admis' } ]
}}

    const resultat = await  modelStudent.MoyApreciation(data)

    expect(resultat).toEqual(attente)

    
})


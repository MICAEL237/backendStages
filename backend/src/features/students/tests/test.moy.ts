import { describe, test, expect } from 'vitest'; 

import { ModelStudent } from "../models/students.model.js";
import { ServiceStudent } from "../services/student.sevice.js";


const modelStudent = new ModelStudent()

test('test pour moyennne et appreciation', () =>{
    const modelStudent = new ServiceStudent()
    const data = {
        
     annee:'2025/2026',
     salle: '6M1'
    }

    // const attente =   

    const resultat =  modelStudent.MoyApreciation(data)

    
})
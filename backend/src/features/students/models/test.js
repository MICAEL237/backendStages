


const hello = () =>{
    console.log('hello')
}
const matriculte = ['V', 'B', 'N', 'R', 'T', 'W']
const seqs = [1, 2, 3]

for(const seq of seqs ){
    console.log(seq)
    for(const mat of matriculte){
        hello()
        console.log(mat, seq)
    }
    
    
}

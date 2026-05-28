const list = [
    {name : 'A',id: 1 },
    {name : 'B',id: 3 },
    {name : 'C',id: 5 },
    {name : 'D',id: 2 },
    {name : 'E',id: 7 },
    {name : 'F',id: 5 },
    {name : 'G',id: 4 },
    {name : 'H',id: 1 },
]

const listSorted = list.sort((a,b)=>{
    if(a.id>b.id) return 1
    if(a.id<b.id) return -1
    return 0

})

console.log(listSorted);
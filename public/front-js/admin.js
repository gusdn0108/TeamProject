const tbody = document.querySelectorAll('tbody>tr')
console.log(tbody)

tbody.forEach(v=>v.addEventListener('mouseover',()=>{
    v.classList.add('highlight')
}))

tbody.forEach(v=>v.addEventListener('mouseleave',()=>{
    v.classList.remove('highlight')
}))
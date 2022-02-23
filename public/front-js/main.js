document.addEventListener("DOMContentLoaded", ()=>{

const userElement = document.querySelector('#user')
const snb = document.querySelector('.snb')

// 메뉴 - MEMBERS 팝업
userElement.addEventListener('mouseover',()=>{
    snb.classList.add('on')
})

userElement.addEventListener('mouseleave',()=>{
    snb.classList.remove('on')
})

// 메인 - 로드하자마자 손 튀어나옴

window.onload = function(){
    let handsPic = document.querySelector('.rightbg')
    handsPic.classList.add('goRight')
}


})

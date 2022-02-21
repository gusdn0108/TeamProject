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

// 슬라이드 구현
const preBtn = document.querySelector('button#prebtn')
const nextBtn = document.querySelector('#nextbtn')
const slider = document.querySelector('.leftSlider')

function slideshow(){
    slider.style.transform = `translateX(${(click-1)*30}%)`
}

let click = 0;
nextBtn.addEventListener('click',()=>{
    click++;
    if(click=2){
        click=0
    }
    slider.style.transform = `translateX(${(click-1)*30}%)`
})

// let click = 1;
// nextBtn.onclick = function(){
//     click--;
//     if(click <)







})

// 회원가입창

function appendYear(){
    let date = new Date();
    let year = date.getFullYear();
    let selectValue = document.getElementById('year');
    let optionidx = 0;

    for(let i=year-100; i<=year; i++){
        selectValue.add(new Option(i+"년",i),optionidx++)
    } 
}

function appendMonth(){
    let selectValue = document.getElementById('month');
    let optionidx = 0;

    for(let i=1; i<=12; i++){
        if(i<10){
            i='0'+i
            selectValue.add(new Option(i+"월",i),optionidx++)
        }else{
            selectValue.add(new Option(i+"월",i),optionidx++)}
    }
}

function appendDay(){
    let selectValue = document.getElementById('day');
    let optionidx = 0;
    
    for(let i=1; i<=31; i++){
        if(i<10){
            i='0'+i
            selectValue.add(new Option(i+"일",i),optionidx++)
        }else{
            selectValue.add(new Option(i+"일",i),optionidx++)
        }
    }
}

appendYear()
appendMonth()
appendDay()
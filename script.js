const selectMenu = document.querySelectorAll('select');
let currentTime = document.querySelector('h1'),
content = document.querySelector('.content'),
setAlarmBtn = document.querySelector('button'),
isAlarmSet = false,
alarmTime,
ring = new Audio('Requiem For A Dream - Kate Chruscicka - Electric Violinist  - Clint Mansell.mp3');


for(let i = 12; i > 0; i--){
    i = i < 10 ? '0' + i : i;
    let option = `<option value='${i}'>${i}</option`;
    selectMenu[0].firstElementChild.insertAdjacentHTML('afterend', option)
}

for(let i = 59; i > 0; i--){
    i = i < 10 ? '0' + i : i;
    let option = `<option value='${i}'>${i}</option`;
    selectMenu[1].firstElementChild.insertAdjacentHTML('afterend', option)
}

for(let i = 2; i > 0; i--){
    let ampm = i == 1 ? 'AM' : 'PM';
    let option = `<option value='${ampm}'>${ampm}</option`;
    selectMenu[2].firstElementChild.insertAdjacentHTML('afterend', option)
}



setInterval(()=> {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = 'AM';

    if(h > 12){
        ampm = 'PM';
    }
    h = h == 0 ? 12 : h;
    h = h > 12 ? h - 12 : h;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`

    if(alarmTime == `${h}:${m} ${ampm}`){
        ring.play();
        ring.loop = true;
        

    }
}, 1000);

function renderAlarm (){
    if(isAlarmSet){
        alarmTime = '';
        ring.pause();
        content.classList.remove('disabled');
        setAlarmBtn.innerText = 'Set Alarm';
        return isAlarmSet = false;
    }

    let alarm = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`
    // console.log(alarm)

    if(alarm.includes('Hour') || alarm.includes('Minutes') || alarm.includes('AM/PM')){
        return alert('Please, choose a valid time to set an Alarm!!')
    }
    isAlarmSet = true;
    alarmTime = alarm;
    content.classList.add('disabled');
    setAlarmBtn.innerText = 'Clear Alarm'
}

setAlarmBtn.addEventListener('click', renderAlarm)
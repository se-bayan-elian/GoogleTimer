// declare variables 'elements'

const hrsInput = document.getElementById('hrs-input')
const minsInput = document.getElementById('mins-input')
const secsInput = document.getElementById('secs-input')

const inputs = document.querySelectorAll('input')

const startBtn = document.querySelector('.start-btn')
const resetBtn = document.querySelector('.reset-btn')

const FinishAudio = document.getElementById('timerFinishAudio')

//
// states of main btn 
let btnSates = {
  start : 'START',
  ok : 'OK',
  stop: 'STOP',
}


let intervalId ;

startBtn.addEventListener('click', () => {
  let hrs = hrsInput.value;
  let mins = minsInput.value;
  let secs = secsInput.value;
  // get Date from inputs
  let time = (hrs) * 3600 * 1000 + (mins) * 60 * 1000 + secs * 1000;
  let goalDate = new Date(new Date().getTime() + time)
  if(btnSates['stop'] == startBtn.textContent){
    clearInterval(intervalId);
    startBtn.textContent = btnSates['start']
  }
  else if (btnSates['ok'] == startBtn.textContent){
    FinishAudio.pause()
    startBtn.textContent = btnSates['start']

  }
  else if (btnSates['start'] == startBtn.textContent){
    console.log('start');
    if(time > 0){
    operate(goalDate)
    startBtn.textContent = btnSates['stop']
    }
  }
  
  
})
resetBtn.addEventListener('click', ()=>{
  EnabledInputs();
  clearInterval(intervalId)
  hrsInput.value = '00';
  minsInput.value = '00';
  secsInput.value = '00';
  startBtn.textContent = btnSates['start']

})


function operate (goalDate){
  disabledInputs()
   intervalId = setInterval(() => {
    calculateLiftingTime(goalDate)
  }, 1000)
}

function calculateLiftingTime(date) {
  let curr = new Date();
  let tSeconds = Math.floor((date.getTime() - curr.getTime()) / 1000);
  let seconds = tSeconds % 60;
  let tMins = (tSeconds - seconds) / 60
  let minutes = tMins % 60;
  let tHrs = (tMins - minutes) / 60;
  let hours = tHrs % 24;
  console.log(hours, minutes, seconds);
  // deliver a date and time to boxes 
  hrsInput.value = (hours <= 9 ? '0':'')+hours;
  minsInput.value = (minutes <= 9 ? '0':'')+minutes;
  secsInput.value = (seconds <= 9 ? '0':'')+seconds;
  if (seconds == 0 && minutes == 0 && hours == 0) {
    EnabledInputs()
    clearInterval(intervalId)
    startBtn.textContent = btnSates['ok']
    FinishAudio.currentTime = 0
    FinishAudio.play()
  }
}
function disabledInputs (){
 inputs.forEach((input)=>{
  input.disabled = true
 })
}
function EnabledInputs (){
 inputs.forEach((input)=>{
  input.disabled = false
 })
}
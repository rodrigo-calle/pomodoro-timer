import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [startTimer, setStartTimer] = useState(-1);
  const [settingState, setSettingState] = useState("disactive");
  const [alerting, setAlerting] = useState('Your Time is Over!!!')

  const stopCounter = () =>{   
    setSeconds(0)
    setMinutes(0)  
    clearInterval(startTimer)
    setSettingState("disactive")
    setStartTimer(-1) 
    document.querySelector('.ring').style.stroke = "#09A65A"
  }


  if(minutes === -1 && seconds === 59){
    document.querySelector('.ring').style.stroke = "#900A0A"
    alert(alerting)
  }

  const startCounter = () =>{
    setSettingState("disactive")
    setStartTimer(setInterval(change, 1000))
  }
  const change = () => {
    setSeconds((sec) => sec - 1);
  };

  if (seconds < 0) {
    setMinutes((min) => min - 1);
    setSeconds(59);    
  };
  
  if(settingState === "disactive"){
    const inputs = document.querySelectorAll(".input")
    inputs.forEach((e) => {
      e.setAttribute("disabled", true)
    })
  }


  useEffect(()=>()=>{
    clearTimeout(startTimer);
  },[])

  const settings = () => {
    setSettingState("active")
    const inputs = document.querySelectorAll(".input")
    inputs.forEach((e) => {
      e.removeAttribute("disabled")
      e.setAttribute("placeholder", "00")
    })
    setMinutes('')
    setSeconds('')
  }

  const minuteValue = () => {
    if(minutes.toString().length-1 < 1 && minutes !== '' && settingState === "disactive"){
      return `0${minutes}`;
    }
    else if(minutes === ''){
      return minutes;
    }
    else{
      return minutes;
    }
  }
  const secondValue = () => {
    if(seconds.toString().length-1 < 1 && seconds !== '' && settingState === "disactive"){
      return `0${seconds}`;
    }
    else if(seconds === ''){
      return seconds;
    }
    else{
      return seconds;
    }
  }

  return (
    <div className="wrapper">
    <div className="ring">
      <svg width="518" height="518" viewBox="0 0 518 518">
        <circle  strokeWidth="9px" x="0" y="y" cx="259" cy="259" r="254" />
      </svg>
    </div>

    <div className="timer">
      <div className="time">
        <div className="minutes">
          <input 
          type="text"
          maxLength="2"
          disabled 
          className="input"
          onChange={(e)=> setMinutes(e.target.value)}           
          value={minuteValue()} 
           />
        </div>
        <div className="colon">:</div>
        <div className="seconds">      
          <input 
          type="text"
          onChange={(e)=> setSeconds(e.target.value)}      
          value={secondValue()}
          disabled
          className="input"
          maxLength="2"
          />  
          
        </div>
      </div>
      {

        (startTimer === -1)?
        <button 
        className="start"
        type="button"
        onClick={()=> startCounter()}
        >start</button>
        :
        <button 
        className="start"
        type="button"
        onClick={()=> stopCounter()}
        >stop</button>

      }

      <button 
      className="settings"
      type="button"
      onClick={()=> settings() }
      >
        <img src="/images/gear.svg" alt="Settings" />
      </button>
    </div>
  </div>

  );
}

export default App;

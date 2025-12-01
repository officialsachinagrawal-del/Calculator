

import {  useState, useEffect } from 'react'
import './App.css'
import { CalciContextProvider } from './CalciContext';
import NavBar from './NavBar';

function App() {
                  //* Calculator functioning *//
  const[value1,setvalue] = useState([]);
  const [firstValue , setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);

  const handleClick =(e)=>{
    // setvalue(e.target.innerText);
    let ans= e.target.innerText;
    setvalue((prev) =>[...prev, ans]);


  }
  const clear =()=>{
    setvalue([]);
    setFirstValue(null);
    setOperator(null);

  }
  const Preview =()=>{
    const v1 = value1.join("");
    const str = v1.toString();
   
    const str1 = str.slice(0,-1); //?deleting last character everytime we click
    setvalue(str1.split("")); // ye mera again string ko array object me convert kr dega 
    


  }
  const dot =()=>{
    
    const v1 = value1.join(""); //* ye array me die hue number ko ek saath laaege ([3,4,5,6] =>3456)
    const v2 = v1.toString();
    if(v2.length>0){
      setvalue([...value1, '.']);

       
    }

  }

  const division =() =>{
    // jo phle se value h  / jo ab render ho rhi h 
    const v1= Number(value1.join("")); //* this convert an array into a normal number ([35] => 35)
    // console.log(v1);

    if(firstValue === null){
      setFirstValue(v1);
      setOperator('/');
      setvalue([]);
    }
  }
  const add =()=>{
    const v1 = Number(value1.join(""));

    if(firstValue === null){
      setFirstValue(v1);
      setOperator('+');
      setvalue([]);
    }
  }
  const multipy =()=>{
    let  v1 = Number(value1.join(""));
    
    if(firstValue === null){
      setFirstValue(v1);
      setOperator('*');
      setvalue([]);
    }

  }
  const substract =()=>{
    let v1 = Number(value1.join(""));
    if(firstValue === null){
      setFirstValue(v1);
      setOperator('-');
      setvalue([]);
    }
  }
  const percentage =()=>{
    let v1 = Number(value1.join(""));
    if(firstValue=== null){
      setFirstValue(v1);
      setOperator('%');
      setvalue([]);
    }
  }
  // "=" button logic
  const calculate = () => {
    if(firstValue !== null ){
      const second = Number(value1.join(""));
      if(second === 0){
        setvalue(["Error"]);
        return;
      }
      if(operator ==='/'){
        let ans = firstValue / second;
        setvalue([ans.toString()]);
      }
      else if(operator ==='+'){
        let ans = firstValue + second;
        setvalue([ans.toString()]);

      }
      else if(operator === '*'){
        let ans = firstValue * second;
        setvalue([ans.toString()]);
      }
      else if(operator === '-'){
        let ans = firstValue - second;
        setvalue(([ans.toString()]));
      }
      else if(operator === '%'){
        let ans = firstValue * (second/100);
        setvalue(([ans.toString()]));
      }
      else{
        setvalue(["Error"])
      }

      setFirstValue(null);
      setOperator(null);
    }
    
  }
//! adding logic to take input form the keyboard
useEffect(() => {   const handleKeyDown = (e) => {
    switch (e.key) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        setvalue((prev) => [...prev, e.key]);
        break;
      case '+':
        add();
        break;
      case '-':
        substract();
        break;
      case '*':
        multipy();
        break;
      case '/':
        division();
        break;
      case '%':
        percentage();
        break;
      case '.':
        dot();
        break;
      case 'Enter':
      case '=':
        calculate();
        break;
      case 'Backspace':
        Preview();
        break;
      case 'c':
      case 'C':
        clear();
        break;
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {

    window.removeEventListener('keydown', handleKeyDown); // i use this becx taaki multiple event listener calll naa ho aur accurate value mil sake 
  };
}, [value1]); // Rerun effect if value1 changes to use the latest state in handlers
 


                                    //! toggle button ki functioninh

  const [themeMode, setthemeMode] = useState('light');
  const lightTheme = ()=>{
    setthemeMode('light');

  }
  const darkTheme =()=>{
    setthemeMode('dark');
    
  }
  //actual change in theme

  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark');
    document.querySelector('html').classList.add(themeMode);
    
  }, [themeMode]);
  
     




  return (
    <CalciContextProvider value = {{themeMode,darkTheme,lightTheme}}>
       <div >

        <NavBar />
      </div>
      <div className="calculator">
        
         {/*toggle Button*/}
     
     
        <div className='input_box'><input  type="text" placeholder='0' value={value1.join("") || 0} readOnly /></div> {/*i use .join("") => to remove commaas */}
        <div className="btn-class">

        <button type = "button" className="clear" id = "clear" onClick={clear}>C</button> {/*clear*/}
        <button type = "button" className="operator" onClick={Preview}>&larr;</button> {/*clear previous value*/}
        <button type = "button" className="operator" onClick ={percentage}>%</button> 
        <button type = "button" className="operator" id = "division" onClick = {division} >/</button> {/*division*/}

        <button type = "button" onClick={handleClick}>7</button>
        <button type = "button" onClick={handleClick}>8</button>
        <button type = "button" onClick={handleClick}>9</button>

        <button type = "button" className="operator"  onClick={multipy} >x</button> {/*multipy*/}

        <button type = "button" onClick={handleClick}>4</button>
        <button type = "button" onClick={handleClick}>5</button>
        <button type = "button" onClick={handleClick}>6</button>

        <button type = "button" className="operator" onClick={substract}>-</button> {/*substraction*/}


        <button type = "button" onClick={handleClick}>1</button>
        <button type = "button" onClick={handleClick}>2</button>
        <button type = "button" onClick={handleClick}>3</button>

        <button type = "button" className="operator" onClick={add}>+</button> {/*addition*/}

        <button type = "button" onClick={handleClick}>00</button> 
        <button type = "button" onClick={handleClick}>0</button>
        <button type = "button" onClick={dot}>.</button>
        <button type = "button" className="equal" onClick={calculate}>=</button>

        </div>
      </div>
    </CalciContextProvider>
  )
}

export default App

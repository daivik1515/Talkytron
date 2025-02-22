import React, { useContext } from 'react'
import './Main.css'
import avatar from "../../assets/softwareAvatar.png"
import loader from "../../assets/loader.gif"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle,faCableCar, faCar,faBaseball,faCrosshairs, faArrowCircleRight, faReply} from "@fortawesome/free-solid-svg-icons";
import { Context } from '../../context/Context';

const Main = () => {


    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input,setRecentPrompt}=useContext(Context)
    console.log(resultData);
    const loadPrompt=async (prompt)=>{
        setRecentPrompt(prompt);
        onSent(prompt);
    }

  return (
    <div className='Main'>
        <div className="navbar">
            <p className='title'>Talkytron</p>
            <img className='avatar' src={avatar} alt="" />
        </div>
        
        <div className="container">
        {!showResult ?  
        <>
        <div className="greet">
                <p><span>Hello There!</span></p>
                <p className='subintro'>How can I help you, today?</p>
            </div>
            <div className='cards'>
                <div onClick={()=>loadPrompt("What game should I play today?")} className='card'>
                    <p>What game should I play today?</p>
                    <FontAwesomeIcon className='menu1' icon={faCrosshairs} />
                </div>
                <div onClick={()=>loadPrompt("What movie should I watch today?")} className='card'>
                    <p>What movie should I watch today?</p>
                    <FontAwesomeIcon className='menu1' icon={faQuestionCircle} />
                </div>
                <div onClick={()=>loadPrompt("Give me the best camping spots?")} className='card'>
                    <p>Give me the best camping spots?</p>
                    <FontAwesomeIcon className='menu1' icon={faCableCar} />
                </div>
                <div onClick={()=>loadPrompt("Which is the best car out there?")} className='card'>
                    <p>Which is the best car out there?</p>
                    <FontAwesomeIcon className='menu1' icon={faCar} />
                </div>
            </div>
        </>
        :
        <div className="result">
            <div className="resultTitle">
                <img src={avatar} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className='resultData'>
                <FontAwesomeIcon className='menu1' icon={faReply} />
                {loading ? <div className='loader'>
                <img src={loader} alt="" />
                </div>   :    
                <p dangerouslySetInnerHTML={{__html:resultData}}></p>}
                
            </div>
        </div>
        }
            <div className="mainBottom">
                <div className="search">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" name="" id="" placeholder='Enter your prompt'/>
                    <FontAwesomeIcon onClick={()=>onSent()} className='menu1' icon={faArrowCircleRight} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main
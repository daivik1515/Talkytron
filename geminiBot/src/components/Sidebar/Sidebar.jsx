import React, { useContext, useState } from 'react'
import './Sidebar.css' 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faPlus,faMessage,faQuestion,faHistory, faGear,faPerson } from "@fortawesome/free-solid-svg-icons";
import { faGithub,faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Context } from '../../context/Context';
const Sidebar = () => {
    const[sidebar,setSidebar]=useState(false);
    const {onSent,previousPrompt,setRecentPrompt,newChat}=useContext(Context);

    const loadPrompt=async (prompt)=>{
        setRecentPrompt(prompt);
        onSent(prompt);
    }
    const handleSidebar=()=>{
        setSidebar((currentState)=>{
            return !currentState;
        })
    }
  return (
    <div className='sidebar'>
        <div className="top">
        <FontAwesomeIcon onClick={handleSidebar} className='menu hamburger' icon={faBars} />
        <div className='newChat' onClick={()=>newChat()}>
        <FontAwesomeIcon className='menu' icon={faPlus} />
        {sidebar && <p>New Chat</p>}
        </div>
        {sidebar &&
        <div className="recent">
            <p className='recentTitle'>Recent</p>
            {previousPrompt.map((i,index)=>{
                return (
                    <div onClick={()=>loadPrompt(i)} className="recentEntry">
                    <FontAwesomeIcon className='menu' icon={faMessage} />
                    <p>{i.slice(0,20)}...</p>
                    </div>
                )
            })}
            
        </div>
        }
        </div>
        <div className="bottom">
        <div className="bottomItem recentEntry">
        <a style={{display:'inline-flex', gap:"10px", cursor:"pointer"}} href="https://github.com/daivik1515" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon className='menu' icon={faGithub} style={{color:"black"}}/>
        {sidebar && <p>Github</p>}
        </a>
        </div>
        <div className="bottomItem recentEntry">
        <a style={{display:'inline-flex', gap:"10px" , cursor:"pointer"}} href="https://www.linkedin.com/in/daiviksaharan/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon className='menu' icon={faLinkedin} style={{color:"black"}}/>
        {sidebar && <p>LinkedIn</p>}
        </a>
        </div>
        <div className="bottomItem recentEntry">
        <a style={{display:'inline-flex', gap:"10px", cursor:"pointer"}} href="https://daivik-ten.vercel.app/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon className='menu' icon={faPerson} style={{color:"black"}}/>
        {sidebar && <p>Portfolio</p>}
        </a>
        </div>
        </div>
    </div>
  )
}

export default Sidebar
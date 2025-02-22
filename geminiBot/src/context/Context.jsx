import { createContext, useState } from "react";
import run from "../config/geminiAPI";

export const Context= createContext();
const ContextProvider=(props)=>{

    const[input,setInput]=useState("");
    const[recentPrompt,setRecentPrompt]=useState("");
    const[previousPrompt,setPreviousPrompt]=useState([]);
    const[showResult,setShowResult]=useState(false);
    const[loading,setLoading]=useState(false);
    const[resultData,setResultData]=useState("");

   const newChat=()=>{
    setLoading(false);
    setShowResult(false);
   }

    const onSent=async (prompt)=>{
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response="";
        if(prompt!==undefined)
        {
            response=await run(prompt);
            setRecentPrompt(prompt);
        }
        else
        {
            setPreviousPrompt(prev=>[...prev,input]);
            setRecentPrompt(input);
            response=await run(input);
        }
        
        let resposeArray = response.split("**");
        let newArray="";
        for(let i=0;i<resposeArray.length;i++)
        {
            if(i===0 || i%2!==1)
                newArray +=resposeArray[i];
            else
                newArray+="<b>"+resposeArray[i]+"</b>"
        }
        let newResponse=newArray.split("*").join("</br>");
        setResultData(newResponse);
        setLoading(false);
        setInput("");
        
    }
    // onSent("What is ReactJS?")
    const contextValue={
        previousPrompt,setPreviousPrompt,onSent,setRecentPrompt,recentPrompt,showResult,loading,resultData,input,setInput,newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;
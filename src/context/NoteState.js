import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
    const s1={
        "name":"kiran",
        "role":"developer"
    }
    const [state, setState] = useState(s1);
   
    const update=()=>{
        setTimeout( ()=>{
            setState({
                "name": "vaibhav",
                "role":"tester"
            })
        },2000);
    }

    return(
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
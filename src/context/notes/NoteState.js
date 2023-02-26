import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const s1 = {
        "name": "Durvesh",
        "class": "23d"
    }

    const [state, setstate] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setstate({
                "name" : "Larry",
                "class" : "22b" 
            })
            
        }, 1000);
    }


    return (
        <NoteContext.Provider value = {{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
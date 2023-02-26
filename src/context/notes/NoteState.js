import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "63f247a089bcac7ea1f864dc",
          "user": "63eb54572b7e8f2d937e2ba3",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2023-02-19T16:00:32.937Z",
          "__v": 0
        },
        {
          "_id": "63f247c089bcac7ea1f864de",
          "user": "63eb54572b7e8f2d937e2ba3",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2023-02-19T16:01:04.145Z",
          "__v": 0
        },
        {
          "_id": "63f247e0e3a29b585660ac23",
          "user": "63eb54572b7e8f2d937e2ba3",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2023-02-19T16:01:36.355Z",
          "__v": 0
        },
        {
          "_id": "63f247f70f5df5d58f8932a9",
          "user": "63eb54572b7e8f2d937e2ba3",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2023-02-19T16:01:59.900Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
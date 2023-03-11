import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

    const notesInitial = []

      const [notes, setNotes] = useState(notesInitial)
    // Get all Notes
    const getNotes = async () => {
      // API Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYjU0NTcyYjdlOGYyZDkzN2UyYmEzIn0sImlhdCI6MTY3NjgxODk0OX0.cjTtGviblbl33T7qxppKL9rkQlmn-SWa5IScuLXajXc"
        },
      });

      const allNotes = await response.json();
      // console.log(allNotes);
      setNotes(allNotes);
    }

      // Add a Note
      const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYjU0NTcyYjdlOGYyZDkzN2UyYmEzIn0sImlhdCI6MTY3NjgxODk0OX0.cjTtGviblbl33T7qxppKL9rkQlmn-SWa5IScuLXajXc"
          },
          body: JSON.stringify({title, description, tag})
        });

        console.log("Adding a new Note");
        const note = {
          "_id": "63f247f70f5df5d58f8932b9",
          "user": "63eb54572b7e8f2d937e2ba3",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-02-19T16:01:59.900Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }

      // Delete a Note
      const deleteNote = (id) => {
        const newNotes = notes.filter((note) => {return note._id!==id});
        setNotes(newNotes);
      }

      // Edit a Note
      const updateNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlYjU0NTcyYjdlOGYyZDkzN2UyYmEzIn0sImlhdCI6MTY3NjgxODk0OX0.cjTtGviblbl33T7qxppKL9rkQlmn-SWa5IScuLXajXc" 
          },
          body: JSON.stringify({title, description, tag})
        });
    
        const json = response.json();
        
        // Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id === id){
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
          
        }
      }

    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, updateNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
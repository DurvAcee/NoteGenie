import React, {useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';


const Notes = (props) => {
    const context = useContext(noteContext);
    const {notes, getNotes, editNote} = context;
    useEffect(() => {
      getNotes()
      // eslint-disable-next-line
    }, [])
    
    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    
    const updateNote = (currentnote) => {
      ref.current.click();
      setNote({id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag});
    }

    const handleClick = () => {
        // console.log('updating note', note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success")

    }


    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <>
      <AddNote showAlert = {props.showAlert}/>

      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref = {ref} data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                  <form className="my-3">
                    <div className="mb-3">
                      <label htmlFor="title">Title</label>
                      <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} 
                      onChange={onChange} minLength={5} required/>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description">Description</label>
                      <input type="text" className="form-control" id="edescription" name="edescription" 
                      value={note.edescription} onChange={onChange} minLength={5} required/>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="tag">Tag</label>
                      <input type="text" className="form-control" id="etag" name="etag"  
                      value={note.etag} onChange={onChange}/>
                    </div>
                    
                </form>
            </div>
            <div className="modal-footer">
              <button ref = {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled = {note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
          <h2> Your Notes</h2>
          <div className="container mx-2"> 
              {notes.length === 0 && 'No Notes to Display'}
          </div>'
          {notes.map((note) => {
              return <NoteItem key = {note._id} updateNote={updateNote} note={note} showAlert = {props.showAlert}/>
          })}
      </div>
    </>
  )
}

export default Notes
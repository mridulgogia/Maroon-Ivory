import React from 'react';
import EditorComponent from './editor/editor';
import SideBarComponent from './sidebar/sidebar';
import './App.css';
import NoNote from './noNote/NoNote';

const firebase = require('firebase');

export default class App extends React.Component{
  constructor(){
    super();

    this.state = {
      selectedNoteIndex : null,
      selectedNote: null,
      notes: null 
    };

    this.selectNote = this.selectNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.newNote = this.newNote.bind(this);
    this.noteUpdate = this.noteUpdate.bind(this);
  }

  async selectNote(note, index) {
    await this.setState({ 
      selectedNoteIndex: index,
      selectedNote: note
   });
  }

  async deleteNote(note) { 
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
    if(this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  }
  


  async newNote( title) { 
    const note = {
      title: title,
      body: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
  }

  noteUpdate(id, noteObj) {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update( {
        title: noteObj.title,
        body: noteObj.body
      })
  }

  componentDidMount = () => {
    firebase
      .firestore()
        .collection('notes')
          .onSnapshot( serverUpdate => {
            const notes = serverUpdate.docs.map( _doc => {
              const data = _doc.data();
              data['id'] = _doc.id;
              return data;
            });
            this.setState({
              notes: notes
            })
          })

  }

  render(){
    return (
      <div className="app-container">
        <SideBarComponent 
            notes={this.state.notes}
            selectedNoteIndex={this.state.selectedNoteIndex}
            selectNote = {this.selectNote}
            deleteNote = {this.deleteNote}
            newNote = {this.newNote}
            
        />

        {
          this.state.selectedNote ? 
            <EditorComponent
            selectedNote = { this.state.selectedNote}
            selectedNoteIndex = { this.state.selectedNoteIndex}
            notes = {this.state.notes}
            noteUpdate = { this.noteUpdate}
          /> 
          : <NoNote />
        }
      </div>
    )
  }
}
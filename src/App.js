import React from 'react';
import EditorComponent from './editor/editor';
import SideBarComponent from './sidebar/sidebar';
import './App.css';

const firebase = require('firebase');

export default class App extends React.Component{
  constructor(){
    super();

    this.state = {
      selelectedNoteIndex : null,
      selectedNote: null,
      notes: null 
    };
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
        selelectedNoteIndex = {this.state.selelectedNoteIndex}
        />
        <EditorComponent />
      </div>
    )
  }
}
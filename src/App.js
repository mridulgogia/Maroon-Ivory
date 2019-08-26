import React from 'react';
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
      <div>
        hello world
      </div>
    )
  }
}
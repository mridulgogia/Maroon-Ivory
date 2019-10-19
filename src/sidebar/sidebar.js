import React, { Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button} from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem';

class sidebarComponent extends Component{
    constructor(){
        super();
        this.state = {
            addingNote: false,
            title: null
        };
        this.newNoteBtnClickHandle = this.newNoteBtnClickHandle.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.newNote = this.newNote.bind(this);
        this.selectNote = this.selectNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    newNoteBtnClickHandle() {
        this.setState( (prevState) => {
            return ({
                title: null,
                addingNote: !prevState.addingNote
            });
        });
    }


    updateTitle(txt) { this.setState( { title: txt }) }

    newNote(){
        this.props.newNote(this.state.title);
        this.setState( {
            title: '',
            addingNote: false
        })
    }

    selectNote(n, i) { this.props.selectNote(n, i) }
    deleteNote(note) {
         this.props.deleteNote(note);
    }    

    render(){
        const { notes, classes, selectedNoteIndex} = this.props;        
        if(notes){
            return (
                <div className={classes.sidebarContainer}>
                  <Button 
                      className={classes.newNoteBtn}
                      onClick = {this.newNoteBtnClickHandle}
                  >
                      {this.state.addingNote ? "Cancel" : "New Note"}
                  </Button>
      
                  {this.state.addingNote ? 
                      <>
                          <input 
                              className = {classes.newNoteInput}
                              placeholder = "New note title"
                              onKeyUp = { (event) => {this.updateTitle(event.target.value)} }
                          />
                          <Button 
                              className = {classes.newNoteSubmitBtn}
                              onClick = {this.newNote}
                          > Submit Note
                          </Button>
                      </>
                      : null   
                  }
      
                  <List>
                    {
                        notes.map( (_note, _index) => {
                            return (
                                <div key = {_index}>
                                    <SidebarItemComponent
                                    _note = {_note}
                                    _index = {_index}
                                    selectedNoteIndex = {selectedNoteIndex}
                                    selectNote = {this.selectNote}
                                    deleteNote = {this.deleteNote}
                                     />
                                    <Divider />
                                </div>
                            )
                        })
                    }
                  </List>
      
                </div>
            )
        }else{
            return( 
                <div> Add a Note</div>
            )
        }
    }
}

export default withStyles(styles)(sidebarComponent);
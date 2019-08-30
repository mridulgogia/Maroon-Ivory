import React, { Component} from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helper';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends Component{
    constructor(){
        super();

        this.state = {
            text: '',
            title: '',
            id: ''
        }
    }

    componentDidMount() {
        this.setState( {
            text: this.props.selectedNote.body,
            title: this.props.selectedNote.title,
            id: this.props.selectedNote.id
        });
    }

    componentDidUpdate() {
        if( this.state.id !== this.props.selectedNote.id) {
            this.setState( {
                text: this.props.selectedNote.body,
                title: this.props.selectedNote.title,
                id: this.props.selectedNote.id
            })
         }
    }
    updateTitle = async (txt) => {
        await this.setState({ title: txt });
        this.update();
    }
    updateBody = async (val) => {
        await this.setState({
        text: val
    });
    this.update()
    }


    update = debounce( () => {
        this.props.noteUpdate( this.state.id, {
            title: this.state.title,
            body: this.state.text
        })
    }, 1500);

    render() {
        const { classes } = this.props;
        return (
        <div 
            className="classes.editorContainer"
            style = {{height: '100%'}}
            >
            <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
            <input
                className={classes.titleInput}
                placeholder='Note title...'
                value={this.state.title ? this.state.title : ''}
                onChange={(e) => this.updateTitle(e.target.value)}>
            </input>
            <ReactQuill
            value = {this.state.text}
            onChange = {this.updateBody} 
            style = {{height: '100%'}} 
            />
        </div>
        );
    }   
}

export default withStyles(styles)(EditorComponent);
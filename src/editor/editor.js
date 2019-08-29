import React, { component, Component} from 'react';
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

    updateBody = async (val) => {
        await this.setState({
        text: val
    });
    this.update()
}

update = debounce( () => {console.log('updating...')}, 1500)

    render(){
        const { classes } = this.props;

       

        return (
            <div 
                className="classes.editorContainer"
                style = {{height: '100%'}}
                  >
                <ReactQuill
                value = {this.state.text}
                onChange = {this.updateBody} 
                style = {{height: '100%'}} />
            </div>
            )
    }
}

export default withStyles(styles)(EditorComponent);
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Deleteicon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helper';

class SidebarItemComponent extends React.Component{
    render(){
        return (
            <h1>
                hello from sidebar item...
            </h1>
        );
    }
}

export default withStyles(styles)(SidebarItemComponent);
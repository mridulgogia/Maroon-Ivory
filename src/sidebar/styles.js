const styles = theme => ({
    root: {
        backgroundColor: theme.paletter.background.paper,
        height: 'calc(100% - 35px)',
        postion: 'absolute',
        left: '0',
        width: '300px',
        boxShadow: '0px 0px 2px black'
    },
    newChatBtn: {
        borderRadius: '0px'
    },
    unreadMessage: {
        color: 'red',
        postion: 'absolute',
        top: '0',
        right: '5px'
    },
    newNoteBtn: {
        width: '100%',
        height: '35px',
        borderBottom: '1px solid black',
        borderRadius: '0px',
        backgroundColor: '#29487d',
        color: 'white',
        '&:hover': {
            backgroundColor: '#88a2ce'
        }
    },
    sidebarContainer: {
        marginTop: '0px',
        width: '300px',
        height: '100%',
        boxsizing: 'border-box',
        float: 'left',
        overflowY: 'scroll',
        overflowX: 'hidden'
    },
    newNoteinput: {
        width: '100%',
        margin: '0px',
        height: '35px',
        outline: 'none',
        border: 'none',
        paddingLeft: '5px',
        '&:focus': {
            outline: '2px solid rgba(81, 203, 238, 1)'
        }
    },
    newNoteSubmitBtn: {
        width: '100%',
        backgroundColor: '#28787c',
        backgroundColor: '#28787c',
        borderRadius: '0px',
        color: 'white'
    }
});

export default styles;
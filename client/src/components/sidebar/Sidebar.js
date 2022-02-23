import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';

export default function Sidebar({ state, setState }) {

    const forceDrawer = (isOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, isOpen: isOpen });
    };

    const structure = [
        { id: 0, label: "Create Paste", link: "/app/create", icon: <EditIcon /> },
        { id: 1, label: "Collection", link: "/app/list", icon: <ContentPasteIcon /> },
    ]

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={forceDrawer(false)}
            onKeyDown={forceDrawer(false)}
        >
            <List>
                {structure.map(item =>
                    <ListItem button key={item.id} component={item.link && Link} to={item.link}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItem>
                )}
            </List>
        </Box>
    );

    return (
        <Drawer
        anchor='left'
        open={state.isOpen}
        onClose={forceDrawer(false)}>
        <Toolbar />
        {list()}
    </Drawer>
    );
}

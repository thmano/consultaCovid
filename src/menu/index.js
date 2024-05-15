import './style.css';
import { Link } from "react-router-dom";
import FlagIcon from '@mui/icons-material/Flag';
import logo from '../assets/prosesmt_logo.jpg'
import PublicIcon from '@mui/icons-material/Public';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

function Menu() {
  return (
    <div className="menu">
        <img src={logo} className='logo' alt='logo' />
      <nav aria-label="main mailbox folders">
        <List>
        <Link to="/brasil">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FlagIcon />
              </ListItemIcon>
              <ListItemText primary="Brasil" />
            </ListItemButton>
          </ListItem>
          </Link>
          <Link to="/countries">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary="Outros Paises" />
            </ListItemButton>
          </ListItem>
          </Link>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
        <Link to="/sendData">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Enviar dados" />
            </ListItemButton>
          </ListItem>
          </Link>
        </List>
      </nav>
    </div>
  );
}

export default Menu;

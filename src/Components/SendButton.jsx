import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Paper, InputBase  } from '@mui/material';


export default function SendButton() {
  return (
    <Paper
        elevation={0} 
        variant="outlined" square
        component="form"
      sx={{borderColor: 'green', border: "1", backgroundColor: "transparent", borderRadius: "0",  display: 'flex', alignItems: 'center', width: "100%" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, variant:"outlined", }}
        placeholder="Search..."
      />
      <IconButton type="button" sx={{ color: "green" }} aria-label="search">
        <SendOutlinedIcon />
      </IconButton>
      
    </Paper>
  );
}
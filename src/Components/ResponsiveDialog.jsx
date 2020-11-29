import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import RecipeReviewCard from './RecipeReviewCard';
import axios from 'axios';

var a;
var b;
var c;
var d;
var e;
var f;





var datagrid;


export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const handleClickOpen = () => {
  

    console.log(props.code);
    a=props.code;
    b=props.namepais;
  
    try{

    

     axios.get('https://restcountries-v1.p.rapidapi.com/alpha/'+a,{
       "method": "GET",
       "headers": {
         "x-rapidapi-key": "920dcd0ff9msh216821ea0112939p19b9b7jsncc12f40be6f4",
         "x-rapidapi-host": "restcountries-v1.p.rapidapi.com"
       }
     })
           .then(res => {
             
                datagrid= res.data;
     console.log(datagrid.capital);
     c=datagrid.capital;
     d=datagrid.region;
     e=datagrid.subregion;
     f=datagrid.population;
     setOpen(true);
     console.log(c);
           });
     }
     catch(err)
     {
       console.error(err);
     }
              
    


	  
  };

  const handleClose = () => {
    setOpen(false);
  };






  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       Ver
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Ficha con información detallada"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
		  
		:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  
      <RecipeReviewCard  afcode={a} 
      namep={b} 
      cap={c}
      reg={d}
      srg={e}
      pop={f}

   />
			
			
			
			
			
			
			
			
			
			
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
//import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import TableGeneral from '../Components/TableGeneral';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));




export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={"10"}>

           <Grid key={"value"} item>
            </Grid>
        </Grid>
      </Grid>
      <Grid item lg={12}>
        <Paper className={classes.control}>
          <Grid container  justify="center">
            <Grid item className="">
               <TableGeneral/>
         

            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

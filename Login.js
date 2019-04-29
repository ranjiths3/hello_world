import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment'; 

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    //marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    marginTop: theme.spacing.unit * 4,
    margin: theme.spacing.unit,
    // backgroundColor: theme.palette.secondary.main,
    backgroundColor: "green",

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  span: {

    color : "#cf323f",
    marginTop: theme.spacing.unit * 1,
  }
});


const emailFilter = RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);

const formValidate = formErrors => {
  let error = false;

  Object.values(formErrors).forEach(val =>{

    if(val.length > 0 ){
      error = true;
    }
  });
  return error;

}


class Login extends Component{
  constructor(props)
  {
    super(props);
    this.state = {

      email: "",
      password: "",

      formErrors:{
        email:"",
        password:"",

      }

    }
   

  }

  handleChange= e => {

    e.preventDefault();
    const {name,value} = e.target;

    // console.log(name , value );

    let formErrors = this.state.formErrors;


    switch(name){

      case 'email':
        formErrors.email = emailFilter.test(value) && value.length > 0 ? 
          "" : "Invalid email address"; 
      

      break;

      case 'password':
        formErrors.password = value.length > 8 && value.length > 0  ? (value.length < 16 ) ?  "": "Maximum 15 characters allowed"

           : "Minimum 8 characters required";
            
      break;

      default:
      break;

    



    }
   
    this.setState({formErrors, [name]: value },() => console.log(this.state));
    



  }
  


  handleSubmit = e => {

    e.preventDefault();

    
    if (!formValidate(this.state.formErrors)){
      
      this.props.history.push("/Summary");
      console.log(`
      
        ~~~submitting~~~~
        Email: ${this.state.email}
        Password : ${this.state.password}
        
      
      
      `);
    }

      else{

        console.error("Error in from validation")
      }
      

  



  }

   handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  
  render(){
    const { classes } = this.props;
    const {formErrors} = this.state;
    // console.log("Inside Render ", formErrors)
    return (
      // <main className={classes.main}>
      //   <CssBaseline />
      //   <Paper className={classes.paper}>
      
      <Fragment>
      

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>


          <form className={classes.form} onSubmit= {this.handleSubmit} noValidate>

            <FormControl margin="normal" required fullWidth   >
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" 
                      name="email" 
                     
                      
                      onChange = {this.handleChange} 
                      autoFocus
                      noValidate 
                />
                
                {(formErrors.email.length > 0) && ( <span className = { classes.span} > {formErrors.email}</span>)}
                  
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              {/* <InputLabel htmlFor="password">Password</InputLabel>
              <Input  name="password" 
                      type="password"
                      id="password"
                      value = ""
                      onChange = {this.handleChange}

                      autoComplete="current-password"
                      noValidate
               /> */}


              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password" 
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                inputProps={{ maxLength: 16 }}
                onChange={this.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              {(formErrors.password.length > 0) && ( <span className = { classes.span} > {formErrors.password}</span>)}
                  

            </FormControl>

            {/* <FormControlLabel
              // control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            
            >
              Log in
            </Button>
          </form>
        
        </Fragment>
      
    );
  }
}


Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);

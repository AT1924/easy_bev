import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Redirect from "react-router-dom/es/Redirect";
import {Helmet} from "react-helmet";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                EasyBev
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignIn extends React.Component {

    state = {
        email: '', password: '', error: false, errorMsg: '', redirect: false, type: "merchants", signin: false,
    };

    signIn = async e => {
        e.preventDefault();
        const response = await fetch('/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({type:this.state.type, email: this.state.email, password: this.state.password }),
        });
        const body = await response.json();
        console.log(body);
        if (body.error) {
            console.log(body);
            this.setState({ errorMsg: body.error});

            return false;
        }
        else if (!(body.error)){
            localStorage.setItem('login', "true");
            localStorage.setItem('typeUser', this.state.type);
            this.setState({ signin: true });
        }
        else {
            console.log(body);
        }

        return false;
    };


    handleChange = name => (event) => {
        this.setState({ [name]: event.target.value });
    };

    handle = () => (event) => {
        if (this.state.type === "distributors") {
            this.setState({ type: "merchants" });
            console.log("merchants");
        } else {
            this.setState({ type: "distributors" });
            console.log("dist");
        }
    };


    render() {
        const { classes } = this.props;
        if (this.state.signin) {
            return (
                <Redirect to="/feed"/>
                )

        } else {
            return (
                <React.Fragment>
                <Helmet>
                    <meta name="viewport" content="height=device-height, initial-scale=1.0, maximum-scale=1.0"/>

                </Helmet>

                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper} >
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={this.signIn}>
                            <Paper square>
                                <Tabs
                                    value={this.state.type}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={this.handle()}
                                    centered
                                    variant="fullWidth"
                                >
                                    <Tab label="Merchant" id='merchant' value="merchants" />
                                    <Tab label="Distributor" id='dist' value="distributors" />
                                </Tabs>
                            </Paper>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={this.handleChange('email')}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChange('password')}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />



                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>

                            <Grid/>
                            <Grid container>
                                {/*<Grid item xs>*/}
                                {/*    <Link href="#" variant="body2">*/}
                                {/*        Forgot password?*/}
                                {/*    </Link>*/}
                                {/*</Grid>*/}
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>
                </React.Fragment>
            );
        }

    }


}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
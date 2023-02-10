import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from "@mui/material";
import {AuthService} from "../service/AuthService";
import {TOKEN_COOKIE_NAME} from "../constant";
import cookie from "react-cookies";

export default function LoginDialog(props) {
    let username;
    let password;

    const [error, setError] = React.useState("");

    return (
        <div>

            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Please enter your username and password"}
                </DialogTitle>
                <DialogContent>
                    <TextField id="outlined-basic" label="Username" variant="filled" fullWidth autoFocus onChange={(event ) => {username = event.target.value;}}/>
                    <TextField id="outlined-basic" label="Password" variant="filled" type={"password"} fullWidth onChange={(event) => {password=event.target.value;}} />
                    <DialogContentText id="alert-dialog-description" style = {{"color":"red"}}>
                        {error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={login} >
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

    function login() {
        AuthService.getToken(username, password)
            .then(response => {
                const token = response.data.id_token;
                cookie.save(TOKEN_COOKIE_NAME, token);
                window.location.reload();
            }).catch(error => {
                console.error(error);
                setError((String(error)));
        })
    }
}

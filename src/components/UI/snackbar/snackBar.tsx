import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const SnackBar = (props: any) => {

    return (
        <Snackbar open={props.show}
            autoHideDuration={props.autoHideDuration}
            onClose={props.handleClose}>
            <Alert
                severity={props.severity}
                onClose={props.handleClose}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}
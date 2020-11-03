import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Alert from "@material-ui/lab/Alert";

const AlertDialog = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="error">
          <DialogContent>Error: {props.errorMessage}.</DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Alert>
      </Dialog>
    </div>
  );
};

export default AlertDialog;

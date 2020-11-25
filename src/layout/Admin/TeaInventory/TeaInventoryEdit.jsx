import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

const TeaInventoryEdit = (props) => {
  const [name, setName] = useState(props.tea.name);
  const [type, setType] = useState(props.tea.type);
  const [description, setDescription] = useState(props.tea.description);
  const [temp, setTemp] = useState(props.tea.temp);
  const [steepTime, setSteepTime] = useState(props.tea.steepTime);
  const [price, setPrice] = useState(props.tea.price);

  const editTea = async (event, teaId) => {
    event.preventDefault();
    let url = `http://localhost:4000/tea/${teaId}`;
    let response = await fetch(url, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
      body: JSON.stringify({tea: {name, type, description, temp, steepTime, price}}),
    });
    let editedTea = await response.json();
    console.log(editedTea);
    props.toggleEditDialogue();
    props.showTeas();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.toggleDialogue}>
        <DialogTitle>UPDATE TEA #{}</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => editTea(e, props.tea.id)}>
            <TextField
              id="standard-basic"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Type"
              select
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              {props.teaOptions.map((teaType, index) => {
                let teaTypeCap = teaType
                  .split("")
                  .map((letter, index) => {
                    return index === 0 ? letter.toUpperCase() : letter;
                  })
                  .join("");
                return (
                  <MenuItem key={index} value={teaType}>
                    {teaTypeCap}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField
              id="standard-basic"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Temperature"
              type="number"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Steep Time"
              type="number"
              value={steepTime}
              onChange={(e) => setSteepTime(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <DialogActions>
              <Button type="submit" variant="outlined">
                Edit
              </Button>
              <Button
                onClick={(e) => props.toggleDialogue()}
                variant="outlined"
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeaInventoryEdit;

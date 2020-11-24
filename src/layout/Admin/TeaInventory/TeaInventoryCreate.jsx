import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const TeaInventoryCreate = (props) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [temp, setTemp] = useState(0);
  const [steepTime, setSteepTime] = useState(0);
  const [price, setPrice] = useState(0);

  const teaCreation = async () => {
    try {
      let url = "http://localhost:4000/tea/new";
      let response = await fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: props.token,
        }),
        body: JSON.stringify({
          tea: {
            name: name,
            type: type,
            description: description,
            temp: temp,
            steepTime: steepTime,
            price: price,
          },
        })
      });
      let tea = await response.json();
      console.log(tea);
      props.showTeas();
      setName("");
      setType("");
      setDescription("");
      setTemp(0);
      setSteepTime(0);
      setPrice(0);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    teaCreation();
  };

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField id="standard-basic" label="Type" select onChange={e => setType(e.target.value)} value={type}>
          {props.teaOptions.map((teaType, index) => {
            return (<MenuItem key={index} value={teaType}>
              {teaType}
            </MenuItem>
            )
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
        <Button type="submit">Create Tea</Button>
      </form>
    </div>
  );
};

export default TeaInventoryCreate;

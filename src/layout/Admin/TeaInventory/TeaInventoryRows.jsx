import React from "react";
import { Button, TableRow, TableCell } from "@material-ui/core";

const TeaInventoryRows = (props) => {
  return (
    <TableRow>
      <TableCell>{props.tea.name}</TableCell>
      <TableCell>{props.tea.type}</TableCell>
      <TableCell>{props.tea.description}</TableCell>
      <TableCell>{props.tea.temp} &#8457;</TableCell>
      <TableCell>{props.tea.steepTime} min</TableCell>
      <TableCell>{props.tea.price} $/LB</TableCell>
      <TableCell>{props.tea.quantitea}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          onClick={(e) => props.deleteTea(props.tea.id)}
        >
          DELETE
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          onClick={(e) => {
            props.toggleEditDialogue();
            props.setTeaForEdit(props.tea);
          }}
        >
          EDIT
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TeaInventoryRows;

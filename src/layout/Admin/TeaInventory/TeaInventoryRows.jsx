import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const TeaInventoryRows = (props) => {
  return (
      <TableRow>
        <TableCell>{props.tea.name}</TableCell>
        <TableCell>{props.tea.type}</TableCell>
        <TableCell>{props.tea.description}</TableCell>
        <TableCell>{props.tea.steepTime}</TableCell>
        <TableCell>{props.tea.temp}</TableCell>
        <TableCell>{props.tea.price}</TableCell>
      </TableRow>
  )
}

export default TeaInventoryRows

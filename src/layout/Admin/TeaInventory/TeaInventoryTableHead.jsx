import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const TeaInventoryTableHead = (props) => {
  const {teaKeys, order, orderBy, handleRequestSort} = props;
  return (
    <TableHead>
      <TableRow>
        {teaKeys.map((teaKey, index) => (
          <TableCell
          key={index}
          sortDirection={orderBy === teaKey ? order : false}
          >
            <TableSortLabel
            active={orderBy === teaKey}
            direction={orderBy === teaKey ? order : 'asc'}
            onClick={(e) => handleRequestSort(e, teaKey)}
            >
              {teaKey}
              {orderBy === teaKey ? (
                <span>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TeaInventoryTableHead;

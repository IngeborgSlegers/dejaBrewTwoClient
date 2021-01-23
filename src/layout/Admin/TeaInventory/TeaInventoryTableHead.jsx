import React from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@material-ui/core";

const TeaInventoryTableHead = (props) => {
  const { teaKeys, order, orderBy, handleRequestSort } = props;
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
              direction={orderBy === teaKey ? order : "asc"}
              onClick={(e) => handleRequestSort(e, teaKey)}
            >
              {teaKey.toUpperCase()}
              {orderBy === teaKey ? (
                <span>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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

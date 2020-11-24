import React, { useState, useEffect } from "react";
import TeaInventoryRows from "./TeaInventoryRows";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TeaInventoryTableHead from "./TeaInventoryTableHead";
import TeaInventoryCreate from "./TeaInventoryCreate";
import { Button } from "@material-ui/core";

const TeaInventory = (props) => {
  const [teaKeys, setTeaKeys] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [open, setOpen] = useState(false);

  const toggleDialogue = () => {
    setOpen(!open);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    console.log(isAsc);
    console.log(orderBy, order, property);
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((element, index) => [element, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((element) => element[0]);
  }

  useEffect(() => {
    getTeaKeys();
    // return () => {
    //   cleanup
    // }
  }, []);

  const getTeaKeys = () => {
    let keys = Object.keys(props.teaArray[0]);
    let filteredKeys = keys.filter(
      (key) => key !== "id" && key !== "createdAt" && key !== "updatedAt"
    );
    setTeaKeys(filteredKeys);
  };

  return (
    <div>
      <Button onClick={toggleDialogue}>Add Tea</Button>
      {open ? <TeaInventoryCreate
        token={props.token}
        showTeas={props.showTeas}
        teaOptions={props.teaOptions}
        open={open}
        toggleDialogue={toggleDialogue}
      /> : null}
      <Paper>
        <TableContainer>
          <Table>
            <TeaInventoryTableHead
              teaKeys={teaKeys}
              order={order}
              setOrderBy={setOrderBy}
              handleRequestSort={handleRequestSort}
            />
            <TableBody>
              {props.teaArray.length > 0
                ? stableSort(
                    props.teaArray,
                    getComparator(order, orderBy)
                  ).map((tea, index) => (
                    <TeaInventoryRows
                      key={index}
                      tea={tea}
                      stableSort={stableSort}
                      getComparator={getComparator}
                    />
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default TeaInventory;

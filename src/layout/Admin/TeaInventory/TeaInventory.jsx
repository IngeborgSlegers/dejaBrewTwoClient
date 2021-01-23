import React, { useState, useEffect } from "react";
import TeaInventoryRows from "./TeaInventoryRows";
import TeaInventoryTableHead from "./TeaInventoryTableHead";
import TeaInventoryCreate from "./TeaInventoryCreate";
import TeaInventoryEdit from "./TeaInventoryEdit";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  Button,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const TeaInventory = (props) => {
  const [teaKeys, setTeaKeys] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [teaId, setTeaId] = useState(0);
  const [tea, setTea] = useState({});

  const toggleCreateDialogue = () => {
    setOpenCreate(!openCreate);
  };

  const toggleEditDialogue = () => {
    setOpenEdit(!openEdit);
  };

  const setTeaForEdit = (newTea) => {
    setTea(newTea);
  };

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
  }, []);

  useEffect(() => {
    props.showTeas();
  }, []);

  const getTeaKeys = () => {
    let keys = Object.keys(props.teaArray[0]);
    let filteredKeys = keys.filter(
      (key) => key !== "id" && key !== "createdAt" && key !== "updatedAt"
    );
    setTeaKeys(filteredKeys);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const deleteTea = async (teaId) => {
    let url = `http://localhost:4000/tea/${teaId}`;
    let deleteTea = await fetch(url, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      }),
    });
    let response = await deleteTea.json();
    console.log(response);
    setTeaId(teaId);
    setSnackOpen(true);
    props.showTeas();
  };

  return (
    <div>
      {snackOpen ? (
        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClick={handleClose}
        >
          <Alert severity="success">Tea #{teaId} successfully deleted!</Alert>
        </Snackbar>
      ) : null}

      <Button onClick={toggleCreateDialogue} variant="outlined">
        Add Tea
      </Button>
      {openCreate ? (
        <TeaInventoryCreate
          token={props.token}
          showTeas={props.showTeas}
          teaOptions={props.teaOptions}
          open={openCreate}
          toggleCreateDialogue={toggleCreateDialogue}
        />
      ) : null}
      {openEdit ? (
        <TeaInventoryEdit
          token={props.token}
          tea={tea}
          showTeas={props.showTeas}
          teaOptions={props.teaOptions}
          open={openEdit}
          toggleEditDialogue={toggleEditDialogue}
        />
      ) : null}
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
                      deleteTea={deleteTea}
                      teaOptions={props.teaOptions}
                      setTeaForEdit={setTeaForEdit}
                      toggleEditDialogue={toggleEditDialogue}
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

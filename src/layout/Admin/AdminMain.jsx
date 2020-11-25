import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import TeaInventory from "./TeaInventory/TeaInventory";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const AdminMain = (props) => {
  let { path, url } = useRouteMatch();
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            variant="h5"
            component="h2"
            gutterBottom
          >
            TEA INVENTORY
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            View, create, or update the current stock of tea on hand.
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`${url}/teaInventory`}>
            <Button size="small">View Tea Inventory</Button>
          </Link>
        </CardActions>
      </Card>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            variant="h5"
            component="h2"
            gutterBottom
          >
            USERS
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            View or update from the list of all the users with an account at
            Déjà Brew.
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/users">
            <Button size="small">View All Users</Button>
          </Link>
        </CardActions>
      </Card>
      <Switch>
        <Route path={`${path}/teaInventory`}>
          <TeaInventory
            teaArray={props.teaArray}
            showTeas={props.showTeas}
            token={props.token}
            teaOptions={props.teaOptions}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default AdminMain;

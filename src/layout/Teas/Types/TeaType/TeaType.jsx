import React, { useState, useEffect } from "react";
import TeasByType from "../TeasByType/TeasByType";
import { Button, Card, CardBody, Row, Col } from "reactstrap";
import "./TeaType.css";

const AllTeas = (props) => {
  const [teaType, setTeaType] = useState("");
  const [teaByType, setTeaByType] = useState([]);
  const [teaOptions, setTeaOptions] = useState([
    "Black",
    "White",
    "Green",
    "Oolong",
    "Herbal",
    "Pu-erh",
  ]);

  useEffect(() => (teaType !== "" ? showTeas() : undefined), [teaType]);

  const getTeaType = (event) => {
    console.log(event.target.value);
    setTeaType(event.target.value);
  };

  const showTeas = () => {
    let url = `http://localhost:4000/tea/type/${teaType.toLocaleLowerCase()}`;
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTeaByType(data.teas);
      });
  };

  const teaButtons = () => {
    return teaOptions.map((tea, index) => {
      return (
        <Col key={index}>
          <Card>
            <CardBody>
              <Button
                className="TeaButton"
                value={tea}
                onClick={getTeaType}
              >
                {tea}
              </Button>
            </CardBody>
          </Card>
        </Col>
      );
    });
  };

  return (
    <div className="alltea">
      <Row className="TeaButtons">{teaButtons()}</Row>
      <Row className="TeaCards">
        {teaByType.length > 0
          ? teaByType.map((teas, index) => (
              <TeasByType key={index} teas={teas} getTeaId={props.getTeaId} />
            ))
          : null}
      </Row>
    </div>
  );
};

export default AllTeas;

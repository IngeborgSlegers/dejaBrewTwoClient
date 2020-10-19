import React, { useState, useEffect } from "react";
import { Card, Row, Col, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./AllTeas.css";

const AllTeas = (props) => {
  const [teaArray, setTeaArray] = useState([]);

  useEffect(() => {
    showTeas();
  }, []);

  const showTeas = () => {
    let url = "http://localhost:4000/tea";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTeaArray(data.teas);
      });
  };

  return (
    <div className="alltea">
      <Row>
        {teaArray.map((tea, index) => {
          return (
            <Col key={index}>
              <Card>
                <CardBody>
                  <Button
                    className="TeaCard"
                    // value={tea}
                    onClick={() => {props.getTeaId(tea.id)}}
                  >
                    <Link
                      to="/tea"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      {tea.name}
                    </Link>
                  </Button>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default AllTeas;

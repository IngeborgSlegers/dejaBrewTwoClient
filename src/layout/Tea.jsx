import React, { useState, useEffect } from "react";
import { Card, Row } from "reactstrap";
import "./Tea.css";

let url = "http://localhost:4000/tea";

const Tea = (props) => {
  const [teaArray, setTeaArray] = useState([]);

  useEffect(() => {
    showTeas();
  }, []);

  const showTeas = () => {
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setTeaArray(data.teas);
      });
  };

  return (
    <div className="alltea">
      <Row>
        {teaArray.map((tea) => {
          return (
            <Card className="teacard" key={tea.id}>
              {tea.name}
            </Card>
          );
        })}
      </Row>
    </div>
  );
};

export default Tea;
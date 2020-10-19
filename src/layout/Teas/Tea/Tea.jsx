import React, { useEffect, useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
} from "reactstrap";
import Temp from "../../../assets/water-temperature.png";
import Timer from "../../../assets/timer.png";
import TeaCup from "../../../assets/greenTea.png";

const Tea = (props) => {
  console.log(props);
  const [teaInfo, setTeaInfo] = useState({});

  useEffect(() => (props.teaId !== 0 ? showTea() : undefined), []);

  const showTea = () => {
    console.log();
    let url = `http://localhost:4000/tea/${props.teaId}`;
    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTeaInfo(data.tea);
      });
  };

  console.log(teaInfo);

  return (
    <div>
      <Card style={{ width: "50vw", margin: "2em auto" }}>
        <CardImg
          top
          width="100%"
          style={{ width: "5em" }}
          src={TeaCup}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{teaInfo.name}</CardTitle>
          {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
          <CardText>Description: {teaInfo.description}</CardText>
          <CardText>Price: {teaInfo.price}/oz.</CardText>
          <Row style={{margin: "2em auto"}}>
            <Col xs="2">
              <CardImg style={{ width: "2em" }} src={Timer} />
              <CardText>{teaInfo.steepTime} minutes</CardText>
            </Col>
            <Col xs="2">
              <CardImg style={{ width: "2em" }} src={Temp} />
              <CardText>{teaInfo.temp} &#8457;</CardText>
            </Col>
          </Row>
          <Button
          // onClick={} --> this will open a sidebar to the right of the screen with the new item in the cart
          >
            Add to cart
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Tea;

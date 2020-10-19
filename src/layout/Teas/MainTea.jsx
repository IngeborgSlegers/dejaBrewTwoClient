import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody } from "reactstrap";
import './MainTea.css';

const MainTea = () => {
  return (
    <div>
      <Row className="mainTea">
        <Col xs="3">
          <Link to="/allteas" className="mainTeaLink">
            <Card className="mainTeaCard">
              <CardBody>All Teas</CardBody>
            </Card>
          </Link>
        </Col>
        <Col xs="3">
          <Link to="/teaType" className="mainTeaLink">
            <Card className="mainTeaCard">
              <CardBody>Tea Types</CardBody>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default MainTea;

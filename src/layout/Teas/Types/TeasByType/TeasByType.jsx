import React, { useState } from "react";
import TeaPreviewModal from "../../TeaPreviewModal";
import { Card, CardBody, Col } from "reactstrap";
import "./TeasByType.css";

const TeasByType = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  console.log(props);
  return (
    <div>
      <Col>
        <Card onClick={() => toggle()} className="TeaCard">
          <CardBody>{props.teas.name}</CardBody>
        </Card>
      </Col>
      {modal ? (
        <TeaPreviewModal tea={props.teas} modal={modal} toggle={toggle} getTeaId={props.getTeaId} />
      ) : null}
    </div>
  );
};

export default TeasByType;

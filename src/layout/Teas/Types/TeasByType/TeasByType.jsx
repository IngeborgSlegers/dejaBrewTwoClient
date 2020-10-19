import React, {useState} from 'react';
import TeaPreviewModal from '../../TeaPreviewModal';
import {Card, CardTitle, Col} from 'reactstrap';

const TeasByType = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  console.log(props)
  return (
    <div>
      <Col>
        <Card onClick={() => toggle()}>
          <CardTitle>{props.teas.name}</CardTitle>
        </Card>
      </Col>
      {modal ? <TeaPreviewModal tea={props.teas} modal={modal} toggle={toggle} /> : null}
    </div>
  )
}

export default TeasByType

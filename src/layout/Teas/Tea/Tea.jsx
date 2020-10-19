import React, {useEffect, useState} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import TeaCup from '../../../assets/greenTea.png';

const Tea = (props) => {
  console.log(props);
  const [teaInfo, setTeaInfo] = useState({})

  useEffect(() => (props.teaId !== 0 ? showTea() : undefined), [])

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
        setTeaInfo(data);
      });
  };

  return (
    <div>
      <Card style={{width: "50vw", margin: "2em auto"}}>
        <CardImg top width="100%" style={{width: "5em"}} src={TeaCup} alt="Card image cap" />
        <CardBody>
          <CardTitle>{teaInfo.name}</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default Tea

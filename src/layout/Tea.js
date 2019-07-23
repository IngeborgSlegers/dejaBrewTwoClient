import React from 'react';
import {Card, Row} from 'reactstrap';
import './Tea.css';

let url = 'http://localhost:3000/tea' ;

export default class Tea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      teaArray: []
    }
  }

  componentDidMount() {
    this.showTeas();
  }

  showTeas = () => {
    fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then((res) => res.json())
    .then((data) => {
      this.setState({teaArray: data})
      console.log(this.state.teaArray)
    })
  }

  render () {
    return (
      <div className="alltea" >
        <Row>
        {this.state.teaArray.map((tea) => {
          return (
            <Card className='teacard' key={tea.id}>{tea.teaName}</Card>
            )
          })}
        </Row>
      </div>
    )
  }
}
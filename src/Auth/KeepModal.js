import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

const KeepModal = (props) => {

  console.log('keepmodal side has been hit too!')

  return (
    <div>
      <Modal isOpen={true}>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </ModalBody>
        <ModalFooter>
          <Link to='/'><Button color="primary" >KEEP SHOPPING</Button></Link>
          <Link to='/profile'><Button color="secondary" >PROFILE</Button></Link>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default KeepModal;
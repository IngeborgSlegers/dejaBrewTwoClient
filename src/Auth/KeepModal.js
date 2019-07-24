import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

const KeepModal = (props) => {

  console.log('keepmodal side has been hit too!')

  return (
    <div>
      <Modal isOpen={true}>
        <ModalHeader>Welcome {props.userName}!</ModalHeader>
        <ModalBody>
        Est americano mug robust grounds crema as, a to go irish milk cinnamon. Cappuccino affogato beans mazagran bar caffeine trifecta. Carajillo, french press milk, brewed café au lait seasonal fair trade, iced lungo decaffeinated americano viennese. And macchiato, brewed, affogato iced, milk, java aromatic sugar lungo extraction decaffeinated. Et flavour decaffeinated, café au lait robusta con panna chicory sweet carajillo as milk cappuccino
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
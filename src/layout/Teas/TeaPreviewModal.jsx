import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const TeaPreviewModal = (props) => {
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>{props.tea.name}</ModalHeader>
        <ModalBody>{props.tea.description}</ModalBody>
        <ModalFooter>
          <Button color="success" onClick={props.toggle}>
            Add to cart
          </Button>
          <Link to="/tea">
          <Button color="primary" onClick={props.toggle, props.getTeaId(props.tea.id)}>
            Learn More
          </Button>
          </Link>
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TeaPreviewModal;

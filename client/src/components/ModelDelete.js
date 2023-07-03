import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
} from "mdb-react-ui-kit";

const ModelDelete = ({
  isModalOpen,
  setIsModalOpen,
  toggleShow,
  handleDelete,
  id,
}) => {
  return (
    <>
      <MDBModal show={isModalOpen} setShow={setIsModalOpen} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle className="delete-msg">
                Are you sure you want to delete this blog ?
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>

            <MDBModalFooter>
              <MDBBtn color="dark" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={() => handleDelete(id)}>Delete</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ModelDelete;

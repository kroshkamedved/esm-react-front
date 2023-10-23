import "./modal.css";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";

import { updateData } from "../redux/updateSlice";
import { cancel } from "../redux/confirmSlice";
import Container from "react-bootstrap/Container";

const ConfirmModal = ({ setError, jwt, dbData, handleRefresh, setDbData }) => {
  const { isOpened, currentIndex } = useSelector((state) => state.confirmState);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    dispatch(cancel());
    dispatch(
      updateData({
        deleteMod: true,
        deleteItemId: dbData[currentIndex].id,
        setErrorHook: setError,
        jwt: jwt,
      })
    );
    const editedData = [
      ...dbData.slice(0, currentIndex),
      ...dbData.slice(currentIndex + 1),
    ];
    setDbData(editedData);
  };

  return (
    isOpened && (
      <Form className="centralModal2 px-4 py-4" onSubmit={handleSubmit}>
        <div className="d-flex justify-align-center">
          <h2>DELETE CONFIRMATION</h2>
        </div>
        <Container className="d-flex justify-content-center align-items-center">
          <span className="pb-4">
            Do you want to delete certificate with ID :{" "}
            {dbData[currentIndex].id}
          </span>
        </Container>

        <div className="d-flex pt-3 justify-content-center">
          {
            <Button id="viewButton" variant="danger" onClick={handleSubmit}>
              Submit
            </Button>
          }
          <Button
            className="mx-3"
            variant="secondary"
            onClick={() => {
              dispatch(cancel());
            }}
          >
            Cancel
          </Button>
        </div>
      </Form>
    )
  );
};

export default ConfirmModal;

import "./modal.css";
import { useSelector } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { close } from "../redux/modalSlice";
import TagsList from "../TagsList";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { updateData } from "../redux/updateSlice";

const Modal = ({
  dbData,
  form,
  setForm,
  tags,
  setTags,
  allTags,
  setErrorHook,
  jwt,
}) => {
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  const [oldTags, setOldTags] = useState(tags);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpened, currentIndex, editMode, addMode, viewMode } = useSelector(
    (state) => state.modalState
  );
  const [newTagName, setNewTagName] = useState("");

  //validation

  const [errors, setErrors] = useState({});

  const setFields = (field, value) => {
    setForm({ ...form, [field]: value });

    if (!!errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = ["name", "description", "duration", "price", "tags"];
    for (const field of fields) {
      if (!form[field]) {
        if (field !== "tags") {
          newErrors[field] = "Field shoud not be empty!";
        }
      } else if (
        (field == "name" && form[field].length < 6) ||
        form[field].length > 30
      ) {
        newErrors[field] =
          "Title field must not be less than 6 and greater than 30 characters";
      } else if (
        (field == "description" && form[field].length < 12) ||
        form[field].length > 1000
      ) {
        newErrors[field] =
          "Description field must not be less than 12 and greater than 1000 characters";
      }
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.tags === undefined) {
      form.tags = [];
    }
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      if (editMode) {
        const currentCertificate = dbData[currentIndex];
        for (const prop in form) {
          if (prop == tags) {
            currentCertificate[prop] = tags;
          }
          currentCertificate[prop] = form[prop];
        }
        dispatch(
          updateData({
            certificate: currentCertificate,
            setErrorHook: setErrorHook,
            jwt: jwt,
          })
        );
      } else {
        let newCertificate = {};
        for (const prop in form) {
          if (prop == tags) {
            newCertificate[prop] = tags;
            continue;
          }
          newCertificate[prop] = form[prop];
        }
        dispatch(
          updateData({
            certificate: newCertificate,
            setErrorHook: setErrorHook,
            jwt: jwt,
            addMode: addMode,
          })
        );
      }
      dispatch(close());
      setForm({});
      setTags([]);
    }
  };

  return (
    isOpened && (
      <Form className="centralModal px-4 py-4" onSubmit={handleSubmit}>
        <div className="pb-3">
          {viewMode || editMode ? (
            "ID:" + dbData[currentIndex].id
          ) : (
            <h2>Add New Coupon</h2>
          )}
        </div>
        <br />
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Title
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              value={
                editMode
                  ? form.name
                  : addMode
                  ? form.name
                  : dbData[currentIndex].name
              }
              onChange={(e) => {
                setFields("name", e.target.value);
              }}
              isInvalid={!!errors.name}
              type="text"
              placeholder="Enter title"
              readOnly={viewMode ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              value={
                editMode
                  ? form.description
                  : addMode
                  ? form.description
                  : dbData[currentIndex].description
              }
              onChange={(e) => {
                setFields("description", e.target.value);
              }}
              isInvalid={!!errors.description}
              as="textarea"
              rows={3}
              placeholder="Enter short description"
              readOnly={viewMode ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Duration
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              value={
                editMode
                  ? form.duration
                  : addMode
                  ? form.duration
                  : dbData[currentIndex].duration
              }
              onChange={(e) => {
                setFields("duration", e.target.value);
              }}
              isInvalid={!!errors.duration}
              type="number"
              min={1}
              max={999}
              placeholder="Enter duration in a range from 1 to 999"
              readOnly={viewMode ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.duration}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Price
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              value={
                editMode
                  ? form.price
                  : addMode
                  ? form.price
                  : dbData[currentIndex].price
              }
              onChange={(e) => {
                setFields("price", e.target.value);
              }}
              isInvalid={!!errors.price}
              type="number"
              min={0.01}
              step={0.1}
              max={999}
              placeholder="Enter duration in a range from 1 to 999"
              readOnly={viewMode ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        {!viewMode && (
          <div className="d-flex mb-3">
            <Form.Label className="pt-3" column sm={2}>
              Add tag
            </Form.Label>
            <Autocomplete
              onChange={(event, newValue) => {
                setTags(newValue);
                setFields("tags", newValue);
              }}
              multiple
              limitTags={2}
              id="multiple-limit-tags"
              options={allTags}
              getOptionLabel={(option) => option.name}
              defaultValue={tags}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose tags..."
                  placeholder="Tags"
                />
              )}
              sx={{ width: "500px" }}
            />
          </div>
        )}
        {viewMode && (
          <div className="mb-3">
            <TagsList tags={tags} setTags={setTags} />
          </div>
        )}
        <div className="d-flex justify-content-center">
          {!viewMode && (
            <Button
              disabled={viewMode ? true : false}
              id="viewButton"
              variant="primary"
              onClick={handleSubmit}
            >
              Save
            </Button>
          )}
          <Button
            className="mx-3"
            variant="secondary"
            onClick={() => {
              setForm({});
              setNewTagName("");
              setErrors({});
              setTags({});
              dispatch(close());
            }}
          >
            Close
          </Button>
        </div>
      </Form>
    )
  );
};

export default Modal;

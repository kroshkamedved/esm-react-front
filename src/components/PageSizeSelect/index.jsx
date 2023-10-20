import React from "react";
import Form from "react-bootstrap/Form";

const PageSizeDropdown = ({ pageSize, onChangePageSize }) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onChangePageSize(selectedValue);
  };

  return (
    <Form>
      <Form.Group controlId="pageSizeDropdown">
        <Form.Select value={pageSize} onChange={handleChange}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
};

export default PageSizeDropdown;

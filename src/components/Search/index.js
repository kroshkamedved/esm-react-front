import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";

const SearchComponent = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Search..."
        aria-label="Search"
        aria-describedby="basic-addon2"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button
        variant="outline-secondary"
        id="button-addon2"
        onClick={handleSearch}
      >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GO!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Button>
    </InputGroup>
  );
};

export default SearchComponent;

import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";

const SearchComponent = ({ onSearch, refreshHook }) => {
  const [searchText, setSearchText] = useState("");

  function parseForRequestParams(input) {
    const tagRegex = /#(\([a-zA-Z0-9\s]+\))/g;
    const descriptionRegex = /(\b\w+\b)/g;

    const tags = [];
    let description = "";
    const words = input.split(" ");

    for (let i = 0; i < words.length; i++) {
      const tagMatch = words[i].match(tagRegex);
      const descriptionMatch = words[i].match(descriptionRegex);

      if (tagMatch) {
        tagMatch.forEach((match) => {
          tags.push(match.slice(2, -1)); // Extract tag name
        });
      } else if (descriptionMatch) {
        description = descriptionMatch.join(" "); // Join description words
        // Break after the first description is found
        break;
      }
    }

    const params = [];
    tags.forEach((tag) => {
      params.push(`tagName=${tag}`);
    });

    if (description) {
      params.push(`description=${description}`);
    }

    return params.join("&");
  }

  const handleSearch = () => {
    const result = parseForRequestParams(searchText);
    onSearch(result);
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Search..."
        aria-label="Search"
        aria-describedby="basic-addon2"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          if (e.target.value === "") {
            refreshHook();
          }
        }}
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

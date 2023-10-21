import React from "react";
import PropTypes from "prop-types";

const SortHeader = ({
  accessor,
  currentSort,
  handleSortingChange,
  ascOrderBoolean,
}) => {
  const isCurrentSort = accessor === currentSort;
  const ascOrder = ascOrderBoolean ? "asc" : "desc";

  const handleClick = () => {
    handleSortingChange(
      accessor,
      isCurrentSort ? (ascOrder === "asc" ? "desc" : "asc") : "asc"
    );
  };

  return (
    <th className="clickable-header" onClick={handleClick}>
      {isCurrentSort && (ascOrder === "asc" ? "▼" : "▲")}
      {accessor}
    </th>
  );
};

SortHeader.propTypes = {
  accessor: PropTypes.string.isRequired,
  currentSort: PropTypes.string,
  handleSortingChange: PropTypes.func.isRequired,
};

export default SortHeader;

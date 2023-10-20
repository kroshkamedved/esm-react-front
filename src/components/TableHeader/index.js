import React from "react";
import SortHeader from "./SortHeader";

const tableHeaders = [
  { accessor: "created", label: "Created" },
  { accessor: "id", label: "ID" },
  { accessor: "title", label: "Title" },
  { accessor: "tags", label: "Tags" },
  { accessor: "description", label: "Description" },
  { accessor: "price", label: "Price" },
];

const TableHeader = ({ sortField, handleSortingChange }) => {
  return (
    <thead>
      <tr>
        {tableHeaders.map((header) => (
          <SortHeader
            key={header.accessor}
            accessor={header.accessor}
            currentSort={sortField}
            handleSortingChange={handleSortingChange}
          >
            {header.label}
          </SortHeader>
        ))}
        <th className="text-center">Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;

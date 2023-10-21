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

const TableHeader = ({ currentSort, handleSortingChange, ascOrderBoolean }) => {
  return (
    <thead>
      <tr>
        {tableHeaders.map((header) => (
          <SortHeader
            key={header.accessor}
            accessor={header.accessor}
            currentSort={currentSort}
            handleSortingChange={handleSortingChange}
            ascOrderBoolean={ascOrderBoolean}
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

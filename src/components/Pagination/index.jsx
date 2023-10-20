import Pagination from "react-bootstrap/Pagination";

const CustomPagination = ({ totalPages, currentPage, handlePageSelect }) => {
  let items = [];
  for (let iter = 1; iter < totalPages; iter++) {
    items.push(
      <Pagination.Item
        onClick={() => handlePageSelect(iter)}
        key={iter}
        active={iter === currentPage}
      >
        {iter}
      </Pagination.Item>
    );
  }
  return items;
};

export default CustomPagination;

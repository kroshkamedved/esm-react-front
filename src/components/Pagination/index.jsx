import Pagination from "react-bootstrap/Pagination";

const CustomPagination = ({ totalPages, currentPage, handlePageSelect }) => {
  let items = [];
  for (let iter = 0; iter < totalPages; iter++) {
    if (
      iter == 0 ||
      iter == totalPages - 1 ||
      iter == currentPage + 1 ||
      iter == currentPage - 1 ||
      iter == currentPage
    ) {
      items.push(
        <Pagination.Item
          onClick={() => handlePageSelect(iter)}
          key={iter}
          active={iter === currentPage}
        >
          {iter + 1}
        </Pagination.Item>
      );
    } else if (iter == currentPage + 2 || iter == currentPage - 2) {
      items.push(<Pagination.Ellipsis />);
    }
  }
  return items;
};

export default CustomPagination;

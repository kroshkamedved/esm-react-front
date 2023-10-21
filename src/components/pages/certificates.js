import React from "react";
import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import Pagination from "react-bootstrap/Pagination";
import { getData } from "../redux/dataSlice";
import { useDispatch } from "react-redux";
import PageSizeDropdown from "../PageSizeSelect";
import CustomPagination from "../Pagination";
import "./certificates.css";
import SearchComponent from "../Search";
import { search } from "../redux/dataSlice";
import TableHeader from "../TableHeader";
import CertificatesTableBody from "../TableBody";

const Certificates = () => {
  const [error, setError] = useState(null);
  const { jwt } = useSelector((state) => state.auth);
  const [dbData, setDbData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState({});
  const [sortField, setSortField] = useState("created");
  const [ascOrder, setAscOrder] = useState(true);

  const dispatch = useDispatch();

  //button handling
  const handleDelete = (id) => {
    const updatedArray = [...dbData];
    updatedArray.splice(id, 1);
    setDbData(updatedArray);
  };

  const handleView = (id) => {
    alert(dbData[id]);
  };

  const handleUpdate = (id) => {
    const updatedArray = [...dbData];
    updatedArray[id].name = "CHANGED FROM UI";
    setDbData(updatedArray);
  };

  //fetching initial data
  useEffect(() => {
    dispatch(
      getData({
        jwt,
        requestParams: { nextPage: currentPage, pageSize: pageSize },
        setErrorHook: setError,
      })
    ).then((data) => {
      console.log(data);
      if (data.payload) {
        const sortedArray = data.payload._embedded.certificateModelList;
        //setDbData(data.payload._embedded.certificateModelList);
        sortData(sortField, sortedArray);
        setPage(data.payload.page);
      }
    });
  }, [pageSize]);

  // autohide error
  useEffect(() => {
    const deleteError = () => {
      setError(null);
    };
    if (error) {
      setTimeout(deleteError, 5000);
    }
  }, [error]);

  const handlePageSelect = (page) => {
    dispatch(
      getData({
        jwt,
        requestParams: { nextPage: page, pageSize: pageSize },
        setErrorHook: setError,
      })
    ).then((data) => {
      console.log(data);
      if (data.payload) {
        setDbData(data.payload._embedded.certificateModelList);
        setPage(data.payload.page);
      }
    });
  };

  const sortData = (accessor, array = dbData) => {
    const sortedData = [...array];
    sortedData.sort((a, b) => {
      if (ascOrder) {
        return a[accessor] > b[accessor] ? 1 : -1;
      } else {
        return a[accessor] < b[accessor] ? 1 : -1;
      }
    });
    setDbData(sortedData);
  };

  const handleSortingChange = (accessor) => {
    setSortField(accessor);
    setAscOrder(!ascOrder);
    sortData(accessor);
  };

  const performSearch = () => {
    dispatch(
      getData({
        jwt,
        setErrorHook: setError,
        performSearch: true,
      })
    ).then((data) => {
      if (data.payload) {
        setDbData(data.payload);
      }
    });
  };

  return (
    <>
      {error && (
        <Container className="px-3 py-1 d-flex">
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{error}</p>
          </Alert>
        </Container>
      )}
      <Container className="px-4">
        <SearchComponent onSearch={performSearch} />
      </Container>
      <Container className="px-4">
        <Table size="sm" bordered hover>
          <TableHeader
            currentSort={sortField}
            handleSortingChange={handleSortingChange}
            ascOrderBoolean={ascOrder}
          />
          <CertificatesTableBody
            dbData={dbData}
            error={error}
            handleDelete={handleDelete}
            handleView={handleView}
            handleUpdate={handleUpdate}
          />
        </Table>
        <div className="d-flex">
          <div className="ms-auto" style={{ paddingLeft: "5rem" }}>
            <Pagination>
              <CustomPagination
                totalPages={page.totalPages}
                currentPage={page.number}
                handlePageSelect={handlePageSelect}
              />
            </Pagination>
          </div>
          <div className="ms-auto" style={{ width: "5rem" }}>
            <PageSizeDropdown
              pageSize={pageSize}
              onChangePageSize={(selectedValue) => {
                setPageSize(selectedValue);
              }}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Certificates;

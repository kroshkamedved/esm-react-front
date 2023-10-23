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
import Modal from "../Modal";
import { edit, add, view, close } from "../redux/modalSlice";
import { updateData } from "../redux/updateSlice";

const Certificates = () => {
  const [error, setError] = useState(null);
  const { jwt } = useSelector((state) => state.auth);
  const [dbData, setDbData] = useState(null);
  const [pageSize, setPageSize] = useState(
    JSON.parse(localStorage.getItem("pageSize"))
  );
  const [currentPage, setCurrentPage] = useState(
    JSON.parse(localStorage.getItem("currentPage"))
  );
  const [page, setPage] = useState({});
  const [sortField, setSortField] = useState("created");
  const [ascOrder, setAscOrder] = useState(true);
  const [searchMode, setSearchMode] = useState(false);
  const { isOpened } = useSelector((state) => state.modalState);
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [currentCertificateTags, setCurrentCertificateTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

  //button handling
  const handleDelete = (id) => {
    dispatch(
      updateData({
        deleteMod: true,
        deleteItemId: dbData[id].id,
        setErrorHook: setError,
        jwt: jwt,
      })
    );
    handleRefresh();
  };

  const handleView = (id) => {
    fullfillInitialValues(id);
    dispatch(view(id));
  };

  const loadTags = async () => {
    try {
      const response = await fetch("http://localhost:8080/tags", {
        method: "get",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      });
      if (response.ok) {
        const tagData = await response.json();
        setAllTags(tagData._embedded.tagModelList);
      }
    } catch {
      setError("Server communication error");
    }
  };

  const handleUpdate = (id) => {
    loadTags();
    fullfillInitialValues(id);
    dispatch(edit(id));
    handleRefresh();
  };

  function fullfillInitialValues(id) {
    const preparedForm = {};
    const entity = dbData[id];
    const initialTags = [];

    for (const prop in entity) {
      if (prop === "tags") {
        entity[prop].map((tag) => initialTags.push(tag));
      } else {
        preparedForm[prop] = entity[prop];
      }
    }
    setForm(preparedForm);
    setCurrentCertificateTags(initialTags);
  }

  //fetching initial data
  useEffect(() => {
    handleRefresh();
    loadTags();
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
    setCurrentPage(page);
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
        localStorage.setItem("currentPage", data.payload.page.number);
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

  const performSearch = (text) => {
    dispatch(
      getData({
        jwt,
        setErrorHook: setError,
        performSearch: true,
        requestParamsString: text,
      })
    ).then((data) => {
      if (data.payload) {
        setDbData(data.payload);
        setSearchMode(true);
      }
    });
  };

  const handleRefresh = () => {
    setSearchMode(false);
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
        sortData(sortField, sortedArray);
        setPage(data.payload.page);
      }
    });
  };
  //Doesn't need it now
  // const handleOutsideClick = (e) => {
  //   if (isOpened) {
  //     const modal = document.querySelector(".centralModal");
  //     const viewButton = document.getElementById("viewButton"); // Replace with the actual class or selector for your "View" button

  //     if (!modal.contains(e.target) && e.target !== viewButton) {
  //       // The click was outside the modal, and not on the "View" button, so close the modal
  //       dispatch(close());
  //     }
  //   }
  // };

  return (
    <>
      <div /*onClick={handleOutsideClick}*/>
        {error && (
          <Container className="px-3 py-1 d-flex">
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>{error}</p>
            </Alert>
          </Container>
        )}
        <Container className="px-4">
          <SearchComponent
            onSearch={performSearch}
            refreshHook={handleRefresh}
          />
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
          {!searchMode && (
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
                    setCurrentPage(0);
                    localStorage.setItem("currentPage", 0);
                    localStorage.setItem("pageSize", selectedValue);
                    setPageSize(selectedValue);
                  }}
                />
              </div>
            </div>
          )}
          <Modal
            dbData={dbData}
            form={form}
            setForm={setForm}
            tags={currentCertificateTags}
            setTags={setCurrentCertificateTags}
            allTags={allTags}
            setErrorHook={setError}
            jwt={jwt}
          />
        </Container>
      </div>
    </>
  );
};
export default Certificates;

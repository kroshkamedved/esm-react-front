import React from "react";
import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { hostName } from "../../config";
import { useSelector } from "react-redux";
import Pagination from "react-bootstrap/Pagination";
import { getData } from "../redux/dataSlice";
import { useDispatch } from "react-redux";
import PageSizeDropdown from "../PageSizeSelect";
import CustomPagination from "../Pagination";

const Certificates = () => {
  const [error, setError] = useState(null);
  const { jwt } = useSelector((state) => state.auth);
  const [dbData, setDbData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState({});

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

  //autohide error & fetching data
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(`${hostName}/certificates/all`, {
    //       method: "get",
    //       headers: {
    //         Authorization: `Bearer ${jwt}`,
    //       },
    //     });
    //     if (!response.ok) {
    //       throw new Error("Server communication error");
    //     } else {
    //       const data = await response.json();
    //       setDbData(data._embedded.certificateModelList);
    //       setPage(data.payload.page);
    //     }
    //   } catch (error) {
    //     setError("Server communication error");
    //   }
    // };
    // fetchData();
    dispatch(
      getData({
        jwt,
        requestParams: { nextPage: currentPage, pageSize: pageSize },
        setErrorHook: setError,
      })
    ).then((data) => {
      console.log(data);
      if (data.payload) {
        setDbData(data.payload._embedded.certificateModelList);
        setPage(data.payload.page);
      }
    });
  }, []);

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

  //pagination
  let active = 1;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        onClick={() => handlePageSelect(number)}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      {error && (
        <Container className="px-3 py-1">
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{error}</p>
          </Alert>
        </Container>
      )}
      <Container className="px-4">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GO!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Button>
        </InputGroup>
      </Container>
      <Container className="px-4">
        <Table size="sm" bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Title</th>
              <th>Tags</th>
              <th>Description</th>
              <th>Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!error &&
              dbData &&
              dbData.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    {item.tags.map((tag) => (
                      <span key={tag.id}>
                        {tag.name}
                        <br />
                      </span>
                    ))}
                  </td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="primary"
                        onClick={() => handleView(index)}
                      >
                        View
                      </Button>
                      <Button
                        className="mx-3"
                        variant="warning"
                        onClick={() => handleUpdate(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="d-flex pt-5">
          <div className="ms-auto" style={{ paddingLeft: "5rem" }}>
            <Pagination>{items}</Pagination>
          </div>
          <div className="ms-auto" style={{ width: "5rem" }}>
            <PageSizeDropdown
              pageSize={pageSize}
              onChangePageSize={(selectedValue) => setPageSize(selectedValue)}
            />
          </div>
        </div>
        {page && (
          <Pagination>
            <CustomPagination
              totalPages={page.totalPages}
              currentPage={page.number}
              handlePageSelect={handlePageSelect}
            />
          </Pagination>
        )}
      </Container>
    </>
  );
};

export default Certificates;

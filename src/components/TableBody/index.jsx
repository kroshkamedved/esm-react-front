import React from "react";
import Button from "react-bootstrap/Button";

const CertificatesTableBody = ({
  dbData,
  handleDelete,
  handleView,
  handleUpdate,
  error,
}) => {
  return (
    <tbody>
      {!error &&
        dbData &&
        dbData.map((item, index) => (
          <tr key={item.id}>
            <td>{item.createDate}</td>
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
                <Button variant="primary" onClick={() => handleView(index)}>
                  View
                </Button>
                <Button
                  className="mx-3"
                  variant="warning"
                  onClick={() => handleUpdate(index)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default CertificatesTableBody;

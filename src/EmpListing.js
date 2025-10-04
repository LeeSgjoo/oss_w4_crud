/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const EmpListing = () => {
  const [empdata, setEmpdata] = useState(null);
  // const navigate = useNavigate();

  // LoadDetail 함수와 LoadEdit 함수를 제거했습니다.
  
  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("https://68e126f893207c4b47966580.mockapi.io/db/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetch("https://68e126f893207c4b47966580.mockapi.io/db")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setEmpdata(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="employee/create" className="btn btn-success">
              Add New (+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Address</td>
                <td>Department</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{itme.department}</td>

                    <td>
                      {/* Edit 버튼: LoadEdit 함수 대신 to 속성으로 경로 직접 연결 */}
                      <Link
                        to={`/employee/edit/${item.id}`}
                        className="btn btn-success"
                      >
                        Edit
                      </Link>
                      {/* Remove 버튼: a 태그와 onClick 사용 */}
                      <a
                        onClick={() => {
                          Removefunction(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        Remove
                      </a>
                      {/* Details 버튼: LoadDetail 함수 대신 to 속성으로 경로 직접 연결 */}
                      <Link
                        to={`/employee/detail/${item.id}`}
                        className="btn btn-primary"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
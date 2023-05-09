import React, { useEffect, useState, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { NavLink } from "react-router-dom";
import { adddata, deletedata, updatedata } from "./context/ContextProvider";
import "../App.css";

const Home = () => {
  const truncateText = {
    maxWidth: "50px", // Adjust the max width as per your requirements
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const [getuserdata, setUserdata] = useState([]);
  const { udata, setUdata } = useContext(adddata);
  const { updata, setUPdata } = useContext(updatedata);
  const { dltdata, setDLTdata } = useContext(deletedata);

  console.log(getuserdata);

  const getdata = async (e) => {
    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("error");
      console.log("error ");
    } else {
      setUserdata(data);
      console.log("data Fetched");
    }
  };

  useEffect(() => {
    getdata();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUdata, setUPdata, setDLTdata]);

  const deleteuser = async (id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("User Deleted Successfully !");
      setDLTdata(deletedata);
      getdata();
    }
  };

  
  useEffect(() => {
    // Remove the udata after 5 seconds
    if (udata) {
      const timer = setTimeout(() => {
        setUdata(null);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [udata]);

  useEffect(() => {
    // Remove the updata after 5 seconds
    if (updata) {
      const timer = setTimeout(() => {
        setUPdata(null);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [updata]);

  useEffect(() => {
    // Remove the dltdata after 5 seconds
    if (dltdata) {
      const timer = setTimeout(() => {
        setDLTdata(null);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [dltdata]);


  return (
    <>
      {udata && (
        <div key="success-alert">
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{udata.name}</strong> Added Successfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}  

      {updata && (
        <div key="update-alert">
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{updata.name}</strong> Updated Successfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}

      {dltdata && (
        <div key="delete-alert">
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>{dltdata.name}</strong> Deleted Successfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}

      <div className="mt-5">
        <div className="container1 ">
          <div className="add_btn mt-2">
            <NavLink to="/register" className="btn btn-primary">
              Add Data
            </NavLink>
          </div>
          <table className="table mt-2">
            <thead>
              <tr className="table-dark">
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Contact</th>
                <th scope="col">Residential Address</th>
                <th scope="col">Current_Edu</th>
                <th scope="col">Background</th>
                <th scope="col">SM-Links</th>
                <th scope="col">DOB</th>
                <th scope="col">P-Desc</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.map((element, id) => {
                return (
                  <React.Fragment key={element._id}>
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td style={truncateText}>{element.name}</td>
                      <td style={truncateText}>{element.contact}</td>
                      <td style={truncateText}>{element.address}</td>
                      <td style={truncateText}>{element.edu}</td>
                      <td style={truncateText}>{element.familyBg}</td>
                      <td style={truncateText}>{element.sm_links}</td>
                      <td style={truncateText}>{element.dob}</td>
                      <td style={truncateText}>{element.desc}</td>
                      <td className="d-flex justify-content-between">
                        <NavLink to={`view/${element._id}`}>
                          <button className="btn btn-success">
                            <RemoveRedEyeIcon />
                          </button>
                        </NavLink>

                        <NavLink to={`edit/${element._id}`}>
                          <button className="btn btn-primary">
                            <CreateIcon />
                          </button>
                        </NavLink>
                        <button
                          onClick={() => deleteuser(element._id)}
                          className="btn btn-danger"
                        >
                          <RemoveCircleIcon />
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;

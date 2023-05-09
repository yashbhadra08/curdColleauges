import React, { useEffect, useState, useContext } from "react";
import CreateIcon from "@mui/icons-material/Create";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import userImg from "../Assets/user.png";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import "../App.css";
import { adddata, deletedata, updatedata } from "./context/ContextProvider";

const Details = () => {
  const { setDLTdata } = useContext(deletedata);
  const { setUdata } = useContext(adddata);
  const { setUPdata } = useContext(updatedata);

  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const { id } = useParams("");
  console.log(id);

  const navigate = useNavigate();

  const getdata = async () => {
    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
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
      alert("User Deleted Successfully !");
      setDLTdata(deletedata);
      navigate("/");
    }
  };

  return (
    <div className="container mt-3">
      <Card style={{ maxWidth: 1920 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${getuserdata._id}`}>
              <button className="btn btn-primary mx-2">
                <CreateIcon />
              </button>
            </NavLink>
            <button
              onClick={() => deleteuser(getuserdata._id)}
              className="btn btn-danger"
            >
              <RemoveCircleIcon />
            </button>
          </div>

          <div className="row">
            <div className="userApiImage">
              <div className="userImage">
                <img src={userImg} alt="Img"/>
              </div>
            </div>
            <div className="userData">
              <h3>
                Name: <span>{getuserdata.name}</span>
              </h3>
              <h3>
                Contact: <span>{getuserdata.contact}</span>
              </h3>
              <h3>
                Address: <span>{getuserdata.address}</span>
              </h3>
              <h3>
                Edu: <span>{getuserdata.edu}</span>
              </h3>
            </div>
            <div className="userDetails">
              <h3>
                FamilyBg: <span>{getuserdata.familyBg}</span>
              </h3>
              <h3>
                Sm_Links: <span>{getuserdata.sm_links}</span>
              </h3>
              <h3>
                DOB: <span>{getuserdata.dob}</span>
              </h3>
              <h3>
                Personal Desc: <span>{getuserdata.desc}</span>
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;

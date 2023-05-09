import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adddata } from "./context/ContextProvider";

const Register = () => {
  const { setUdata } = useContext(adddata);

  const navigate = useNavigate("");

  const [inpval, setINP] = useState({
    name: "",
    contact: "",
    address: "",
    edu: "",
    familyBg: "",
    sm_links: "",
    dob: "",
    desc: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();
  
    const { name, contact, address, edu, familyBg, sm_links, dob, desc } = inpval;
  
    if (!name || !contact || !address || !edu || !familyBg || !sm_links || !dob || !desc) {
      alert("Please fill in all the required fields.");
      return;
    }
  
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        contact,
        address,
        edu,
        familyBg,
        sm_links,
        dob,
        desc,
      }),
    });
  
    const data = await res.json();
  
    if (res.status === 422 || !data) {
      alert("This user is already registered.");
      return;
    }
  
    alert("User added successfully.");
    setUdata(data);
    navigate("/");
  };

  return (
    <div className="container">
      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              name="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Contact
            </label>
            <input
              type="number"
              value={inpval.contact}
              onChange={setdata}
              name="contact"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              R_Address
            </label>
            <input
              type="text"
              value={inpval.address}
              onChange={setdata}
              name="address"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              C_Edu
            </label>
            <input
              type="text"
              value={inpval.edu}
              onChange={setdata}
              name="edu"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Family_Bg
            </label>
            <input
              type="text"
              value={inpval.familyBg}
              onChange={setdata}
              name="familyBg"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              SM_links
            </label>
            <input
              type="text"
              value={inpval.sm_links}
              onChange={setdata}
              name="sm_links"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              DOB
            </label>
            <input
              type="date"
              value={inpval.dob}
              onChange={setdata}
              name="dob"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Personal_Desc
            </label>
            <textarea
              name="desc"
              value={inpval.desc}
              onChange={setdata}
              id=""
              cols="30"
              rows="5"
              className="form-control"
            ></textarea>
          </div>
          <button type="submit" onClick={addinpdata} className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

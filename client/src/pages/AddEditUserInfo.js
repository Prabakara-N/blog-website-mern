import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBSpinner,
  MDBTooltip,
} from "mdb-react-ui-kit";
import FileBase from "react-file-base64";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addUserInfo, setDelete } from "../redux/features/authSlice";
import { MdDelete } from "react-icons/md";
import noUser from "../assets/images/user.png";

const AddEditUserInfo = () => {
  const { user, userInfo, loading } = useSelector((state) => ({
    ...state.auth,
  }));

  const initialState = {
    name: user?.result?.name,
    bio: "",
    imageFile: null,
  };
  const [userData, setUserData] = useState(initialState);
  const { name, bio, imageFile } = userData;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {});

  useEffect(() => {
    if (id) {
      if (user?.result?._id === id) {
        setUserData({ ...userInfo });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && bio.trim()) {
      if (id) {
        const updatedData = { ...userData };
        dispatch(addUserInfo({ updatedData, id, navigate, toast }));
      }
    } else {
      toast.error("Please fill the required fields");
    }
  };

  const handleDelete = () => {
    dispatch(setDelete());
    setUserData({ ...userData, imageFile: null });
  };

  return (
    <div className="user-main mt-5">
      <MDBCard
        className="user-card"
        style={{
          color: "#e9eaeb",
          backgroundColor: "#e9eaeb",
        }}
      >
        <MDBCardBody>
          <div className="text-center">
            {user?.result?.imageFile || userInfo?.imageFile || imageFile ? (
              <div className="user-pic mx-auto imgFile position-relative">
                <img
                  src={
                    user?.result?.imageFile || userInfo?.imageFile || imageFile
                  }
                  alt="user-profile"
                  className="user-pic"
                />
                <MDBTooltip title="Delete" placement="right" tag="a">
                  <MdDelete
                    onClick={handleDelete}
                    className="delete-icon position-absolute"
                  />
                </MDBTooltip>
              </div>
            ) : (
              <>
                <label htmlFor="userpic">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <div className="bg-dark user-pic">
                      <img src={noUser} alt="noUser" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) =>
                        setUserData({ ...userData, imageFile: base64 })
                      }
                    />{" "}
                  </div>
                </label>
              </>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column gap-2 align-items-center justify-content-center"
          >
            <label htmlFor="name" style={{ color: "black" }}>
              Name :
            </label>
            <input
              placeholder="Enter Title"
              type="text"
              value={name || user?.result?.name}
              name="title"
              id="name"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="form-control"
              validation="Please provide title"
            />
            <label htmlFor="bio" style={{ color: "black" }}>
              Bio :
            </label>
            <textarea
              placeholder="Bio"
              type="text"
              value={bio}
              name="bio"
              id="bio"
              onChange={(e) =>
                setUserData({ ...userData, bio: e.target.value })
              }
              className="form-control"
              rows={4}
              cols={5}
              validation="Please provide description"
            />
            <MDBBtn type="submit">
              {loading && (
                <MDBSpinner
                  size="sm"
                  role="status"
                  tag="span"
                  className="me-2"
                />
              )}
              {loading ? "Saving ..." : "Save"}
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditUserInfo;

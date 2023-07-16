import React, { useEffect, useState } from "react";
import { MDBCard, MDBCardBody, MDBBtn } from "mdb-react-ui-kit";
import FileBase from "react-file-base64";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addUserInfo } from "../redux/features/authSlice";

const AddEditUserInfo = () => {
  const { user, userInfo } = useSelector((state) => ({ ...state.auth }));
  const initialStae = {
    name: user.result.name,
    bio: user.result.bio,
    imageFile: user.result.imageFile,
  };
  const [userData, setUserData] = useState(initialStae);
  const { name, bio, imageFile } = userData;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {});

  useEffect(() => {
    if (id) {
      if (userInfo._id === id) {
        setUserData({ ...userInfo });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && bio) {
      if (id) {
        const updatedData = { ...userData };
        dispatch(addUserInfo({ updatedData, id, navigate }));
      }
    } else {
      toast.error("Please fill the required fields");
    }
  };

  return (
    <div className="user-main mt-5">
      <MDBCard className="user-card">
        <MDBCardBody>
          <div className="text-center">
            {imageFile ? (
              <div className="user-pic mx-auto imgFile">
                <img src={imageFile} alt="user-profile" className="user-pic" />
              </div>
            ) : (
              <>
                <label htmlFor="userpic">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <div className="bg-dark user-pic"></div>
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
            <input
              placeholder="Enter Title"
              type="text"
              value={name}
              name="title"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="form-control"
              validation="Please provide title"
            />
            <textarea
              placeholder="Bio"
              type="text"
              value={bio}
              name="bio"
              onChange={(e) =>
                setUserData({ ...userData, bio: e.target.value })
              }
              className="form-control"
              rows={4}
              cols={5}
              validation="Please provide description"
            />
            <MDBBtn type="submit">Save</MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditUserInfo;

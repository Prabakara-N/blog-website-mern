import React, { useEffect } from "react";
import noUser from "../assets/images/user.png";
import { MDBCard, MDBCardBody, MDBBtn, MDBCardImage } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserInfo } from "../redux/features/authSlice";

const UserInfo = () => {
  const { user, userInfo } = useSelector((state) => ({ ...state.auth }));
  console.log(user);
  console.log(userInfo);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getUserInfo(id));
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="user-main mt-5">
      <MDBCard className="user-card">
        <MDBCardBody>
          <div className="text-center" style={{ marginTop: "-7.5rem" }}>
            <MDBCardImage
              src={userInfo?.imageFile || noUser}
              alt="user-pic"
              className="text-center user-pic"
            />
          </div>
          <div className="text-center d-flex flex-column align-items-center justify-content-center gap-2 mt-3">
            <h2 className="user-details name">{userInfo?.name}</h2>
            <p className="user-details">{user.result.email}</p>
            <p className="user-details bio">{userInfo?.bio || "Add Bio"}</p>
          </div>
          <div className="d-flex  align-items-center justify-content-between mt-1">
            <Link to={`/addeditinfo/${user.result._id}`}>
              <MDBBtn>Edit Profile</MDBBtn>
            </Link>
            <Link to={`/`}>
              <MDBBtn color="success">Done</MDBBtn>
            </Link>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default UserInfo;

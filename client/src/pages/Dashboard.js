import React, { useEffect, useState } from "react";
import noBlog from "../assets/images/blog.jpg";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBlog, getBlogsByUser } from "../redux/features/blogSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { ModelDelete } from "../components";

const Dashboard = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userBlogs, loading } = useSelector((state) => ({ ...state.blog }));
  const userId = user?.result?._id;
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleShow = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    if (userId) {
      dispatch(getBlogsByUser(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + " ...";
    }
    return str;
  };

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = (id) => {
    dispatch(deleteBlog({ id, toast }));
    setIsModalOpen(false);
  };

  return (
    <div
      className="dashboard-card"
      style={{
        margin: "0 auto",
        maxWidth: "900px",
      }}
    >
      {userBlogs.length === 0 && (
        <h3>No blogs available with the user: {user?.result?.name}</h3>
      )}

      {userBlogs.length > 0 && (
        <>
          <h5 className="text-center">Dashboard: {user?.result?.name}</h5>
          <hr style={{ maxWidth: "570px" }} />
        </>
      )}

      {userBlogs &&
        userBlogs.map((item) => (
          <MDBCardGroup key={item._id}>
            <MDBCard
              style={{ maxWidth: "600px", minWidth: "350px" }}
              className="mt-2"
            >
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    src={item.imageFile || noBlog}
                    alt={item.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {item.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      <small className="text-muted">
                        {excerpt(item.description)}
                      </small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    >
                      <ModelDelete
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        toggleShow={toggleShow}
                        handleDelete={handleDelete}
                        id={item._id}
                      />
                      <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                          onClick={toggleShow}
                        />
                      </MDBBtn>
                      <Link to={`/editBlog/${item._id}`}>
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "#55acee", marginLeft: "10px" }}
                          size="lg"
                        />
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  );
};

export default Dashboard;

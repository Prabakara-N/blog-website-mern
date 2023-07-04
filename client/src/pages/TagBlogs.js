import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import noBlog from "../assets/images/blog.jpg";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsByTag } from "../redux/features/blogSlice";
import { excerpt } from "../utility";

const TagBlogs = () => {
  const { tagBlogs, loading } = useSelector((state) => ({ ...state.blog }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      dispatch(getBlogsByTag(tag));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      className="blog-card"
      style={{
        padding: "20px",
        maxWidth: "900px",
      }}
    >
      <h3 className="text-center">Blogs with tag: {tag}</h3>
      <hr style={{ maxWidth: "570px" }} />
      {tagBlogs &&
        tagBlogs.map((item) => (
          <MDBCardGroup key={item._id}>
            <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
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
                      {excerpt(item.description, 40)}
                    </MDBCardText>
                    <div style={{ float: "left", marginTop: "-10px" }}>
                      <MDBBtn
                        size="sm"
                        rounded
                        color="info"
                        onClick={() => navigate(`/blog/${item._id}`)}
                      >
                        Read More
                      </MDBBtn>
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

export default TagBlogs;

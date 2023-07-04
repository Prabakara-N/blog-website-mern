import React, { useEffect } from "react";
import noBlog from "../assets/images/blog.jpg";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getRelatedBlogs, getBlog } from "../redux/features/blogSlice";
import { DisqusThread, RelatedBlogs } from "../components";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const { blog, relatedBlogs } = useSelector((state) => ({ ...state.blog }));
  const { id } = useParams();
  const tags = blog?.tags;

  useEffect(() => {
    tags && dispatch(getRelatedBlogs(tags));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  useEffect(() => {
    if (id) {
      dispatch(getBlog(id));
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      <MDBContainer>
        <MDBCard className="mb-3 mt-5">
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "600px" }}
            src={blog.imageFile || noBlog}
            alt={blog.title}
          />
          <MDBCardBody>
            <h3 className="text-center title-blog">{blog.title}</h3>
            <span>
              <p className="text-start tourName">Created By: {blog.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {blog && blog.tags && blog.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(blog.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {blog.description}
            </MDBCardText>
          </MDBCardBody>
          <RelatedBlogs relatedBlogs={relatedBlogs} blogId={id} />
        </MDBCard>
        <DisqusThread id={id} title={blog.title} path={`/blog/${id}`} />
      </MDBContainer>
    </>
  );
};

export default SingleBlog;

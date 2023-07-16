import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, setCurrentPage } from "../redux/features/blogSlice";
import { useLocation } from "react-router-dom";
import { CardBlog, Pagination, Spinner, Footer } from "../components";
import { getUserInfo } from "../redux/features/authSlice";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const { blogs, loading, currentPage, numberOfPages } = useSelector(
    (state) => ({
      ...state.blog,
    })
  );
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();

  useEffect(() => {
    dispatch(getBlogs(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const { userInfo } = useSelector((state) => ({ ...state.auth }));
  console.log(userInfo);

  useEffect(() => {
    if (userInfo._id) {
      dispatch(getUserInfo(userInfo._id));
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo._id]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div
      className="d-flex flex-column justify-content-between align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        style={{
          margin: "2rem auto",
          padding: "15px",
          maxWidth: "1200px",
          alignContent: "center",
        }}
      >
        <MDBRow className="mt-5">
          {blogs.length === 0 && location.pathname === "/" && (
            <MDBTypography className="text-center mb-0" tag="h2">
              No Blogs Found
            </MDBTypography>
          )}

          {blogs.length === 0 && location.pathname !== "/" && (
            <MDBTypography className="text-center mb-0" tag="h2">
              We couldn't find any matches for "{searchQuery}"
            </MDBTypography>
          )}

          <MDBCol>
            <MDBContainer>
              <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                {blogs &&
                  blogs.map((item) => <CardBlog key={item._id} {...item} />)}
              </MDBRow>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
        {blogs.length > 0 && !searchQuery && (
          <Pagination
            setCurrentPage={setCurrentPage}
            numberOfPages={numberOfPages}
            currentPage={currentPage}
            dispatch={dispatch}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBValidation, MDBBtn } from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, updateBlog } from "../redux/features/blogSlice";
import { Spinner } from "../components";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditBlog = () => {
  const [blogData, setBlogData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const { error, userBlogs, loading } = useSelector((state) => ({
    ...state.blog,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, tags } = blogData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleTour = userBlogs.find((tour) => tour._id === id);
      setBlogData({ ...singleTour });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tags.length) {
      setTagErrMsg("Please provide some tags");
    }
    if (title && description && tags) {
      const updatedBlogData = { ...blogData, name: user?.result?.name };

      if (!id) {
        dispatch(createBlog({ updatedBlogData, navigate, toast }));
      } else {
        dispatch(updateBlog({ id, updatedBlogData, toast, navigate }));
      }
      handleClear();
    } else {
      toast.error("All the fields are mandatory");
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleAddTag = (tag) => {
    setTagErrMsg(null);
    setBlogData({ ...blogData, tags: [...blogData.tags, tag] });
  };

  const handleDeleteTag = (deleteTag) => {
    setBlogData({
      ...blogData,
      tags: blogData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const handleClear = () => {
    setBlogData({ title: "", description: "", tags: [] });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "500px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>{id ? "Update Blog" : "Add Blog"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <input
                placeholder="Enter Title"
                type="text"
                value={title || ""}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                validation="Please provide title"
              />
            </div>
            <div className="col-md-12">
              <textarea
                placeholder="Enter Description"
                type="text"
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                rows={4}
                cols={5}
                validation="Please provide description"
              />
            </div>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
              {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>}
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setBlogData({ ...blogData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditBlog;

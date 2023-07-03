import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import { Header, PrivateRoute } from "./components";
import {
  AddEditBlog,
  Dashboard,
  Home,
  Login,
  NotFound,
  Register,
  SingleBlog,
  TagBlogs,
} from "./pages";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/search" element={<Home />} />
          <Route path="/blogs/tag/:tag" element={<TagBlogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addBlog"
            element={
              <PrivateRoute>
                <AddEditBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/editBlog/:id"
            element={
              <PrivateRoute>
                <AddEditBlog />
              </PrivateRoute>
            }
          />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

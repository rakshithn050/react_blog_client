import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Layout from "./layouts/Layout";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import Post from "./pages/Post";
import ScrollToTop from "./components/ScrollToTop";
import SearchResult from "./pages/SearchResult";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<SignIn />} />
            <Route path="register" element={<SignUp />} />
            <Route path="contact" element={<Contact />} />
            <Route path="search" element={<SearchResult />} />
            <Route element={<PrivateRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="createPost" element={<CreatePost />} />
              <Route path="updatePost/:postID" element={<UpdatePost />} />
            </Route>
            <Route path="post/:postSlug" element={<Post />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

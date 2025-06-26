import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Mainroutes/Router";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ top: "10vh" }}
      />{" "}
    </>
  );
};

export default App;

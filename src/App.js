import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Mainroutes/Router";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
};

export default App;
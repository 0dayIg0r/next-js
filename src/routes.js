import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Repository from "./pages/Repository";

const ReactRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/repository/:repository" element={<Repository />} />
        <Route path="*"/>
      </Routes>
    </BrowserRouter>
  );
};

export default ReactRouter;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import Timer from "./Timer.jsx";
import Index from "./Index.jsx";
import Test from "./Test.jsx";
import Add from "./Add.jsx";
import AdminIndex from "./AdminIndex.jsx";
import Login from "./Login.jsx";
import NotFound from "./NotFound.jsx";
import Admin from "./admin.jsx";
import Live from "./Live.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Live />} />
        <Route path="/test" element={<Test />} />
        <Route path="/index" element={<Index />} />
        <Route path="/app/:id" element={<App />} />
        <Route path="/add" element={<Add />} />
        <Route path="/admin/index" element={<AdminIndex />} />
        <Route path="/admin/:id" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

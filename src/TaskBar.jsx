import { NavLink, BrowserRouter, Routes, Route } from "react-router-dom";
import "./TaskBar.css";
export default function TaskBar() {
  return (
    <div className="container-fluid bgTask">
      <div className="row">
        <div className="col">
          <NavLink style={{ textDecoration: "none" }} to="/index">
            ScoreBoard
          </NavLink>
        </div>
        <div className="col">
          <NavLink style={{ textDecoration: "none" }} to="/">
            Live
          </NavLink>
        </div>
        <div className="col">
          <NavLink style={{ textDecoration: "none" }} to="/index">
            Schedule
          </NavLink>
        </div>
      </div>
    </div>
  );
}

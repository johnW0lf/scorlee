import logo from "./assets/sportlee_white_big.png";
import { NavLink } from "react-router-dom";
import "./Titlebar.css";

export default function TitleBar() {
  return (
    <div className="container-fluid boxLogo">
      <div className="row ">
        <div className=" col-6">
          <img src={logo} alt="logo" className="logo" height={40} width={40} />
        </div>
        <div className="col-6">
          <div className="row linkSet">
            <div className="col-6 live_text">
              <NavLink className="nav-link" to="/">
                Live
              </NavLink>
            </div>
            <div className="col-6 schedule_text">
              <NavLink className="nav-link" to="/admin/index">
                Update Score
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

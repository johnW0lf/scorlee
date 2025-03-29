import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Titlebar from "./Titlebar";
import ScheduleContainer from "./ScheduleContainer";
import Redirect from "./Redirect";
import Loading from "./assets/sportlee_black_big.png";
import Intro from "./Intro";
import "./Live.css";

export default function Live() {
  const [intro, setIntro] = useState(true);
  const [scheduleList, setScheduleList] = useState([]);
  const firebaseURL =
    "https://soccer-team-details-default-rtdb.asia-southeast1.firebasedatabase.app/";
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch(firebaseURL + "schedule.json")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setScheduleList(Object.entries(data)); // Converts to [[key, value], [key, value], ...]
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), 500);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (!scheduleList.length) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        {/* Your content here */}
        <img src={Loading} alt="loading" height={200} width={200} />
      </div>
    );
  }

  if (intro) {
    return <Intro />;
  }

  if (!isMobile) {
    return <Redirect />; // Keep your existing Redirect logic
  }

  return (
    <>
      <div className="titlebar">
        <Titlebar />
      </div>
      <div className="mainBody">
        {/* <TodayDate /> */}
        <div
          style={{
            fontSize: "48px",
          }}
        >
          Scheduled Matches
        </div>
        {scheduleList
          // .filter(
          //   ([_, make]) => make.started === true && make.finished === false
          // )
          .map(([id, make]) => (
            <NavLink
              key={id}
              to={`/app/${id}`}
              style={{ textDecoration: "none" }}
            >
              <ScheduleContainer data={make} />
            </NavLink>
          ))}
      </div>
    </>
  );
}

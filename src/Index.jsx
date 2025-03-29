import { useState, useEffect } from "react";
import Titlebar from "./Titlebar";
import "./index.css";
import IndexContainer from "./indexContainer";

export default function Index() {
  const [test, setData] = useState([]);
  const firebaseURL =
    "https://soccer-team-details-default-rtdb.asia-southeast1.firebasedatabase.app/";

  useEffect(() => {
    fetch(firebaseURL + "schedule.json")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setData(Array.isArray(data) ? data : Object.values(data));
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!test.length) {
    return <h1>Loading...</h1>; // Show loading only when test is empty
  }

  return (
    <>
      <div className="titlebar">
        <Titlebar />
      </div>
      <div className="main_body_index">
        <div
          style={{
            fontSize: "48px",
          }}
        >
          Schedule
        </div>
        {test.map((make, index) => (
          <IndexContainer key={index} data={make} />
        ))}
      </div>
    </>
  );
}

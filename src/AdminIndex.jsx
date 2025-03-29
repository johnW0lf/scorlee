import { useState, useEffect } from "react";
import Titlebar from "./Titlebar";
import ScheduleContainer from "./ScheduleContainer";
import { NavLink } from "react-router-dom";

export default function Index() {
  const [scheduleData, setScheduleData] = useState([]);
  const [keyList, setkeyList] = useState([]);
  const firebaseURL =
    "https://soccer-team-details-default-rtdb.asia-southeast1.firebasedatabase.app/";
  useEffect(() => {
    fetch(firebaseURL + "schedule.json")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setScheduleData(Array.isArray(data) ? data : Object.values(data));
          setkeyList(Object.keys(data));
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const deleteContainer = (identifier) => {
    fetch(`${firebaseURL}schedule/${identifier}.json`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
  };

  if (!scheduleData.length) {
    return <h1>Loading...</h1>; // Show loading only when scheduleData is empty
  }

  return (
    <>
      <Titlebar />
      {scheduleData.map((data, index) => (
        <>
          <NavLink to={`/admin/${keyList[index]}`}>
            <ScheduleContainer key={index} data={data} />
          </NavLink>
          <button onClick={() => deleteContainer(keyList[index])}>
            delete
          </button>
        </>
      ))}
      <NavLink to={"/add"}>
        <button>Add</button>
      </NavLink>
    </>
  );
}

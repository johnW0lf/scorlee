import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const firebaseURL =
  "https://soccer-team-details-default-rtdb.asia-southeast1.firebasedatabase.app/";
function pushFinished(id) {
  fetch(`${firebaseURL}schedule/${id}.json`, {
    // Assuming schedule is an array
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      finished: true,
    }),
  }).catch((error) => console.error("Error updating Firebase:", error));
}
function push(id, phase) {
  const d = new Date();
  const timeData = {
    hour: d.getHours(),
    minute: d.getMinutes(),
    second: d.getSeconds(),
  };
  if (phase == "Halftime") {
    fetch(`${firebaseURL}schedule/${id}.json`, {
      // Assuming schedule is an array
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        started: true,
        started_time: timeData,
        phase: phase,
      }),
    }).catch((error) => console.error("Error updating Firebase:", error));
  } else if (phase == "Stop Game") {
    fetch(`${firebaseURL}schedule/${id}.json`, {
      // Assuming schedule is an array
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        started_time: timeData,
        phase: phase,
      }),
    }).catch((error) => console.error("Error updating Firebase:", error));
  } else {
    fetch(`${firebaseURL}schedule/${id}.json`, {
      // Assuming schedule is an array
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phase: phase,
      }),
    }).catch((error) => console.error("Error updating Firebase:", error));
  }
}

export default function Controlbar() {
  const { id } = useParams();
  const [buttonStatus, setButtonStatus] = useState("Start");
  useEffect(() => {
    fetch(`${firebaseURL}schedule/${id}/phase.json`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setButtonStatus(data);
        }
      });
  }, [id]);
  const statusMap = {
    Start: "Halftime",
    Halftime: "2nd Half",
    "2nd Half": "Stop Game",
    "Stop Game": "match over",
  };

  const handleClick = () => {
    let updatedStatus = statusMap[buttonStatus];
    push(id, updatedStatus);
    setButtonStatus(updatedStatus || "match over");
  };
  if (buttonStatus !== "match over") {
    return <button onClick={handleClick}>{buttonStatus}</button>;
  } else {
    pushFinished(id);
  }
}

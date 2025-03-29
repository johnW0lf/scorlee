import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Timer() {
  const [startedTime, setStartedTime] = useState(null);
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState();
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const { id } = useParams();

  useEffect(() => {
    const firebaseURL =
      "https://soccer-team-details-default-rtdb.asia-southeast1.firebasedatabase.app/";

    fetch(`${firebaseURL}schedule/${id}.json`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data.started) {
            setStartedTime(data.started_time);
            setPhase(data.phase);
            setStarted(true);
          } else {
            return;
          }

          // console.log("Fetched Started Time:", data); // Debugging log
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

    if (!startedTime) return; // Ensure data is available before running the timer

    const updateTimer = () => {
      const date = new Date();
      let currentHours = date.getHours();
      let currentMinutes = date.getMinutes();
      let currentSeconds = date.getSeconds();

      let elapsedHours = currentHours - startedTime.hour;
      let elapsedMinutes = currentMinutes - startedTime.minute;
      let elapsedSeconds = currentSeconds - startedTime.second;

      if (elapsedSeconds < 0) {
        elapsedSeconds += 60;
        elapsedMinutes -= 1;
      }

      if (elapsedMinutes < 0) {
        elapsedMinutes += 60;
        elapsedHours -= 1;
      }

      if (elapsedHours < 0) {
        elapsedHours += 24; // Handles cases where the start time was on the previous day
      }

      elapsedMinutes += elapsedHours * 60; // Convert hours to minutes
      if (started) {
        if (phase == "Start") {
          setTimer({
            minutes: 0,
            seconds: 0,
          });
        } else if (phase == "2nd Half") {
          setTimer({
            minutes: 45,
            seconds: 0,
          });
        } else if (phase == "Stop Game") {
          setTimer({
            minutes: elapsedMinutes + 45,
            seconds: elapsedSeconds,
          });
        } else if (phase == "match over") {
          setTimer({
            minutes: 90,
            seconds: 0,
          });
        } else {
          setTimer({
            minutes: elapsedMinutes,
            seconds: elapsedSeconds,
          });
        }
      } else {
        setTimer({
          minutes: 0,
          seconds: 0,
        });
      }
    };

    updateTimer(); // Initial update
    const interval = setInterval(updateTimer, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [startedTime, phase, id, started]); // Re-run only when `startedTime` is set

  return (
    <span>
      {timer.minutes < 10 ? "0" : ""}
      {timer.minutes}:{timer.seconds < 10 ? "0" : ""}
      {timer.seconds}
    </span>
  );
}

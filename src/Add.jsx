import { useEffect, useState } from "react";
import Titlebar from "./Titlebar";

export default function Add() {
  const [teamDetails, setTeamDetails] = useState({});
  const [selectedTeam1, setSelectedTeam1] = useState("");
  const [selectedTeam2, setSelectedTeam2] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [scheduleName, setScheduleName] = useState("");

  const firebaseURL =
    "https://soccer-team-details-default-rtdb.asia-southeast1.firebasedatabase.app/";

  useEffect(() => {
    // Fetch Team Details
    fetch(`${firebaseURL}team_details.json`)
      .then((response) => response.json())
      .then((response_data) => {
        if (response_data) {
          console.log(response_data);
          setTeamDetails(response_data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Check if all required fields are filled
    if (!selectedTeam1 || !selectedTeam2 || !scheduledTime) {
      alert(
        "Please select both teams and set a scheduled time before submitting!"
      );
      return;
    }

    const matchDetails = {
      details: {},
      score: [0, 0],
      started: false,
      finished: false,
      team_1: selectedTeam1,
      team_2: selectedTeam2,
      scheduled_time: scheduledTime,
      match_name: scheduleName,
    };

    // Reset form fields after submission
    setSelectedTeam1("");
    setSelectedTeam2("");
    setScheduledTime("");

    // Send data to Firebase
    fetch(`${firebaseURL}schedule.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(matchDetails),
    }).catch((error) => console.error("Error updating Firebase:", error));
  }

  return (
    <>
      <Titlebar />
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit}>
              {/* Select Team1 */}
              <select
                id="Team1"
                name="team1"
                value={selectedTeam1}
                onChange={(e) => setSelectedTeam1(e.target.value)}
              >
                <option value="" hidden>
                  Select Team 1
                </option>
                {Object.keys(teamDetails).map((team, index) => (
                  <option value={team} key={index + 1}>
                    {team}
                  </option>
                ))}
              </select>
              {/* Select Team2 */}
              <select
                id="Team2"
                name="team2"
                value={selectedTeam2}
                onChange={(e) => setSelectedTeam2(e.target.value)}
              >
                <option value="" hidden>
                  Select Team 2
                </option>
                {Object.keys(teamDetails).map((team, index) => (
                  <option value={team} key={index + 1}>
                    {team}
                  </option>
                ))}
              </select>
              <div>
                <input
                  type="datetime-local"
                  name="scheduled_time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
                <input
                  type="text"
                  name="scheduled_name"
                  value={scheduleName}
                  onChange={(e) => setScheduleName(e.target.value)}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

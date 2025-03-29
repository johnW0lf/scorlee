import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Controlbar from "./Controlbar";
import Timer from "./Timer";
import Titlebar from "./Titlebar";

export default function Admin() {
  const { id } = useParams();
  //define variables
  const [score, setScore] = useState([0, 0]);
  const [team1, setTeam1] = useState({});
  const [team2, setTeam2] = useState({});
  const [scheduleData, setScheduleData] = useState({});
  const firebaseURL =
    "https://soccer-team-details-default-rtdb.asia-southeast1.firebasedatabase.app/";

  //HandleClick(increment score on clicking player name)
  const handleClick = (teamIndex) => {
    if (!scheduleData) return;
    if (
      scheduleData.started &&
      !scheduleData.finished &&
      scheduleData.phase !== "2nd Half"
    ) {
      const updatedScore =
        teamIndex == 0 ? [score[0] + 1, score[1]] : [score[0], score[1] + 1];
      setScore(updatedScore);
      fetch(`${firebaseURL}schedule/${id}/score.json`, {
        // Assuming schedule is an array
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedScore),
      }).catch((error) => console.error("Error updating Firebase:", error));
    } else {
      alert("match is not currently live");
    }
  };

  useEffect(() => {
    //FETCH schedule from DB
    fetch(`${firebaseURL}schedule/${id}/.json`)
      .then((response) => response.json())
      .then((response_data) => {
        if (response_data) {
          setScheduleData(response_data);
          setScore(response_data.score);
          //Nested
          //FETCH another DB which have team_detials
          fetch(`${firebaseURL}team_details.json`)
            .then((response) => response.json())
            .then((response_team_details) => {
              if (response_team_details) {
                setTeam1(response_team_details[response_data?.team_1]);
                setTeam2(response_team_details[response_data?.team_2]);
              }
            })
            .catch((error) => console.error("Error fetching data:", error));
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  //

  //
  return (
    <div className="background">
      <Titlebar />
      <div className="container-fluid">
        {/* (Parent) */}
        <div className="row">
          <div className="row timer">
            <Timer />
          </div>

          <div className="row">
            {/* Team_1 */}
            <div className="col div-1">
              <div className="row scorebox">{score[0]}</div>
              <div className="row team_name">
                {scheduleData?.team_1 || "N/A"}
              </div>
              <div className="row player_name">
                {team1 &&
                  Object.values(team1).map((data, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleClick(0);
                      }}
                    >
                      {data}
                    </button>
                  ))}
              </div>
            </div>

            {/* Team_2 */}
            <div className="col div-1">
              <div className="row scorebox">{score[1]}</div>
              <div className="row team_name">
                {scheduleData?.team_2 || "N/A"}
              </div>
              <div className="row player_name">
                {team2 &&
                  Object.values(team2).map((data, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleClick(1);
                      }}
                    >
                      {data}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Controlbar />
    </div>
  );
}

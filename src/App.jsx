import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Timer from "./Timer";
import Titlebar from "./Titlebar";
import Scoreboard from "./ScoreBoard";

export default function Admin() {
  const { id } = useParams();
  const [score, setScore] = useState([0, 0]);
  const [team1, setTeam1] = useState({});
  const [team2, setTeam2] = useState({});
  const [scheduleData, setScheduleData] = useState({});
  const ReverseStatusMap = {
    Halftime: "1st Half",
    "2nd Half": "Halftime",
    "Stop Game": "2nd Half",
    "match over": "Game Over",
  };
  const firebaseURL =
    "https://soccer-team-details-default-rtdb.asia-southeast1.firebasedatabase.app/";

  const handleClick = (teamIndex) => {
    if (!scheduleData) return;
    const updatedScore =
      teamIndex === 0 ? [score[0] + 1, score[1]] : [score[0], score[1] + 1];
    setScore(updatedScore);
    fetch(`${firebaseURL}schedule/${id}/score.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedScore),
    }).catch((error) => console.error("Error updating Firebase:", error));
  };

  useEffect(() => {
    fetch(`${firebaseURL}schedule/${id}/.json`)
      .then((response) => response.json())
      .then((response_data) => {
        if (response_data) {
          setScheduleData(response_data);
          setScore(response_data.score);
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

  return (
    <div className="background">
      <div className="titlebar">
        <Titlebar />
      </div>
      <div className="mainBody_app">
        <div className="match_name">{scheduleData?.match_name}</div>
        <div className="half">
          {ReverseStatusMap[scheduleData?.phase] || "Game yet to Start"}
        </div>
        <Scoreboard
          score={score}
          team1={scheduleData?.team_1 || "N/A"}
          team2={scheduleData?.team_2 || "N/A"}
          timer={<Timer />}
        />{" "}
        <h2 className="timeline-title">
          Team's Lineup<span className="timeline-line"></span>
        </h2>
        <div className="lineup container">
          <div className="row">
            <div className="lineup_title">Lineup</div>
            <div className="col-6 border-end border-2">
              <ul className="list-unstyled">
                {team2 &&
                  Object.keys(team1).map((key, index) => (
                    <li key={index} className="d-flex justify-content-between">
                      <span className="text-center">{key}</span>{" "}
                      <span>{team1[key]}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-6">
              <ul className="list-unstyled">
                {team2 &&
                  Object.keys(team2).map((key, index) => (
                    <li key={index} className="d-flex justify-content-between">
                      <span>{key}</span> <span>{team2[key]}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

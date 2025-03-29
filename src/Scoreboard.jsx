import "./Scoreboard.css";
export default function Scoreboard({
  score = [0, 0],
  team1 = "Team 1",
  team2 = "Team 2",
  timer = "00:00",
}) {
  return (
    <div className="scoreboard-container">
      <div className="scoreboard">
        <div className="team">
          <div className="score">{score[0]}</div>
          <p>{team1}</p>
        </div>
        <span className="timer">{timer}</span>
        <div className="team">
          <div className="score">{score[1]}</div>
          <p>{team2}</p>
        </div>
      </div>
    </div>
  );
}

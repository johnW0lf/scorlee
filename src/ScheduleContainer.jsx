import "./scheduleContainer.css";

export default function ScheduleContainer({ data }) {
  return (
    <div className="boxBG position-relative">
      {/* Large Circle at Top-Left */}
      <div className="large-circle"></div>

      <div className="content container-2 text-center">
        <div className="row">
          <div className="col-6">
            <div className="score">{data.score?.[0] || "0"}</div>
            <div className="team_name">{data.team_1 || "N/A"}</div>
          </div>
          <div className="col-6">
            <div className="score">{data.score?.[1] || "0"}</div>
            <div className="team_name">{data.team_2 || "N/A"}</div>
          </div>
        </div>

        {/* Match Status */}
        <div className="divider"></div>
        <div className="status">Live</div>
        <div className="match-stage">Semi-Final</div>
      </div>
    </div>
  );
}

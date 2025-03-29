import "./IndexContainer.css";

export default function IndexContainer({ data }) {
  return (
    <div className="boxBG_i position-relative">
      {/* Large Circle at Top-Left */}
      <div className="content  text-center">
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
      </div>
    </div>
  );
}

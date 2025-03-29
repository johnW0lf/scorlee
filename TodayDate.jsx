import "./TodayDate.css";
export default function TodayDate() {
  const d = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;

  return <div className="date">{today}</div>;
}

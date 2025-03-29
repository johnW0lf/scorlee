import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Open In A Mobile Device</h1>
      <p style={styles.text}>Oops! Page Not Found</p>
      <p style={styles.description}>
        The page you are looking for is only available on mobile devices
      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
  },
  image: {
    width: "150px",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "80px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  text: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  description: {
    fontSize: "16px",
    color: "gray",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "18px",
    color: "white",
    backgroundColor: "#000",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default NotFound;

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/5641/5641087.png"
        alt="404"
        style={styles.image}
      />
      <h1 style={styles.heading}>404</h1>
      <p style={styles.text}>Oops! Page Not Found</p>
      <p style={styles.description}>
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link to="/" style={styles.button}>
        Go Back Home
      </Link>
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

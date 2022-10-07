import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-4xl">
      <Link to="/home">
        <button className="download-btn  p-5 m-5 inline-block text-center justify-center items-center">
          GET STARTED
        </button>
      </Link>
    </div>
  );
};

export default Home;

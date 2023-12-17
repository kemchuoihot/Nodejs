import { Link, Outlet, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <button className="btn" onClick={() => navigate('/main')}>Go to Main</button>
    )
};

export default Home;
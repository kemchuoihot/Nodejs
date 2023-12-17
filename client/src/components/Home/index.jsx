import { Link, Outlet, useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate('/main')}>Go to Main</button>
    )
};

export default Home;
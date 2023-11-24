import { useState } from 'react';
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

//Modal
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';


const Signup = () => {
    const [username,setusername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const navigte = useNavigate();
    // axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/auth", {username,password})
            .then((result) => {
                if(result.data.loginStatus){
                    navigte("/dashboard");
                }else{
                    setError(result.data.Error);
                }
            })
                

            ;
            // console.log(response);
            // localStorage.setItem("token",response.data);
            // window.location = "/";
        } catch (error) {
            console.log(error);
            
            setError(error.response.data.message);
        }
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                <form className={styles.form_container}>
                    <h1>Welcome to POS !</h1>
                    <span>Use your account to login.</span>
                    <input type="username" placeholder="Username" name="username" onChange={(e) => setusername(e.target.value)} value={username} required className={styles.input} />
                    <input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} required className={styles.input} />
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <a>Forget your password ?</a>
                    <button type='submit' className={styles.green_btn} onClick={(e)=> handleSubmit(e)}>
                        Sign In
                    </button>
                </form>
                </div>
                <div className={styles.right}>
                    <h1>Xin chao!</h1>
                    <span>You can login with your username. If you don't have account, please contact to admin.</span>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>Sign up</button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Signup;
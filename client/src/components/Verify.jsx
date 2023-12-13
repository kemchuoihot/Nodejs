import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Verify = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            handleChangeStatus(token);
        } 
    }, []);

    const handleChangeStatus = async (token) => {
        try {
            const response = await axios.get(`http://localhost:5000/verify/${token}`).catch((err) => {console.log(err);});
            console.log(response.data);
            setResponse(response.data);
        } catch (error) {
            console.error(error);
            // If the verification fails, redirect to an error page
            // window.location.href = 'https://example.com/error';
        }
    };

    return (
        <h1>{response && response.message}</h1>
    );
};

export default Verify;
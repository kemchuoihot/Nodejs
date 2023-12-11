import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Verify = () => {
    const [employeeId, setEmployeeId] = useState('');

    useEffect(() => {
        // Thực hiện chuyển trang tại đây
        window.location.href = 'https://example.com';
    }, []);

    const handleChangeStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/verify:${token}`, {
                // employeeId: employeeId,
                // status: 'active',
            });
            console.log(response.data); // Handle the response as needed
        } catch (error) {
            console.error(error);
        }
    };

    return (
        handleChangeStatus()
    );
};

export default Verify;

const Account = require('../models/Account');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/:token', (req, res) => {
    const { token } = req.params;

    // Verify the token
    jwt.verify(token,process.env.JWTPRIVATEKEY, (err, decoded) => {
        console.log(decoded)
        // if (err) {
        //     // Handle invalid token
        //     res.status(401).json({ message: 'Invalid token' });
        // } else {
        //     // Update the user's status to "active"
        //     // Your implementation here...
        //     // For example, you can update the user's status in the database

        //     // Send a response indicating success
        //     res.status(200).json({status: true},{ message: 'User verified successfully' });
        // }
    });
});

module.exports = router;

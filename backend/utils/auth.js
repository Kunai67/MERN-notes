// Authentication Middleware
const express = require('express');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    // Check if request has auth-token
    const token = req.header('auth-token');

    if (!token) return res.status(401).json({ message: 'Access Denied' });

    // Check if token is valid
    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        if (!data) return res.status(401).json({ message: 'Invalid or tampered token' });

        req.user = data;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }

    
}

module.exports = auth;
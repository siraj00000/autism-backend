const { Router } = require("express");
const Advice = require("../models/advicesSchema")
const appRoutes = Router();

appRoutes.get('/parents/advices', async (req, res) => {
    try {
        const advice = await Advice.find();
        
        res.status(200).json({
            message: "Advice Data",
            data: advice
        });
    } catch (error) {
        console.error('Failed to fetch advice:', error);
        res.status(500).json({ message: 'Failed to fetch advice' });
    }
})

module.exports = appRoutes

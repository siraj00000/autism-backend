const { Router } = require("express");
const Advice = require("../models/advicesSchema");
const HighCenter = require("../models/highCenterSchema");
const Center = require("../models/centerSchema");
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

appRoutes.get('/parents/centers', async (req, res, next) => {
    try {
        const centers = await Center.find();
        res.status(200).json({
            message: "center's data",
            data: centers
        });
    } catch (error) {
        console.error('Failed to fetch centers:', error);
        res.status(500).json({ message: 'Failed to fetch centers' });
    }
})

appRoutes.get('/parents/high_centers', async (req, res, next) => {
    try {
        const highCenters = await HighCenter.find();
        res.status(200).json({
            message: "High center's data",
            data: highCenters
        });
    } catch (error) {
        console.error('Failed to fetch centers:', error);
        res.status(500).json({ message: 'Failed to fetch centers' });
    }
})

module.exports = appRoutes

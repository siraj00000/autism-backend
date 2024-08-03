const { Router } = require("express");

const appRoutes = Router();

appRoutes.get('/parents/advices', async (req, res) => {

    const advices = [
        { "advice": "Always be kind to others." },
        { "advice": "Take time to rest and recharge." },
        { "advice": "Stay curious and keep learning." },
        { "advice": "Practice gratitude daily." },
        { "advice": "Stay true to your values." },
        { "advice": "Set realistic goals and work towards them." },
        { "advice": "Embrace change and be adaptable." },
        { "advice": "Listen more than you speak." },
        { "advice": "Take care of your health and well-being." },
        { "advice": "Build and maintain strong relationships." },
        { "advice": "Be mindful and present in the moment." },
        { "advice": "Don't be afraid to ask for help." },
        { "advice": "Take responsibility for your actions." },
        { "advice": "Celebrate small victories." },
        { "advice": "Learn from your mistakes." },
        { "advice": "Stay positive and optimistic." },
        { "advice": "Be patient and persistent." },
        { "advice": "Value your time and use it wisely." },
        { "advice": "Focus on what you can control." },
        { "advice": "Believe in yourself and your abilities." }
    ]

    res.status(200).json({
        message: "Advices Data",
        data: advices
    })
})

module.exports = appRoutes

const jwt = require('jsonwebtoken');

const User = require('../models/event-model');

const CreateEvent = async (req, res, next) => {
    console.log(req.body.payload);
    const { eventName,
        eventDate,
        eventTime,
        eventDuration,
        eventLocation,
        eventguest,
        eventNotification,
        eventReminder,
        eventUpload } = req.body.payload;

    const createdUser = new User({
        eventName,
        eventDate,
        eventTime,
        eventDuration,
        eventLocation,
        eventguest,
        eventNotification,
        eventReminder,
        eventUpload
    });

    try {
        await createdUser.save();
    }
    catch (err) {
        console.log(err);
        return res.json({
            "message": "Something went wrong!"
        })
    }

    res.status(200).json({
        message: "Event stored successfully!"
    });
}

const list = async (req, res, next) => {
    let users;

    try {
        users = await User.find();
    }
    catch (err) {
        return res.json({
            "message": " Cant find users"
        })
    }

    res.status(200).json({ users: users.map(user => user.toObject({ getters: true })) });
}

exports.CreateEvent = CreateEvent;
exports.list = list;
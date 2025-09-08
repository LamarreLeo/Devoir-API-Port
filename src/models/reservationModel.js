const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
    {
        catwayNumber: {
            type: Number,
            required: true,
            trim: true,
        },
        clientName: {
            type: String,
            required: true,
            trim: true,
        },
        boatName: {
            type: String,
            required: true,
            trim: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Reservation", ReservationSchema);

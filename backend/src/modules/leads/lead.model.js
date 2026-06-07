import mongoose from "mongoose";

import {
    LEAD_STATUS,
    LEAD_STATUS_VALUES,
    LEAD_SOURCES,
} from "../../utils/constants.js";

const noteSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const leadSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        phone: {
            type: String,
            trim: true,
        },

        company: {
            type: String,
            trim: true,
        },

        source: {
            type: String,
            enum: LEAD_SOURCES,
            default: "website",
        },

        status: {
            type: String,
            enum: LEAD_STATUS_VALUES,
            default: LEAD_STATUS.NEW,
        },

        dealValue: {
            type: Number,
            default: 0,
            min: 0,
        },

        notes: [noteSchema],

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        lastContactedAt: {
            type: Date,
            default: null,
        },

        isPublicLead: {
            type: Boolean,
            default: false,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Secondary indexes
leadSchema.index({
    status: 1,
});

leadSchema.index({
    source: 1,
});

leadSchema.index({
    company: 1,
});

leadSchema.index({
    createdAt: -1,
});

// Full-text search
leadSchema.index({
    fullName: "text",
    email: "text",
    company: "text",
});

const Lead = mongoose.model(
    "Lead",
    leadSchema
);

export default Lead;
const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const ComponentSchema = new Schema(
    {
        movement: {
            type: String,
            required: [true, 'Please enter a movement.']
        }, 
        repetitions: {
            type: String,
            required: [true, 'How many times, or how long, should we do this?']
        },
        prescribed: {
            type: String,
        }
    },
    {
        usePushEach : true
    }
)

const WorkoutSchema = new Schema(
    {
        workoutName: {
            type: String,
            required: [true, 'What should we call this?']
        },
        createdBy: {
            type: String,
            required: [true, 'We want to know who to thank for this workout.']
        },
        goal: {
            type: String,
            required: [true, 'We need a goal: time, reps, rounds, etc.']
        },
        description: {
            type: String,
        },
        workoutComponent: [ComponentSchema]
        
    },
    {
        timestamps: {},
        usePushEach : true
    }
)

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: [true, 'This is required. We need to know what to call you.'],
            unique: [true, 'There is already someone with that user name.']
        },
        firstName: {
            type: String,
            required: [true, 'Your first name is required.']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required.']
        },
        email: {
            type: String,
        },
        userTwitterUrl: {
            type: String
        },
        userInstagram: {
            type: String
        }
    },
    {
        timestamps: {}
    }
)

module.exports = {
    UserSchema,
    WorkoutSchema,
    ComponentSchema
}
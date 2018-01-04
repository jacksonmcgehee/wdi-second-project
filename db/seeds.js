const User = require('./models/User.js')
const WorkOut = require('./models/Workout.js')
const Component = require('./models/Component.js')
const mongoose = require('mongoose')

// Connect to my DB
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.once('open', () => {
  console.log('Mongoose has connected to MongoDB!')
})

mongoose.connection.on('error', (error) => {
  console.error(`
    MongoDB connection error!!! 
    ${error}
  `)
  process.exit(-1)
})

// Clear DB and plant fresh seeds
User.remove({})
    .then(() => {
        return Workout.remove({})
    })
    .then(() => {
        const hanz = new User({
            userName: 'Calf raise AF',
            firstName: 'Hanz',
            lastName: 'Bjorgensen',
            email: 'arnoldisking@hotmail.com'
        })
        return hanz.save()
    }).then(() => {
        return User.create({
            userName: 'Da Shrug Boss',
            firstName: 'Franz',
            lastName: 'Bjorgensen',
            email: 'louismyhero@yahoo.com'
        })
    }).then(() => {
        const puddleButter = new WorkOut({
            workoutName: 'Puddle Butter',
            createdBy: 'Calf raise AF',
            goal: '20 minute AMRAP',
            description: 'Use strict pull ups for as long as possible'
        })
        const com1 = new Component({
            movement: 'Burpees',
            repetitions: '15'
        })
        const com2 = new Component({
            movement: 'Pull Ups',
            repetitions: '10'
        })
        const com3 = new Component({
            movement: 'Hang Cleans',
            repetitions: '5',
            prescribed: '155 lbs'
        })
        puddleButter.workoutComponent.push(com1, com2, com3)

        return puddleButter.save()
    }).then(() => {
        const boogerSlinger = new WorkOut({
            workoutName: 'Booger Slinger',
            createdBy: 'Da Shrug Boss',
            goal: '8 Rounds for time',
            description: 'Time is important, but form is paramount'
        })
        const com4 = new Component({
            movement: 'Box Jumps',
            repetitions: '8'
        })
        const com5 = new Component({
            movement: 'Dips',
            repetitions: '8'
        })
        const com6 = new Component({
            movement: 'KB Swing',
            repetitions: '8',
            prescribed: '55 lbs'
        })
        const com7 = new Component({
            movement: 'Push Press',
            repetitions: '8',
            prescribed: '95 lbs'
        })
        const com8 = new Component({
            movement: 'Toes-to-Bar',
            repetitions: '8'
        })
        boogerSlinger.workoutComponent.push(com4, com5, com6, com7, com8)

        return boogerSlinger.save()
    }).catch((error) => {
        console.log('!!!!! ERROR SAVING SEEDED DATA !!!!!')
        console.log(error)
      }).then(() => {
        mongoose.connection.close()
        console.log(`
            Finished seeding database...
            
            Disconnected from MongoDB
          `)
      })
import mongoose from "mongoose";

const workoutExerciseSchema = new mongoose.Schema(
  {
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true
    },

    order: {
      type: Number,
      default: 1
    },

    sets: {
      type: Number,
      default: 3
    },

    reps: {
      type: String,
      default: "10-12"
    },

    weight: {
      type: Number,
      default: 0
    },

    duration: {
      type: Number,
      default: 60
    },

    distance: {
      type: Number,
      default: 0
    },

    tempo: {
      type: String,
      default: "2-1-2"
    },

    restTime: {
      type: Number,
      default: 60
    },

    completed: {
      type: Boolean,
      default: false
    },

    notes: {
      type: String,
      default: ""
    }
  },
  {
    _id: false
  }
);

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    workoutStyle: {
      type: String,
      enum: [
        "Push/Pull/Legs",
        "Upper/Lower",
        "Full Body",
        "Bro Split",
        "Antagonistic Supersets",
        "German Volume Training",
        "HIIT",
        "CrossFit",
        "Calisthenics",
        "Powerlifting",
        "Hypertrophy Specific"
      ],
      default: "Full Body"
    },

    goal: {
      type: String,
      enum: [
        "Lose Weight",
        "Gain Muscle",
        "Strength",
        "Endurance",
        "Maintain"
      ],
      default: "Gain Muscle"
    },

    level: {
      type: String,
      enum: [
        "Beginner",
        "Intermediate",
        "Advanced"
      ],
      default: "Beginner"
    },

    dayOfWeek: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      required: true
    },

    exercises: [workoutExerciseSchema],

    estimatedDuration: {
      type: Number,
      default: 60
    },

    caloriesTarget: {
      type: Number,
      default: 500
    },

    caloriesBurned: {
      type: Number,
      default: 0
    },

    completedExercises: {
      type: Number,
      default: 0
    },

    totalExercises: {
      type: Number,
      default: 0
    },

    completionPercentage: {
      type: Number,
      default: 0
    },

    startedAt: {
      type: Date
    },

    completedAt: {
      type: Date
    },

    isCompleted: {
      type: Boolean,
      default: false
    },

    isSkipped: {
      type: Boolean,
      default: false
    },

    isFavorite: {
      type: Boolean,
      default: false
    },

    notes: {
      type: String,
      default: ""
    },

    aiFeedback: {
      type: String,
      default: ""
    },

    nutritionRecommendation: {
      type: String,
      default: ""
    },

    waterRecommendation: {
      type: Number,
      default: 500
    }
  },
  {
    timestamps: true
  }
);

workoutSchema.index({ user: 1, dayOfWeek: 1 });
workoutSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Workout", workoutSchema);

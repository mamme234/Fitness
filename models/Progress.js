import mongoose from "mongoose";

const bodyMeasurementSchema = new mongoose.Schema(
  {
    chest: { type: Number, default: 0 },
    waist: { type: Number, default: 0 },
    hips: { type: Number, default: 0 },
    shoulders: { type: Number, default: 0 },
    bicepsLeft: { type: Number, default: 0 },
    bicepsRight: { type: Number, default: 0 },
    forearmLeft: { type: Number, default: 0 },
    forearmRight: { type: Number, default: 0 },
    thighLeft: { type: Number, default: 0 },
    thighRight: { type: Number, default: 0 },
    calfLeft: { type: Number, default: 0 },
    calfRight: { type: Number, default: 0 },
    neck: { type: Number, default: 0 }
  },
  { _id: false }
);

const nutritionSchema = new mongoose.Schema(
  {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
    fiber: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 },
    water: { type: Number, default: 0 }
  },
  { _id: false }
);

const workoutStatsSchema = new mongoose.Schema(
  {
    workoutsCompleted: { type: Number, default: 0 },
    exercisesCompleted: { type: Number, default: 0 },
    workoutMinutes: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    steps: { type: Number, default: 0 },
    distance: { type: Number, default: 0 }
  },
  { _id: false }
);

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    date: {
      type: Date,
      default: Date.now,
      index: true
    },

    weight: {
      type: Number,
      default: 0
    },

    bmi: {
      type: Number,
      default: 0
    },

    bodyFat: {
      type: Number,
      default: 0
    },

    muscleMass: {
      type: Number,
      default: 0
    },

    bodyMeasurements: bodyMeasurementSchema,

    nutrition: nutritionSchema,

    workout: workoutStatsSchema,

    mood: {
      type: String,
      enum: [
        "Excellent",
        "Good",
        "Normal",
        "Tired",
        "Very Tired"
      ],
      default: "Good"
    },

    sleepHours: {
      type: Number,
      default: 8
    },

    heartRate: {
      type: Number,
      default: 0
    },

    recoveryScore: {
      type: Number,
      default: 100
    },

    streak: {
      type: Number,
      default: 0
    },

    achievements: [
      {
        type: String
      }
    ],

    notes: {
      type: String,
      default: ""
    },

    photos: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

progressSchema.index({ user: 1, date: -1 });

export default mongoose.model("Progress", progressSchema);

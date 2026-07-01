import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    muscleGroup: {
      type: String,
      required: true,
      enum: [
        "Chest",
        "Back",
        "Shoulders",
        "Biceps",
        "Triceps",
        "Forearms",
        "Legs",
        "Glutes",
        "Calves",
        "Core",
        "Full Body",
        "Cardio",
        "Stretching",
        "Neck"
      ]
    },

    category: {
      type: String,
      enum: [
        "Strength",
        "Hypertrophy",
        "Powerlifting",
        "Calisthenics",
        "CrossFit",
        "HIIT",
        "Stretching",
        "Mobility",
        "Warm Up",
        "Cool Down"
      ],
      default: "Strength"
    },

    difficulty: {
      type: String,
      enum: [
        "Beginner",
        "Intermediate",
        "Advanced"
      ],
      default: "Beginner"
    },

    equipment: {
      type: [String],
      default: []
    },

    primaryMuscles: {
      type: [String],
      default: []
    },

    secondaryMuscles: {
      type: [String],
      default: []
    },

    image: {
      type: String,
      default: ""
    },

    thumbnail: {
      type: String,
      default: ""
    },

    video: {
      type: String,
      default: ""
    },

    youtubeUrl: {
      type: String,
      default: ""
    },

    animation: {
      type: String,
      default: ""
    },

    instructions: {
      type: [String],
      default: []
    },

    tips: {
      type: [String],
      default: []
    },

    benefits: {
      type: [String],
      default: []
    },

    commonMistakes: {
      type: [String],
      default: []
    },

    safetyWarnings: {
      type: [String],
      default: []
    },

    breathing: {
      type: String,
      default: ""
    },

    sets: {
      type: Number,
      default: 3
    },

    reps: {
      type: String,
      default: "10-12"
    },

    restTime: {
      type: Number,
      default: 60
    },

    tempo: {
      type: String,
      default: "2-1-2"
    },

    caloriesPerMinute: {
      type: Number,
      default: 8
    },

    estimatedDuration: {
      type: Number,
      default: 5
    },

    premium: {
      type: Boolean,
      default: false
    },

    featured: {
      type: Boolean,
      default: false
    },

    favoriteCount: {
      type: Number,
      default: 0
    },

    views: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: [
        "active",
        "hidden",
        "draft"
      ],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

exerciseSchema.index({
  name: "text",
  muscleGroup: "text",
  category: "text"
});

export default mongoose.model("Exercise", exerciseSchema);

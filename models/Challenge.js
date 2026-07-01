import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    progress: {
      type: Number,
      default: 0
    },

    target: {
      type: Number,
      default: 100
    },

    completed: {
      type: Boolean,
      default: false
    },

    completedAt: {
      type: Date
    },

    xpEarned: {
      type: Number,
      default: 0
    },

    coinsEarned: {
      type: Number,
      default: 0
    },

    rank: {
      type: Number,
      default: 0
    }
  },
  {
    _id: false
  }
);

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    description: {
      type: String,
      default: ""
    },

    category: {
      type: String,
      enum: [
        "Strength",
        "Cardio",
        "Endurance",
        "Flexibility",
        "Weight Loss",
        "Muscle Building",
        "Core",
        "Full Body"
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

    image: {
      type: String,
      default: ""
    },

    banner: {
      type: String,
      default: ""
    },

    icon: {
      type: String,
      default: ""
    },

    exercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise"
      }
    ],

    targetValue: {
      type: Number,
      default: 100
    },

    targetUnit: {
      type: String,
      default: "Reps"
    },

    durationDays: {
      type: Number,
      default: 7
    },

    estimatedCalories: {
      type: Number,
      default: 250
    },

    nutritionPlan: {
      type: String,
      default: ""
    },

    rewards: {
      xp: {
        type: Number,
        default: 100
      },

      coins: {
        type: Number,
        default: 50
      },

      badge: {
        type: String,
        default: ""
      }
    },

    participants: [participantSchema],

    totalParticipants: {
      type: Number,
      default: 0
    },

    completionRate: {
      type: Number,
      default: 0
    },

    featured: {
      type: Boolean,
      default: false
    },

    premium: {
      type: Boolean,
      default: false
    },

    active: {
      type: Boolean,
      default: true
    },

    startDate: {
      type: Date
    },

    endDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

challengeSchema.index({
  title: "text",
  description: "text"
});

export default mongoose.model("Challenge", challengeSchema);

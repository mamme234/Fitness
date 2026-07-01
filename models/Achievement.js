import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true,
        trim:true,
        index:true
    },

    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    description:{
        type:String,
        required:true
    },

    icon:{
        type:String,
        default:""
    },

    image:{
        type:String,
        default:""
    },

    category:{
        type:String,
        enum:[
            "Workout",
            "Strength",
            "Nutrition",
            "Challenge",
            "Progress",
            "Streak",
            "Community",
            "Premium",
            "Special"
        ],
        default:"Workout"
    },

    rarity:{
        type:String,
        enum:[
            "Common",
            "Rare",
            "Epic",
            "Legendary"
        ],
        default:"Common"
    },

    xpReward:{
        type:Number,
        default:100
    },

    coinReward:{
        type:Number,
        default:50
    },

    badgeColor:{
        type:String,
        default:"#FFD700"
    },

    unlockCondition:{
        type:{
            type:String,
            enum:[
                "WorkoutCount",
                "ExerciseCount",
                "CaloriesBurned",
                "WorkoutMinutes",
                "Streak",
                "WeightLost",
                "WeightGained",
                "ChallengeCompleted",
                "Custom"
            ],
            default:"WorkoutCount"
        },

        target:{
            type:Number,
            default:1
        }
    },

    premium:{
        type:Boolean,
        default:false
    },

    featured:{
        type:Boolean,
        default:false
    },

    active:{
        type:Boolean,
        default:true
    },

    totalUnlocked:{
        type:Number,
        default:0
    }

},
{
    timestamps:true
});

achievementSchema.index({
    title:"text",
    description:"text"
});

export default mongoose.model("Achievement", achievementSchema);

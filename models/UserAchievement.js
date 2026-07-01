import mongoose from "mongoose";

const userAchievementSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },

    achievement:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Achievement",
        required:true
    },

    progress:{
        type:Number,
        default:0
    },

    completed:{
        type:Boolean,
        default:false
    },

    completedAt:{
        type:Date
    },

    xpEarned:{
        type:Number,
        default:0
    },

    coinsEarned:{
        type:Number,
        default:0
    }
},
{
    timestamps:true
});

userAchievementSchema.index({
    user:1,
    achievement:1
},{
    unique:true
});

export default mongoose.model(
    "UserAchievement",
    userAchievementSchema
);

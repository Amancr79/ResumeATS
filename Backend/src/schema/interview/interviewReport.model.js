const mongoose = require('mongoose');

const technicalQuestionSchema = new mongoose.Schema({
    question :{
        type: String,
        required:true
    },
    answer :{
        type: String,
    },
    intention:{
        type: String,
    },
        _id:false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question :{
        type: String,
        required:true
    },
    answer :{
        type: String,
    },
    intention:{
        type: String
    },
    _id:false
})

const skillGapSchema = new mongoose.Schema({
      skill:{
        type:String,
        required:[true,"Skills are required"]
      },
      severity:{
        type:String,
        enum:["Low", "Medium", "High"],
        required:[true,"Severity is required"]
      },
      _id:false

})

const preparationPlanSchema =  new mongoose.Schema({
    day:{
        type: String,
        required:[true,"Day is required"]
    },
    focusArea :{
        type: String,
        required:[true,"Focus is required"]
    },
    tasks:[{
        type:String,
        required:[true,'Task is required']
    }]
})


const interviewReportSchema = new mongoose.Schema({
    jobDescription :{
        type: String,
        required: true
    },
    resume :{
        type: String
    },
    selfDescription :{
        type: String
    },
    matchScore:{
        type: Number,
        min:0,
        max:100
    },
    technicalQuestions : [technicalQuestionSchema],
    behavioralQuestions : [behavioralQuestionSchema],
    skillGaps : [skillGapSchema],
    preparationPlan : [preparationPlanSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
}, { timestamps: true });

const interviewReportModel = mongoose.model('InterviewReport', interviewReportSchema);
module.exports = interviewReportModel;
import { Poll } from "../models/Poll.model.js";
import { ApiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createPoll = asyncHandler( async (req, res)=>{
    const { question, options } = req.body
    console.log(question);
    console.log(options);
    
    if (!question || !options) {
        throw new ApiError(401, "Question and options both field are required!")
        
    }
    
    const poll  = new Poll({question, options})
    await poll.save()

    return res
    .status(201)
    .json(
        new apiResponse(201, poll, "Poll created successfully! ")
    )
})

// get a poll by ID
const getPoll = asyncHandler( async (req, res)=>{
       const poll = await Poll.findById(req.params.id);
       
       if(!poll){
        throw new ApiError(501, 'Some problem occured while fetching poll details from DB')
       }
       return res.status(201)
       .json(
        new apiResponse(201, poll, "poll fetched successfully")
       )
})

// submit a vote
const voteAnyPoll = asyncHandler( async (req, res)=> {

    const optionIndex = req.body
    
    const poll =  await Poll.findById(req.params.id)

    if(!poll){
        throw new ApiError(501, "poll not found while voteing this selected poll")
    }

    poll.options[optionIndex?.optionIndex].vote += 1;
    await poll.save();

    return res.status(201)
    .json(
        new apiResponse(201, poll, "vote occur successfully")
    )

})

const deletePoll = asyncHandler( async (req, res)=>{
    

  try {
    const deletedPoll = await Poll.findByIdAndDelete(req.params.id);
    return res.status(201)
    .json(
      new apiResponse(201, deletedPoll, "Poll deleted successfully")
    )
     
  } catch (error) {
    console.log(error);
    throw new Error(501, "Some problem occurred during poll deletion")
  }



})

const getAllPoll = asyncHandler( async (req, res)=>{
     const allPoll =  await Poll.find();
     
     if(!allPoll){
        throw new ApiError(501, "Problem in fetching all polls")
     }
     return res.status(201)
     .json(
        new apiResponse(201, allPoll, "All poll fetched successfully")
     )
})



const updatePoll = asyncHandler( (req, res)=>{

})









export {
    createPoll,
    deletePoll,
    voteAnyPoll,
    updatePoll,
    getPoll,
    getAllPoll
}
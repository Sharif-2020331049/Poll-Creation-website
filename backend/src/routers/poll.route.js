import { Router } from "express";
import { createPoll, deletePoll, getAllPoll, getPoll, updatePoll, voteAnyPoll } from "../controllers/poll.controller.js";


const router = Router()


// create new poll
router.route('/create').post(createPoll)

// get poll 
router.route('/:id').get(getPoll)

// get all poll 
router.route('/').get(getAllPoll)

// submit a vote
router.route('/:id/vote').post(voteAnyPoll)

// delete poll
router.route('/:id/delete').delete(deletePoll)

// update poll
router.route('/:id/update').patch(updatePoll)

export default router

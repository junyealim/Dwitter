import express from "express";
import * as tweetController from '../controller/tweet.js';

const router = express.Router();

// GET 방식의 / tweets
// GET 방식의 / tweets?username=:username
router.get('/', tweetController.getTweets);

// GET 방식의 / tweets/:id
router.get('/:id',tweetController.getTweet);

// POST 방식의 / tweets
router.post('/', tweetController.createTweet);

// PUT 방식의 / tweets/:id
router.put('/:id', tweetController.updateTweet);

// DELETE 방식의 / tweets/:id
router.delete('/:id',tweetController.deleteTweet);

export default router
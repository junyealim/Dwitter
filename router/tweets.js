import express from "express";

const router = express.Router();

let tweets = [
    {
        id: '1',
        text: '안녕하세요!',
        createdAt: Date.now().toString(),
        name: '김사과',
        username: 'apple',
        url: 'https://i.pinimg.com/originals/a8/dc/63/a8dc63c8abeeb6708dbec6ef3009608a.jpg'
    },
    {
        id: '2',
        text: '안녕하세요!',
        createdAt: Date.now().toString(),
        name: '반하나',
        username: 'banana',
        url: 'https://i.pinimg.com/originals/a8/dc/63/a8dc63c8abeeb6708dbec6ef3009608a.jpg'

    }
]


// GET 방식의 / tweets
// GET 방식의 / tweets?username=:username
router.get('/',(req,res, next) => {
    const username = req.query.username;
    const data = username
        ? tweets.filter((tweet) => tweet.username === username)
        : tweets;
    res.status(200).json(data);
    // 변수=조건식?참:거짓
})

// GET 방식의 / tweets/:id
router.get('/:id',(req,res,next) => {
    const id = req.params.id;
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet) {
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message: `Tweet id(${id}) not found`});
    }
})

// POST 방식의 / tweets
router.post('/', (req, res, next) =>{
    const { text, name, username } = req.body;
    const tweet = {
        id: '10',
        text,
        createdAt: Date.now().toString(),
        name,
        username
        // key와 값의 이름이 같다면 생략 가능. name : name, => name,
    };
    tweets = [tweet, ...tweets];
    res.status(201).json(tweets);
})

// PUT 방식의 / tweets/:id
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet) {
        tweet.text = text;
        res.status(201).json(tweet);
    }else{
        res.status(404).json({message: `Tweet id(${id}) not found`});
    }
})

// DELETE 방식의 / tweets/:id
router.delete('/:id',(req, res, next) => {
    const id = req.params.id;
    tweets = tweets.filter((tweet) => tweet.id !== id)
    res.sendStatus(204)
})

export default router
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
];

export async function getAll() {
    return tweets;
}

export async function getAllByUsername(username){
    return tweets.filter((tweet) => tweet.username === username)
}

export async function getById(id){
    return tweets.find((tweet) => tweet.id === id);
}

export async function create(text, name, username) {
    const tweet = {
        id: '10',
        text,
        createdAt: Date.now().toString(),
        name,
        username
        // key와 값의 이름이 같다면 생략 가능. name : name, => name,
    };
    tweets = [tweet, ...tweets];
    return tweets;
}

export async function update(id, text){
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet) {
        tweet.text = text;
    }
    return tweet;
}

export async function remove(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
}
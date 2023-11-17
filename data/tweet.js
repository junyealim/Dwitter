import Mongoose from "mongoose";
import { useVirtualId } from "../db/database.js";
import * as UserRepository from "./auth.js"

const tweetSchema = new Mongoose.Schema({
    text: {type: String, required: true },
    userId: {type: String, required: true },
    name: {type: String, required: true },
    username: {type: String, required: true },
    url: String
    },
    {timestamps: true}
)

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);

export async function getAll() {
    return Tweet.find().sort( {createdAt: -1});
}

export async function getAllByUsername(username) {
    return Tweet.find({username}).sort( {createdAt: -1});
}

export async function getById(id) {
    return Tweet.findById(id)
}

export async function create(text,userId){
    return UserRepository.findById(userId).then((user)=>
        new Tweet({
            text,
            userId,
            name: user.name,
            username: user.username,
            url: user.url
        }).save()
    )
}

export async function update(id,text) {
    return Tweet.findByIdAndUpdate(id, {text}, {
        returnDocument: "after"
    })
}

export async function remove(id) {
    return Tweet.findByIdAndDelete(id);
}

// const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw JOIN users as us ON tw.userId = us.id';

// const ORDER_DESC = 'ORDER BY tw.createdAt DESC'

// export async function getAll() {
//     return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
// }

// export async function getAllByUsername(username){
//     return db.execute(`${SELECT_JOIN} WHERE username = ? ${ORDER_DESC}`, [username]).then((result) => result[0]);
// }

// export async function getById(id){
//     return db.execute(`${SELECT_JOIN} WHERE tw.id = ? ${ORDER_DESC}`, [id]).then((result) => result[0][0])
// }

// export async function create(text, userId){
//     return db.execute('INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)', [text, new Date(), userId]).then((result)=> getById(result[0].insertId));
// }

// export async function update(id, text) {
//     return db.execute('UPDATE tweets SET text = ? WHERE id =?', [text, id]).then(()=> getById(id));
// }

// export async function remove(id) {
//     return db.execute('DELETE FROM tweets WHERE id = ?', [id]);
// }
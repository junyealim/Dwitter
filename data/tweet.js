import SQ from 'sequelize';
import { sequelize} from '../db/database.js';
import {User} from './auth.js';

const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Tweet = sequelize.define('tweet',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull:false
        }
    })
Tweet.belongsTo(User); // 알아서 PK, FK 관계 생성

// const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw JOIN users as us ON tw.userId = us.id';

// const ORDER_DESC = 'ORDER BY tw.createdAt DESC'

const INCLUDE_USER = {
    attributes : [
        'id', 'text', 'createdAt', 'userId',
        [Sequelize.col('user.name'), 'name'], // 대괄호 안에 Sequelize.col로 가져와야 객체 타입이 아닌 동등한 레벨로 가져옴
        [Sequelize.col('user.username'), 'username'],
        [Sequelize.col('user.url'), 'url']
    ],
    include: { // 
        model : User, // 가져오고 싶은 테이블
        attributes: [], // 가져오려는 내용
    }
}

const ORDER_DESC = {
    order: [['createdAt', 'DESC']]
}

export async function getAll() {
    return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC })
}

export async function getAllByUsername(username){
    return Tweet.findAll({
        ...INCLUDE_USER, ...ORDER_DESC, include: {  // include : join
            ...INCLUDE_USER.include, where: {username} // INCLUDE_USER.include : 조인 할 테이블, where: {username} : 조인 조건(on)
        }
    })
}

export async function getById(id){
    return Tweet.findOne({ where: {id}, ...INCLUDE_USER})
}

export async function create(text, userId){
    return Tweet.create({text, userId})
        .then((data) => this.getById(data.dataValues.id))
}

export async function update(id, text) {
    return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
        tweet.text = text;
        return tweet.save();
    });
}

export async function remove(id) {
    return Tweet.findByPk(id).then((tweet)=> {
        tweet.destroy();
    });
}
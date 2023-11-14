import SQ from 'sequelize';
import {sequelize} from '../db/database.js';
const DataTypes = SQ.DataTypes;

// 없을 경우에만 테이블을 생성하고 있을 경우 기존 테이블을 사용한다.
export const User = sequelize.define(
    'user',  // Orm ,Odm은 테이블 이름을 생성하면 자동으로 s를 붙인다.
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        url: DataTypes.TEXT
   },
   { timestamps: false}
)

export async function findByUsername(username){
    return User.findOne({where: {username}}); // 여러개 찾아도 맨 위에 하나만 값을 가져옴
}

export async function findById(id){
    return User.findByPk(id);
}

export async function createUser(user) {
    return User.create(user).then((data) => data.dataValues.id // id값 리턴)
)}
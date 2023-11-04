import * as authRepository from '../data/auth.js';
import bcrypt from "bcrypt";

export async function signup(req, res, next){
    const {username, password, name, email} = req.body;
    const hashed = bcrypt.hashSync(password, 10);
    const users = await authRepository.createUser(username, hashed, name, email);
    if(users){
        res.status(201).json(users);
    }
};

export async function login(req, res, next){
    const {username, password} = req.body;
    const user = await authRepository.login(username);
    if(user){
        if(bcrypt.compareSync(password, user.password)){
            res.status(201).json(`${username} 로그인 완료`)
        }else{
            res.status(404).json({message: `${id}님 비밀번호를 확인하세요`})
        }
    }else{
        res.status(404).json({message: `정보를 다시 확인하세요`})
    }
    
}
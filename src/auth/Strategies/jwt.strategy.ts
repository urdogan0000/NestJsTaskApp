import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/auth/entities/user.entity";
import { JwtPayload } from "src/auth/jwt-payload.interface";
import { UserRepository } from "../Repository/users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private usersRepository:UserRepository
    ){
        super({
            secretOrKey:'topsecret',
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload:JwtPayload):Promise<User>{
        const {username} =payload
        const user:User =await this.usersRepository.findOne({username})

        if(!user){
            throw new UnauthorizedException()
        }
        return user;
    }
}
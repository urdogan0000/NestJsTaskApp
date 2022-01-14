import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credantials.dto';
import { UserRepository } from './Repository/users.repository';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jswService:JwtService
  ) {}
  signUp(authCretantialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCretantialsDto);
  }

  async signIn(authCretantialsDto: AuthCredentialsDto): Promise<object> {
    const {username,password}=authCretantialsDto
    const user =await this.userRepository.findOne({username})

    if(user && (await bcrypt.compare(password,user.password))){
      const payload:JwtPayload ={username};
      const accessToken:string=await this.jswService.sign(payload)
      return {accessToken}
    }else{
      throw new UnauthorizedException('Please check ur login credentails')
    }
    
  }
}

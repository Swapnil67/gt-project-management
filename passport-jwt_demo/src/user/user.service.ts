import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
// import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly authService: AuthService
        ) {}
    
      async create(body: any): Promise<User> {
        return this.userModel.create(body)
      }
    
      async findOne(res, body: any): Promise<User> {
        console.log('second from userService');
      
        const user = await this.userModel.findOne({email: body.email});
        
        if(!user){
          throw new BadRequestException('Invalid Credentials');
        }
        // User found but check the password
        const isMatched = await bcrypt.compare(body.password, user.password);
        if(!isMatched) {
          throw new BadRequestException('Invalid Credentials');
        }
        let jwtPayload = {name: user.name, id: user._id}
        jwtPayload: jwtPayload;
        return res.json({
          success: true,
          msg: "User LoggedIn successfully",
          accessToken: await this.authService.createAccessToken(jwtPayload),
        })
      }
    
}

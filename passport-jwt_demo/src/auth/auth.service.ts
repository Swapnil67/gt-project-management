import { BadRequestException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { sign } from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET } from 'src/db_constants';
import { User, UserDocument } from 'src/user/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from './interfaces/jwt-payload.interface';

dotenv.config({
    path: '../.env'
})

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
  
    async validateUser(body: JwtPayload): Promise<any> {
        const user = await this.userModel.findOne({_id: body.id});
        console.log(body);
        
        if (!user) {
          console.log('User not found from validateUser');
          throw new UnauthorizedException('User not found.');
        }
        return user;
    }

    async createAccessToken(jwtPayload: JwtPayload) {
        // const accessToken = this.jwtService.sign({userId});
        const accessToken = sign({jwtPayload}, JWT_SECRET , { expiresIn: JWT_EXPIRATION });
        return accessToken;
    }
    //   ┬┬ ┬┌┬┐  ┌─┐─┐ ┬┌┬┐┬─┐┌─┐┌─┐┌┬┐┌─┐┬─┐
    //   ││││ │   ├┤ ┌┴┬┘ │ ├┬┘├─┤│   │ │ │├┬┘
    //  └┘└┴┘ ┴   └─┘┴ └─ ┴ ┴└─┴ ┴└─┘ ┴ └─┘┴└─
    private jwtExtractor(request: { headers: { authorization: string; }; header: { authorization: any; }; body: { token: string; }; query: { token: any; }; }) {
        let token = null;
        if (request.headers.authorization) {
            // both works but we use 2nd one to remove any extra spaces added bymistakely
            // token = request.headers.authorization.replace('Bearer ', '');
            token = request.headers.authorization.replace('Bearer ', '').replace(' ', '');
            console.log(token);
            
        } else if (request.body.token) {
            token = request.body.token.replace(' ', '');
        }
        if (request.query.token) {
            token = request.body.token.replace(' ', '');
        }
        if (token) {
            try {
                token = token;
            } catch (err) {
                throw new BadRequestException('Bad request.');
            }
        }
        // console.log(token);
        return token;
    }


    // ***********************
    // ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
    // ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
    // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
    // ***********************
    returnJwtExtractor() {
        return this.jwtExtractor;
    }

}
// export class AuthService {

//     async validateUser(res, body): Promise<any> {
//         console.log('First from authService');
//     }

//     async createAccessToken(userId: string) {
//         // const accessToken = this.jwtService.sign({userId});
        
//         const accessToken = sign({userId}, JWT_SECRET , { expiresIn: JWT_EXPIRATION });
//         return accessToken;
//     }
// }

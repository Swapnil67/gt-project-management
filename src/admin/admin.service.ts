import { HttpException, HttpStatus, Injectable, NotFoundException, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Admin, AdminDocument } from './schema/Admin.Schema';

@Injectable()
export class AdminService {
    constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>) {}
  
    // async create(req: Request, res: Response, createAdminDto: CreateAdminDto): Promise<any> {
    //     const newAdmin = new this.adminModel(createAdminDto);
    //     await newAdmin.save();
    //     return res.json({
    //         success: true,
    //         email: newAdmin.email,
    //         message: "Admin created successfully"
    //     })
    // }

    
    async login(req: Request, res: Response, loginAdminDto: LoginAdminDto) {
            let admin = await this.adminModel.findOne({email: loginAdminDto.email});
            
            if(!admin) {
                throw new NotFoundException('Wrong email or password.');
            }
            const match = await bcrypt.compare(loginAdminDto.password, admin.password);
            console.log(match);
            
            if(!match) {
                throw new NotFoundException('Wrong email or password.');
            } else {
                return res.json({
                    success: true,
                    id: admin.id,
                    message: "Admin Logged In successfully"
                });
            }
    }

    // async checkPassword() {

    // }
}

import { Body, Controller, Get, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

// Request comes first here i.e., to controller
@Controller('admin')
export class AdminController {
    constructor (private adminService: AdminService) {}
    // @Post('/createAdmin')
    // async create(@Req() req: Request, @Res() res: Response ,@Body() createAdminDto: CreateAdminDto)  {
    //     return await this.adminService.create(req, res, createAdminDto);
    // }

    @Post('/login')
    @UsePipes(ValidationPipe)
    async login(@Req() req: Request, @Res() res: Response , @Body() loginAdminDto: LoginAdminDto): Promise<any> {
        return await this.adminService.login(req, res, loginAdminDto);
    }
}

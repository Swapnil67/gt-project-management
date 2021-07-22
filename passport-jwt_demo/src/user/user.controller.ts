import { Body, Controller, Get, Post, Res,  Req, UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {  Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
// import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(
      private readonly userService: UserService,
    ) {}
      
  @Post('/register')
  async register(@Body() body) {
    let {name, email, password} = body
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newBody = {
     name,
     email,
     password: hashedPassword,
    }
    return this.userService.create(newBody);
  }

  @Post('/login')
  async login(@Res() res: Response, @Body() body) {
    return this.userService.findOne(res, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Req() req: Request): any { // TODO = require an Bearer Token, validate token
    // return "unlocked";
    return req.user;
  }
}

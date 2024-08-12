import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Public } from './guards/JwtGuard';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  

}

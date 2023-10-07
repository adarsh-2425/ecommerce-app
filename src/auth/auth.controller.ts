import { Controller, Post, Body } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/shared/decorators/public.decorator';


@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Public()
    @Post('signup')
    signup(@Body() signupdto: SignUpDto) {
        return this.authService.signup(signupdto)
    }

    @Public()
    @Post('login')
    login(@Body() logindto: LoginDto) {
        return this.authService.login(logindto);
    }
}

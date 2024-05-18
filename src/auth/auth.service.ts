import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from './dtos/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    private jwtExpirationTime: number;

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.jwtExpirationTime = +this.configService.get<number>('JWT_EXPIRATION_TIME');
    }

    async signIn(email: string, password: string): Promise<AuthResponseDto> {

        const foundUser = await this.userService.findByEmail(email)
            .catch(() => { throw new UnauthorizedException(); });

        if (!compareSync(password, foundUser.password)) {
            throw new UnauthorizedException();
        }

        const payload = {
            sub: foundUser._id,
            email: foundUser.email
        };

        const token = this.jwtService.sign(payload);

        return { token, expiresIn: this.jwtExpirationTime };
    }
}

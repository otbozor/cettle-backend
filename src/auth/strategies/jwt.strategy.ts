import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtPayload } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private configService: ConfigService,
        private prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                // First try cookie
                (req: Request) => {
                    const token = req?.cookies?.accessToken;
                    if (token) {
                        console.log('🍪 JWT from cookie:', token.substring(0, 20) + '...');
                    }
                    return token;
                },
                // Then try Authorization header
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload) {
        console.log('🔐 JWT validate payload:', payload);

        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        });

        if (!user || user.status !== 'ACTIVE') {
            console.log('❌ User not found or banned:', payload.sub);
            throw new UnauthorizedException('User not found or banned');
        }

        console.log('✅ User validated:', { id: user.id, username: user.username, isAdmin: user.isAdmin });
        return user;
    }
}

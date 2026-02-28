import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramChannelService } from '../telegram/telegram-channel.service';

@Injectable()
export class ListingsExpiryService implements OnModuleInit {
    private readonly logger = new Logger(ListingsExpiryService.name);

    constructor(
        private prisma: PrismaService,
        private telegramChannel: TelegramChannelService,
    ) {}

    onModuleInit() {
        this.expireListings();
        // Run every 24 hours
        setInterval(() => this.expireListings(), 24 * 60 * 60 * 1000);
    }

    async expireListings() {
        try {
            const now = new Date();

            // 1. Muddati tugagan e'lonlarni oldindan topamiz (user ma'lumotlari bilan)
            const expiredListings = await this.prisma.horseListing.findMany({
                where: {
                    status: 'APPROVED',
                    expiresAt: { lt: now },
                },
                select: {
                    id: true,
                    title: true,
                    user: { select: { telegramUserId: true } },
                },
            });

            if (expiredListings.length > 0) {
                // EXPIRED ga o'tkazamiz
                await this.prisma.horseListing.updateMany({
                    where: {
                        status: 'APPROVED',
                        expiresAt: { lt: now },
                    },
                    data: { status: 'EXPIRED' },
                });

                this.logger.log(`⏰ ${expiredListings.length} ta e'lon muddati tugadi (EXPIRED)`);

                // Har bir user ga Telegram xabari parallel yuboramiz
                await Promise.allSettled(
                    expiredListings
                        .filter(l => l.user?.telegramUserId)
                        .map(l => this.telegramChannel.notifyUserListingExpired(
                            l.user.telegramUserId.toString(),
                            { id: l.id, title: l.title },
                        ))
                );
            }

            // 2. Boost muddati tugasa → isPaid va isTop ni reset qilish
            const boostResult = await this.prisma.horseListing.updateMany({
                where: {
                    isPaid: true,
                    boostExpiresAt: { lt: now },
                },
                data: { isPaid: false, isTop: false, isPremium: false, boostExpiresAt: null },
            });
            if (boostResult.count > 0) {
                this.logger.log(`📦 ${boostResult.count} ta e'lon reklamasi muddati tugadi`);
            }
        } catch (err) {
            this.logger.error('expireListings error:', err);
        }
    }
}

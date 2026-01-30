import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminListingsController } from './admin-listings.controller';
import { AdminService } from './admin.service';

@Module({
    controllers: [AdminController, AdminListingsController],
    providers: [AdminService],
    exports: [AdminService],
})
export class AdminModule { }

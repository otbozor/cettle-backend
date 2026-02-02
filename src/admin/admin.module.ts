import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminListingsController } from './admin-listings.controller';
import { AdminBlogController } from './admin-blog.controller';
import { AdminService } from './admin.service';
import { BlogModule } from '../blog/blog.module';

@Module({
    imports: [BlogModule],
    controllers: [AdminController, AdminListingsController, AdminBlogController],
    providers: [AdminService],
    exports: [AdminService],
})
export class AdminModule { }

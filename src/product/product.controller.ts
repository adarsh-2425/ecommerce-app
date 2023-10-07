import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './interface/product.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { JwtPayload } from 'src/auth/strategies';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RoleGuard } from 'src/shared/guards/roles.guard';
import { UserRoles } from 'src/user/schema/user.schema';
import { productimageUploadInterceptor } from 'src/shared/imageUpload/multer';

@Controller('api/product')
export class ProductController {
    constructor(private readonly productService: ProductService){}
    
    // admin protected route testing
    //@Roles(UserRole.ADMIN)
    //@UseGuards(RoleGuard)
    //@Public() // indicates a route is public
    @Get('/test/1')
    protectedAdminRoute() { // @Request() req is for accessing request body

        return 'Welcome Admin. You now have access to routes protected with role Admin'
    }

    // user protected route testing
    //@Roles('user')
    @Get('test/2')
    @Roles(UserRoles.USER)
    @UseGuards(RoleGuard)
    protectedUserRoute(
        @GetUser() user: JwtPayload
    ) {
        console.log(user);
        return 'Welcome user. You now have access to routes protected with role user'
    }

    // admin or user protected route testing
    //@Roles('admin', 'user')

    @Get('/test/3')
    protectedRoute() {
        return 'Welcome. You now have access to routes protected with role either Admin or User'
    }
    
    // Get all Products route
    //@Roles('admin', 'user')

    @Get('/')
    getProducts() {
        return this.productService.getProducts();
    }

    // get one product
    @Get(':id')
    //@Roles('admin', 'user')
    getProductById(@Param('id')id): Promise<Product> {
        return this.productService.getProductById(id);
    }

    // Add a product
    @Post('/add')
    @Roles(UserRoles.ADMIN)
    @UseGuards(RoleGuard)
    @UseInterceptors(productimageUploadInterceptor())
    addProduct(@UploadedFiles() files:any, @Body() dto, @GetUser() user: JwtPayload) {
        return this.productService.addProduct(files, dto, user)
    }

    // Update a Product
    @Put('/update')
    @Roles(UserRoles.ADMIN)
    @UseGuards(RoleGuard)
    @UseInterceptors(productimageUploadInterceptor())
    updateProduct(@UploadedFiles() files:any, @Body() dto, @GetUser() user: JwtPayload) {
        return this.productService.updateProduct(files, dto, user)
    }

    // Delete a Product
    //@Roles('admin')
    @Delete(':id')
    deleteProduct(@Param('id') id): Promise<Product> {
        return this.productService.deleteProduct(id);
    }
}

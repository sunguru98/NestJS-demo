import {
  Controller,
  Get,
  Query,
  Param,
  BadRequestException
} from '@nestjs/common';
import { PostQuery } from './interfaces/post.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/')
  fetchPosts(@Query() { page, limit }: PostQuery) {
    return this.postsService.getPosts(page, limit);
  }

  @Get('/title/:name')
  fetchPostsByTitle(
    @Param('name') name: string,
    @Query() { page, limit }: PostQuery
  ) {
    if (name === undefined)
      throw new BadRequestException({
        statusCode: 400,
        message: 'Title must be sent as a route parameter'
      });
    return this.postsService.getPostsByTitle(name, page, limit);
  }

  @Get('/title/user/:name/:userId')
  fetchPostsByCondition(
    @Param() { name, userId }: { name: string; userId: string },
    @Query() { page, limit }: PostQuery
  ) {
    if (name === undefined)
      throw new BadRequestException({
        statusCode: 400,
        message: 'Title must be sent as a route parameter'
      });
    else if (userId === undefined)
      throw new BadRequestException({
        statusCode: 400,
        message: 'UserId must be sent as a route parameter'
      });
    return this.postsService.getPostsByCondition(
      name,
      parseInt(userId),
      page,
      limit
    );
  }
}

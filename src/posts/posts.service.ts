import { Injectable } from '@nestjs/common';
import { Post, PostResponse } from './interfaces/post.interface';
import postsArr from './posts.json';

const constructResponse = (
  page: number | string,
  posts: Post[]
): PostResponse => ({
  statusCode: 200,
  page: parseInt(page.toString()),
  posts
});

@Injectable()
export class PostsService {
  private readonly posts: Post[] = [...postsArr];

  getPosts(pageNumber = 1, limit = 10) {
    return constructResponse(
      pageNumber,
      this.posts.slice((pageNumber - 1) * limit, limit * pageNumber)
    );
  }

  getPostsByTitle(name: string, pageNumber = 1, limit = 10) {
    return constructResponse(
      pageNumber,
      this.posts
        .filter(p => p.title.includes(name.toLowerCase()))
        .slice((pageNumber - 1) * limit, limit * pageNumber)
    );
  }

  getPostsByCondition(
    name: string,
    userId: number,
    pageNumber = 1,
    limit = 10
  ) {
    return constructResponse(
      pageNumber,
      this.posts
        .filter(p => p.title.includes(name.toLowerCase()))
        .filter(p => p.userId > userId)
        .slice((pageNumber - 1) * limit, limit * pageNumber)
    );
  }
}

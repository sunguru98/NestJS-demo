export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostQuery {
  page?: number;
  limit?: number;
}

export interface PostResponse {
  statusCode: number;
  page: number;
  posts: Post[];
}

export default {};
export interface Post {
  id: string | number;
  title: string;
  body: string;
}

export interface GetListDto {
  
}

export interface CreatePostInput {
  title: string;
  body: string;
  userId?: string | number;
}

export interface UpdatePostInput {
  title?: string;
  body?: string;
  userId?: string | number;
}

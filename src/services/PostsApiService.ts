import {
  CreatePostInput,
  GetListDto,
  Post,
  UpdatePostInput,
} from "../interfaces/post.interface";
import RestApiService from "./RestApiService";
import axios from "axios";

export default class PostsApiService extends RestApiService<
  Post,
  GetListDto,
  CreatePostInput,
  UpdatePostInput
> {
  constructor() {
    super({
      prefix: "posts",
    });
  }
}

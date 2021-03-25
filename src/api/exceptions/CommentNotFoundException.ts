import HttpException from './HttpException';

class CommentNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Comment with id ${id} not found`);
  }
}

export default CommentNotFoundException;
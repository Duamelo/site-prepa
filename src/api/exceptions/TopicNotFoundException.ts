import HttpException from './HttpException';

class TopicNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Topic with id ${id} not found`);
  }
}

export default TopicNotFoundException;
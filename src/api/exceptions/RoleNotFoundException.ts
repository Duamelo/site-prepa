import HttpException from './HttpException';

class RoleNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Role with id ${id} not found`);
  }
}

export default RoleNotFoundException;
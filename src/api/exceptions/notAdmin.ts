import HttpException from "./HttpException";

class IsNotAdmin extends HttpException{
    constructor(id : string){
        super(400, `User with id ${id} is not Admin`);
    }
}
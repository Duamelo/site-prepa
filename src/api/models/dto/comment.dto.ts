import { IsString } from 'class-validator';


class CreateCommentDto
{



  @IsString()
  public message: string;

}
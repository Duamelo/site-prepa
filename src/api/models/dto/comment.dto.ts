import { IsNumber, IsString } from 'class-validator';


class CreateCommentDto
{



  @IsString()
  public message: string;

  @IsNumber()
  public likes: number;

}

export default CreateCommentDto;
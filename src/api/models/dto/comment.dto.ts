import { IsNumber, IsString } from 'class-validator';


class CreateCommentDto
{


  @IsNumber()
  public userId: number;

  @IsNumber()
  public topicId: number;

  
  @IsString()
  public message: string;

  @IsNumber()
  public likes: number;

}

export default CreateCommentDto;
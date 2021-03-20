import { IsString } from 'class-validator';


class CreatePostDto {

  @IsString()
  public title: string;

  @IsString()
  public content: string;



}

export default CreatePostDto;
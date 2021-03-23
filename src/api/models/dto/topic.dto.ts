import { IsString } from 'class-validator';


class CreateTopicDto {

  @IsString()
  public title: string;

  @IsString()
  public content: string;



}

export default CreateTopicDto;
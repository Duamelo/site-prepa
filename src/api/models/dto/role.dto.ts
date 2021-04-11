import { IsString } from 'class-validator';

class CreateRoleDto {

  @IsString()
  public nom_role: string;

}

export default CreateRoleDto;
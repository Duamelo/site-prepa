import { IsString, IsDate, IsNumber } from 'class-validator';

class CreateUserDto
{
    @IsString()
    public nom: string;

    @IsString()
    public prenom: string;


    @IsString()
    public date_naissance: string;

    @IsString()
    public email: string;

    @IsNumber()
    public telephone: number;

    @IsString()
    public pays: string;

    @IsString()
    public mot_de_passe: string;

}

export default CreateUserDto;
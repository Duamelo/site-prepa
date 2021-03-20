import { IsString, IsDate, IsNumber } from 'class-validator';

class CreateUserDto
{
    @IsString()
    public nom: string;

    @IsString()
    public prenom: string;

    @IsDate()
    public date_naissance: Date;

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
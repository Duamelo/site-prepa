import { IsString, IsNumber } from 'class-validator';

class RegisterDto
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

    @IsNumber()
    public role: number;

}

export default RegisterDto;
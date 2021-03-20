import { IsString } from 'class-validator';



class logInDto
{
    @IsString()
    public email: string;


    @IsString()
    public mot_de_passe: string;
}


export default logInDto;
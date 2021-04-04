import {IsString} from 'class-validator';

class CreateCategoryDto{
    @IsString()
    public nom : string;
}

export default CreateCategoryDto;

interface IUser 
{
    id?: number;
    nom: string;
    prenom: string;
    date_naissance: Date;
    mot_de_passe: string;
    email: string;
    telephone: number;
    pays: string;

}

export default IUser;
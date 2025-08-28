import { IsNotEmpty } from "class-validator";


export class LoginDto{
        @IsNotEmpty({message:"email required"})
        email:string;
        @IsNotEmpty({message:"password required"})
        password:string;
}
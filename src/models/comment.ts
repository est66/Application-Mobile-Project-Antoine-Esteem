import { User } from "./user";

export class Comment {
    id:string;
    text: string;
    createdAt: Date;
    autor: User;
}
// 1. Create an interface representing a document in MongoDB.
interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    contactNumber: string;
    updatedAt: number;
    deleted: number;
}

export { IUser }
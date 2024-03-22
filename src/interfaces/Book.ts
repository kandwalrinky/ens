// 1. Create an interface representing a document in MongoDB.
interface IBook {
    book_name: string;
    author: string;
    userid: string;
    createdAt: number;
    updatedAt: number;
    deleted: number;
}

export { IBook }
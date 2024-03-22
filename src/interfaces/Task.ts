// 1. Create an interface representing a document in MongoDB.
interface ITask {
    task_name: string;
    userid: string;
    createdAt: number;
    updatedAt: number;
    deleted: number;
}

export { ITask }
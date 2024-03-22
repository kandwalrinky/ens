// 1. Create an interface representing a document in MongoDB.
interface ITask {
    template_name: string;
    placeholders: string;
    short_url: string;
    channels: object;
    createdAt: number;
    updatedAt: number;
    deleted: number;
}

export { ITask }
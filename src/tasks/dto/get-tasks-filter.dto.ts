/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { TaskStatus } from "../entity/task.entity";

export class GetTasksFilterDto {
    status?:TaskStatus;
    search?:string;
}

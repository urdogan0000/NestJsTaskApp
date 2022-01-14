/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { TaskStatus } from "../entity/Enums/task-status.enum";

export class GetTasksFilterDto {
    status?:TaskStatus;
    search?:string;
}

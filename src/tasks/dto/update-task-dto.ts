/* eslint-disable prettier/prettier */
import { IsEnum } from "class-validator";
import { TaskStatus } from "../entity/task.entity";

export class UpdateTaskStatusDto{
    @IsEnum(TaskStatus)
    status:TaskStatus;
}
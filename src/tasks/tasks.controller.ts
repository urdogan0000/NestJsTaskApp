/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Query, Patch } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-dto';
import { Task, TaskStatus } from './entity/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilter(filterDto);
    }

    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTask(@Param('id') id: string): Task {
    return this.taskService.getTask(id);
  }

  @Post()
  createTask(@Body() createTaskDtop: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDtop);
  }

  @Patch("/:id")
  updateTask(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
    const {status}=updateTaskStatusDto
    return this.taskService.updateTask(id,status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
   
    return this.taskService.deleteTask(id);
  }
}

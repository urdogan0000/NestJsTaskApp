/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Query, Patch, UseGuards,Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decotators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-dto';
import { Task } from './entity/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger=new Logger('TaskController')
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto,@GetUser() user: User): Promise<Task[]> {

    this.logger.verbose(`user ${user.username}`)
    return this.taskService.getTasks(filterDto,user);
  }

  @Get('/:id')
  getTask(@Param('id') id: string,@GetUser() user: User): Promise<Task> {
    return this.taskService.getTask(id,user);
  }

  @Post()
  createTask(@Body() createTaskDtop: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.taskService.createTask(createTaskDtop,user);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user:User) {
    return this.taskService.deleteTask(id,user);
  }

  @Patch('/:id')
  updateTask(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto,@GetUser() user: User): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTask(id, status,user);
  }
  
  /*
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
  */
}

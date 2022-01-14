/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entity/task.entity';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-dto';
import { TaskRepository } from './Reposştories/tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './entity/Enums/task-status.enum';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

    getTasks(filterDto:GetTasksFilterDto,user :User):Promise<Task[]>{
      return this.taskRepository.getTasks(filterDto,user)
    }

  async getTask(id: string,user:User): Promise<Task> {
    const found = await this.taskRepository.findOne({where:{id,user}});

    if (!found) {
      throw new NotFoundException(`id not found ${id}`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto,user:User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto,user);
  }

  async deleteTask(id: string,user:User): Promise<void> {
    const result = await this.taskRepository.delete({id,user});
    if (result.affected === 0) {
      throw new NotFoundException(`Task with the following id not found ${id}`);
    }

  
  }
  

  async updateTask(id:string,status:TaskStatus,user:User):Promise<Task>{
    const task=await this.getTask(id,user)
    task.status=status
    await this.taskRepository.save(task)
   
    return task
  }
  
  /*
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTask(id: string): Task {
    const found=this.tasks.find((task) => task.id === id)

    if(!found){
      throw new NotFoundException(`id not found ${id}`)
    }

    return found ;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) {
    const found=this.getTask(id)
    const index = this.tasks.findIndex((task) => task.id === id);
    return this.tasks.splice(index, 1);
  }

  updateTask(id:string,status:TaskStatus){
    const task=this.getTask(id)
    task.status=status;
    return task
  }
  */
}

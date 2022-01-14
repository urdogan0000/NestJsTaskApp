import { User } from 'src/auth/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { TaskStatus } from '../entity/Enums/task-status.enum';
import { Task } from '../entity/task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTasks(filterDto:GetTasksFilterDto,user:User):Promise<Task[]>{
        const {status, search}=filterDto
        const query=this.createQueryBuilder('task')
        query.where({user})

        if(status){
            query.andWhere('task.status = :status', {status})
        }
        if(search){
            query.andWhere('(LOWER(task.title) LIKE  LOWER(:search) OR LOWER(task.description) LIKE  LOWER(:search))',{search: `%${search}%`})
        }

        const tasks= await query.getMany()
        return tasks
    }

  async createTask(createTaskDto: CreateTaskDto,user:User): Promise<Task> {
    const task = this.create({
      ...createTaskDto,
      status: TaskStatus.OPEN,
      user
    });
    await this.save(task);
    return task
  }
}

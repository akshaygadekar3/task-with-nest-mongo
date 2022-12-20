import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schema/tasks.schema';
import { createTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async findOne(id: string): Promise<Task> {
    const record = await this.taskModel.findById(id);
    if (!record) {
      throw new NotFoundException(`Task with id : ${id} not found`);
    }
    return record;
  }

  async create(createTaskDto: createTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const createdTask = new this.taskModel({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await createdTask.save();
    return createdTask;
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async deleteById(id: string): Promise<object> {
    const result = await this.taskModel.deleteOne({ _id: id });
    if (result.deletedCount !== 0) {
      console.log(result);
      return { message: `Task with id : ${id} deleted succesfully` };
    } else {
      throw new NotFoundException(`Task with id : ${id} not found`);
    }
  }
}

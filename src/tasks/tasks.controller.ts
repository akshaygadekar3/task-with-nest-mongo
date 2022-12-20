import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { Task } from './schema/tasks.schema';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
    
    @Get()
    findAll(){
        return this.tasksService.findAll()
    }

    @Get('/:id')
    findOne(@Param('id') id : string): Promise<Task>{
        return this.tasksService.findOne(id)
    }

    @Post()
    createTask(@Body() createTaskDto:createTaskDto): Promise<Task>{
        return this.tasksService.create(createTaskDto)
    }

    @Delete('/:id')
    deleteById(@Param('id') id: string) : Promise<object>{
        return this.tasksService.deleteById(id)
    }
}

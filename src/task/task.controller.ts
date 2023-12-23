import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';


@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    async getAllTasks() {
        return this.taskService.getAllTasks();
    }

    @Post()
    async postTask(@Body() data: Task) {
        return this.taskService.postTask(data);
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string) {
        const taskFound = await this.taskService.getTaskById(Number(id));
        if (!taskFound) throw new NotFoundException("No existe la tarea");
        return taskFound;
    }

    @Delete(':id')
    async deleteTaskById(@Param('id') id: string) {
        try {
            return await this.taskService.deleteTask(Number(id));
        } catch (err) {
            throw new NotFoundException("No existe la tarea");
        }
    }

    @Put(':id')
    async upodateTask(@Param('id') id: string, @Body() data: Task) {
        try {
            return await this.taskService.updateTask(Number(id), data);
        } catch (err) {
            throw new NotFoundException("No existe la tarea");
        }
    }
}
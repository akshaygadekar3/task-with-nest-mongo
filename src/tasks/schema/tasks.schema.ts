import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { timestamp } from 'rxjs';
import { TaskStatus } from '../task-status.enum';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  status: TaskStatus;

  timestamp: true;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

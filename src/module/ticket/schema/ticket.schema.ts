import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema({ toObject: { getters: true }, versionKey: false })
export class Ticket {
  @Prop({ required: true, type: String })
  city_id: String;

  @Prop({ required: true, type: String })
  time: String;

  @Prop({ required: true, type: String })
  movie_id: String;

  @Prop({ required: true, type: Number })
  cinema: ObjectId;

  //   @Prop({ required: true, type: Number })
  //   cinemaRoom: Number;

  //   @Prop({ required: true, type: String })
  //   seats: [String];

  @Prop({ required: true, type: Number })
  totalPrice: Number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

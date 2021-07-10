import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({ toObject: { getters: true }, versionKey: false })
export class Booking {
  @Prop({ required: true, type: String })
  city_id: String;

  @Prop({ required: true, type: String })
  time: String;

  @Prop({ required: true, type: String })
  movie_id: String;

  @Prop({ required: true, type: String })
  cinema: String;

  //   @Prop({ required: true, type: Number })
  //   cinemaRoom: Number;

  //   @Prop({ required: true, type: String })
  //   seats: [String];

  @Prop({ required: true, type: Number })
  totalPrice: Number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

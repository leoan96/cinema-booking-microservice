import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookingDTO } from './dto/booking.dto';
import { Booking, BookingDocument } from './schema/booking.schema';

/*
    NOTE:
    - this is just a POC, booking logic is not complete.
    - for example, you cannot book by seats, seats would not be removed upon successful booking
    - to be refactored in future to provide better functionality
    - use of 2D matrix to store seating position instead of array
*/

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  async bookTicket({
    city_id,
    time,
    movie_id,
    cinema,
    totalPrice,
  }: BookingDTO): Promise<BookingDocument> {
    return await this.bookingModel.create({
      city_id,
      time,
      movie_id,
      cinema,
      totalPrice,
    });
  }
}

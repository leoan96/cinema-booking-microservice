import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '../booking/schema/booking.schema';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  async getTicketById(ticketId: string): Promise<BookingDocument> {
    return await this.bookingModel.findById(ticketId);
  }
}

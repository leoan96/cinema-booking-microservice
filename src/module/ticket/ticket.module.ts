import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from '../booking/schema/booking.schema';
import { TicketController } from '../ticket/controller/ticket.controller';
import { TicketAdminController } from './controller/ticket-admin.controller';
import { TicketService } from './ticket.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Booking.name,
        schema: BookingSchema,
      },
    ]),
  ],
  controllers: [TicketController, TicketAdminController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}

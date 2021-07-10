import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookingDocument } from '../booking/schema/booking.schema';
import { TicketService } from './ticket.service';

@ApiTags('ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get(':ticketId')
  async getTicketById(
    @Param('ticketId') ticketId: string,
  ): Promise<BookingDocument> {
    return await this.ticketService.getTicketById(ticketId);
  }
}

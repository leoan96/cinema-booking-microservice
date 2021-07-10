import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { BookingService } from './booking.service';
import { BookingDTO } from './dto/booking.dto';
import { BookingDocument } from './schema/booking.schema';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async bookTicket(
    @Body(new ValidationPipe()) bookingDto: BookingDTO,
  ): Promise<BookingDocument> {
    return await this.bookingService.bookTicket(bookingDto);
  }
}

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { BookingService } from './booking.service';
import { BookingDTO } from './dto/booking.dto';
import { BookingSuccess } from './interface/booking.interface';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // TODO: only allow logged in users to book
  @Post()
  @ApiOperation({
    operationId: 'bookTicket',
    summary: 'Book a ticket',
    description: 'Book a ticket using account id',
  })
  @ApiOkResponse({
    description: 'Successfully booked ticket',
  })
  @ApiBadRequestResponse({
    description: 'Required to be logged in for this action',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went terribly wrong',
  })
  @HttpCode(HttpStatus.OK)
  async bookTicket(
    @Body(new ValidationPipe()) bookingDto: BookingDTO,
  ): Promise<BookingSuccess> {
    return await this.bookingService.bookTicket(bookingDto);
  }
}

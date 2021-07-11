import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../../guard/auth.guard';
import { Roles } from '../../../guard/role/role.decorator';
import { Role } from '../../../guard/role/role.enum';
import { RoleGuard } from '../../../guard/role/role.guard';
import { BookingDocument } from '../../booking/schema/booking.schema';
import { TicketService } from '../ticket.service';

@ApiTags('ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  // TODO: only allow logged in users to getTicketById for the tickets they have purchased
  @Get(':ticketId')
  @ApiOperation({
    operationId: 'getTicketById',
    summary: 'Retrieve a ticket with given ticket id',
    description:
      'Retrieves a ticket with given ticket id, user role required to perform this operation',
  })
  @ApiOkResponse({
    description: 'Retrieved ticket by ticket id',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went terribly wrong',
  })
  @HttpCode(HttpStatus.OK)
  @Roles(Role.User, Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  async getTicketById(
    @Param('ticketId') ticketId: string,
  ): Promise<BookingDocument> {
    return await this.ticketService.getTicketById(ticketId);
  }
}

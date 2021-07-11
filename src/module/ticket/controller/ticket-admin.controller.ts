import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
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

@ApiTags('admin')
@Controller('admin/ticket')
export class TicketAdminController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('')
  @ApiBearerAuth('backendToken')
  @ApiOperation({
    operationId: 'getAllTickets',
    summary: 'Retrieve all tickets',
    description:
      'Retrieve all tickets, admin role required to perform this operation',
  })
  @ApiOkResponse({
    description: 'Retrieved all tickets',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went terribly wrong',
  })
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  async getAllTickets(): Promise<BookingDocument[]> {
    return await this.ticketService.getAllTickets();
  }
}

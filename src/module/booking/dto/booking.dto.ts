import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BookingDTO {
  @ApiProperty({
    description: 'Id of city',
    type: 'string',
    example: '588ababf2d029a6d15d0b5bf',
  })
  @IsString()
  city_id: string;

  @ApiProperty({
    description: 'Time of movie',
    type: 'string',
    example: '10:15',
  })
  @IsString()
  time: string;

  @ApiProperty({
    description: 'Id of movie',
    type: 'string',
    example: '2',
  })
  @IsString()
  movie_id: string;

  @ApiProperty({
    description: 'Id of cinema',
    type: 'string',
    example: '588ac3a02d029a6d15d0b5c4',
  })
  @IsString()
  cinema: string;

  @ApiProperty({
    description: 'Total price of tickets',
    type: 'number',
    example: '20.21',
  })
  @IsNumber()
  totalPrice: number;
}

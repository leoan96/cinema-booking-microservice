import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookingDTO } from './dto/booking.dto';
import { Booking, BookingDocument } from './schema/booking.schema';
import { createUUID } from 'src/shared/utils';
import * as axios from 'axios';
import { PaymentApiFactory } from 'api/payment';
import { ConfigService } from '@nestjs/config';

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
    private readonly configService: ConfigService,
  ) {}

  async bookTicket({
    city_id,
    time,
    movie_id,
    cinema,
    totalPrice,
  }: BookingDTO): Promise<BookingDocument> {
    const transactionId = createUUID();

    // https://jiratech.com/media/posts/integrate-openapi-specification-using-openapi-generator-to-a-reactjs-project-with-typescript-and-axios
    const accessToken = 'placeholder';
    const baseUrl = this.configService.get('booking.apiPaymentUrl');

    const axiosInstance = axios.default.create({
      headers: {
        'access-token': accessToken,
      },
    });

    const paymentApi = PaymentApiFactory(null, baseUrl, axiosInstance);

    try {
      await paymentApi.paymentControllerPayForBooking({
        totalPrice,
        transactionId,
      });
    } catch (err) {
      throw new ServiceUnavailableException(
        'Server is currently unavailable, plesase try again later...',
      );
    }

    const ticket = await this.bookingModel.create({
      city_id,
      time,
      movie_id,
      cinema,
      totalPrice,
      transactionId,
    });

    // TODO: call to api-notification to send email to user (using kafka)

    return ticket;
  }
}

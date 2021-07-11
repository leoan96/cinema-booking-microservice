export const bookingEnvironmentConfiguration = () => ({
  booking: {
    apiPaymentUrl: process.env.API_PAYMENT_URL || '',
  },
});

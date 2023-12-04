/*
  Enum for Order Status.

  - Defines various order status types using string constants.
  - Provides a list of possible order statuses.

  @module Enum
*/

// Enum for Order Status
const OrderStatusEnum = {
    CONFIRMED: 'Confirmed',
    PREPARED: 'Prepared',
    ENROUTE: 'Enroute',
    DELIVERED: 'Delivered',
  };
  
  // Export the OrderStatusEnum
  module.exports = OrderStatusEnum;
  
export interface OrderResponse {
  operation: string;
  status: string;
  order: {
    orderID: string;
    sessionID: string;
    url: string;
    orderURL: string;
  };
};

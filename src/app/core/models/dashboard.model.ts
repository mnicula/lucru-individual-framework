export interface DashboardModel {
  articles: number;
  bookings: number;
  events: number;
  metrics: Metrics[];
}

export interface Metrics {
  bookings: number;
  date: string;
  registeredUsers: number;
  userWhoBooked: number;
}

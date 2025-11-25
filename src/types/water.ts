/**
 * Types for water distribution system
 */

export interface Line {
  $id: string;
  name: string;
  description?: string;
  color?: string; // For UI display
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ScheduleStatus = "upcoming" | "ongoing" | "completed" | "cancelled";

export interface Schedule {
  $id: string;
  lineId: string;
  lineName?: string; // Denormalized for display
  startAt: string; // ISO UTC
  endAt: string; // ISO UTC
  status: ScheduleStatus;
  notes?: string;
  createdBy: string; // Telegram ID of creator
  createdAt: string;
  updatedAt: string;
}

export interface LineSubscriber {
  $id: string;
  telegramId: number;
  lineIds: string[];
  createdAt: string;
  updatedAt: string;
}

// UI Helper types
export interface LineWithSchedule extends Line {
  now?: Schedule;
  next?: Schedule;
}

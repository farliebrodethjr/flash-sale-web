export type Sale = {
  id: number;
  uuid: string;
  title: string;
  type: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
};

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEnded: boolean;
};

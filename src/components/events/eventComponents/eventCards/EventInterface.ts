export interface EventAttachmentI {
  attached_pid: string;
  file_url: string;
}

export interface EventVenueI {
  venue_name: string;
  venue_title: string;
  capacity: number;
  venue_address: string;
  ud_serialno: string | null;
  remarks: string | null;
  division_name: string | null;
  bn_division_name: string | null;
}

export interface EventTicketInfoI {
  event_name: string | null;
  ticket_amount: number;
  payment_method: string | null;
}

export interface EventNotificationI {

  notification_vanue: string;
  short_name: string | null;
  notification_media: string;
  notification_timefrom: string | null;
  notification_timeto: string | null;
  notification_days: number;
}

export interface EventScheduleI {
  event_desc: string | null;
  start_datetime: string;
  end_datetime: string;
  from_time: string;
  to_time: string;
  segment_name: string;
}

export interface EventI {
  event_pid: string;
  venue_pid: string;
  event_name: string;
  event_title: string;
  event_desc: string;
  vanue_name: string;
  category_pid: string;
  tage: string;
  ticket_type: string;
  attachments: EventAttachmentI;
  venues: EventVenueI[];
  tricket_info: EventTicketInfoI;
  notification: EventNotificationI;
  event_schedule: EventScheduleI;
}


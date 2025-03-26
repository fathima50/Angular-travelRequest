export interface Travelrequest {
    id: number;
    date_of_request: string;  // Make sure this matches your backend response
    from_location: string;
    to_location: string;
    status: string;
    travel_mode?: string;  // Optional properties use "?"
    additional_requests?: string;
    lodging_required?: boolean;
    lodging_location?: string;
    purpose_of_travel?: string;
    manager_notes?: string;
  }
  
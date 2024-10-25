export type ServiceType = "installation" | "new_installation" | "repair" | "other";

export type ServiceStatus = 
  | "open" 
  | "in_progress" 
  | "waiting_parts" 
  | "completed" 
  | "client_absent"
  | "post_visit_issues";

export interface Team {
  id: number;
  name: string;
}

export interface ServiceOrder {
  id: number;
  clientName: string;
  phone: string;
  isWhatsApp: boolean;
  address: string;
  serviceType: ServiceType;
  status: ServiceStatus;
  teamId?: number;
  materials?: string[];
  observations?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  role: "admin" | "team";
  teamId?: number;
}
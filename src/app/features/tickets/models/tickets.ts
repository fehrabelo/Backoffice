export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'aberto' | 'em progresso' | 'fechado';
  priority: 'baixa' | 'media' | 'alta';
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;    // userId
  assignedTo?: number;  // userId
}

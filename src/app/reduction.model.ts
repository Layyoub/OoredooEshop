export interface Reduction {
  codeReduction?: number;
  cleReduction?: string;
  montantReduction?: number;
  montantMinCommande?: number;
  etat?: number;
  creationDate?: string;
  joursValidity?: number;
  dateDebut?: string;
  dateFi?: string;
}

export interface ReductionBulkRequest {
  cleReduction?: string;
  montantReduction?: number;
  montantMinCommande?: number;
  etat?: number;
  creationDate?: string;
  joursValidity?: number;
  dateDebut?: string;
  dateFi?: string;
  numberOfVouchers: number;
}

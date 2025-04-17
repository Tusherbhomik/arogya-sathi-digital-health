
export interface HealthCard {
  id: string;
  patientId: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'suspended';
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  hospitalName: string;
  date: string;
  diagnosis: string;
  symptoms: string[];
  notes: string;
  followUpDate?: string;
  attachments?: string[];
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  hospitalName: string;
  date: string;
  expiryDate: string;
  medicines: Medicine[];
  instructions: string;
  status: 'active' | 'completed' | 'expired';
  verificationCode: string;
}

export interface Medicine {
  name: string;
  dosage: string;
  duration: string;
  frequency: string;
  notes?: string;
}

export interface PharmacyDispense {
  id: string;
  prescriptionId: string;
  pharmacyId: string;
  date: string;
  dispensedMedicines: {
    medicineId: string;
    medicineName: string;
    quantity: number;
    batchNumber: string;
  }[];
  verificationCode: string;
  status: 'completed' | 'partial';
}

export interface AuditRecord {
  id: string;
  type: 'prescription' | 'dispense' | 'access';
  entityId: string;
  actorId: string;
  actorRole: string;
  action: string;
  timestamp: string;
  details: Record<string, any>;
  flagged: boolean;
  reason?: string;
}


export type UserRole = 'patient' | 'doctor' | 'admin' | 'auditor' | 'pharmacy';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  phoneNumber?: string;
  nid?: string;
  email?: string;
  profileImage?: string;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  emergencyContact?: string;
  allergies: string[];
  chronicConditions: string[];
  healthCardId: string;
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  licenseNumber: string;
  hospital: string;
  yearsOfExperience: number;
  availableDays?: string[];
  rating?: number;
}

export interface Admin extends User {
  role: 'admin';
  department: string;
  accessLevel: number;
}

export interface Auditor extends User {
  role: 'auditor';
  department: string;
  accessLevel: number;
}

export interface Pharmacy extends User {
  role: 'pharmacy';
  licenseNumber: string;
  address: string;
  contactPerson: string;
}

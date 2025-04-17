
import { useState } from "react";
import { 
  FileText, 
  Calendar, 
  User, 
  PlusCircle, 
  Activity,
  Search,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HealthCard } from "@/components/health/HealthCard";
import { PrescriptionCard } from "@/components/prescriptions/PrescriptionCard";
import { Prescription } from "@/types/medical";
import { Patient } from "@/types/user";

export default function PatientHomePage() {
  // Mock patient data
  const [patient] = useState<Patient>({
    id: "pat123",
    name: "Rahul Ahmed",
    role: "patient",
    phoneNumber: "01700000000",
    nid: "1234567890",
    email: "rahul@example.com",
    dateOfBirth: "1990-05-15",
    gender: "male",
    bloodGroup: "O+",
    emergencyContact: "01800000000 (Spouse)",
    allergies: ["Penicillin", "Peanuts"],
    chronicConditions: ["Hypertension"],
    healthCardId: "HC-98765432"
  });

  // Mock prescription data
  const [prescriptions] = useState<Prescription[]>([
    {
      id: "presc-123",
      patientId: "pat123",
      doctorId: "Dr. Rahim Khan",
      hospitalName: "City Medical Center",
      date: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      medicines: [
        {
          name: "Amlodipine",
          dosage: "5mg",
          duration: "30 days",
          frequency: "Once daily",
          notes: "Take in the morning"
        },
        {
          name: "Aspirin",
          dosage: "75mg",
          duration: "30 days",
          frequency: "Once daily",
          notes: "Take after breakfast"
        }
      ],
      instructions: "Monitor blood pressure regularly. Follow up in 1 month.",
      status: "active",
      verificationCode: "ABC123"
    },
    {
      id: "presc-124",
      patientId: "pat123",
      doctorId: "Dr. Sadia Ahmed",
      hospitalName: "General Hospital",
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      expiryDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      medicines: [
        {
          name: "Paracetamol",
          dosage: "500mg",
          duration: "5 days",
          frequency: "Three times daily",
        }
      ],
      instructions: "Take if temperature exceeds 38°C.",
      status: "completed",
      verificationCode: "DEF456"
    }
  ]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-1.5">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {patient.name}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Records
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-2xl font-bold">12</div>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Next Appointment
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-sm font-medium">May 30, 2025</div>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Medications
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-2xl font-bold">2</div>
                <Activity className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Prescriptions</h2>
              <Button variant="ghost" size="sm" asChild>
                <a href="/prescriptions" className="flex items-center gap-1">
                  View All <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="space-y-4">
              {prescriptions.length > 0 ? (
                prescriptions.map((prescription) => (
                  <PrescriptionCard 
                    key={prescription.id} 
                    prescription={prescription} 
                  />
                ))
              ) : (
                <div className="text-center p-4 text-muted-foreground">
                  No prescriptions available.
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                Book Appointment
              </Button>
            </div>
            
            <div className="text-center p-8 text-muted-foreground border border-dashed rounded-md">
              You have no upcoming appointments.
              <br />
              <Button variant="link" className="mt-2">
                Book an appointment
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <HealthCard patient={patient} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{patient.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="font-medium">{formatDate(patient.dateOfBirth)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blood Group</p>
                <p className="font-medium">{patient.bloodGroup}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-medium">{patient.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Emergency Contact</p>
                <p className="font-medium">{patient.emergencyContact}</p>
              </div>
              
              <div className="pt-2">
                <h3 className="font-medium mb-2">Medical Information</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Allergies</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {patient.allergies.length > 0 ? (
                        patient.allergies.map((allergy, i) => (
                          <span 
                            key={i} 
                            className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded"
                          >
                            {allergy}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm">None recorded</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Chronic Conditions</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {patient.chronicConditions.length > 0 ? (
                        patient.chronicConditions.map((condition, i) => (
                          <span 
                            key={i} 
                            className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded"
                          >
                            {condition}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm">None recorded</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <User className="h-4 w-4" />
                View Full Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

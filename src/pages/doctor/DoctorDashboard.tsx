
import { useState } from "react";
import {
  Calendar,
  Users,
  FileText,
  Clock,
  ChevronRight,
  Search,
  Plus,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MedicalRecordForm } from "@/components/medical/MedicalRecordForm";
import { MedicalRecord } from "@/types/medical";

export default function DoctorDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewRecordForm, setShowNewRecordForm] = useState(false);
  
  // Mock data for patients
  const patients = [
    { id: "PAT001", name: "Rahul Ahmed", age: 45, lastVisit: "2025-04-10", condition: "Hypertension" },
    { id: "PAT002", name: "Fatima Khan", age: 32, lastVisit: "2025-04-12", condition: "Pregnancy (2nd trimester)" },
    { id: "PAT003", name: "Kamal Hossain", age: 58, lastVisit: "2025-04-14", condition: "Diabetes Type 2" },
    { id: "PAT004", name: "Nusrat Jahan", age: 27, lastVisit: "2025-04-15", condition: "Migraine" }
  ];
  
  // Mock data for appointments today
  const todaysAppointments = [
    { id: "APT001", patientName: "Rahul Ahmed", time: "10:30 AM", status: "completed", type: "Follow-up" },
    { id: "APT002", patientName: "Mina Begum", time: "11:45 AM", status: "completed", type: "Consultation" },
    { id: "APT003", patientName: "Kamal Hossain", time: "02:15 PM", status: "waiting", type: "Follow-up" },
    { id: "APT004", patientName: "Sohel Rana", time: "03:30 PM", status: "upcoming", type: "New Patient" }
  ];
  
  // Filter patients based on search query
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle form submission for new medical record
  const handleSaveRecord = (record: MedicalRecord) => {
    console.log("New medical record:", record);
    setShowNewRecordForm(false);
    // Here you would typically save this to your backend
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Doctor Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your patients and appointments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            View Schedule
          </Button>
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            New Prescription
          </Button>
        </div>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              4 remaining
            </p>
          </CardContent>
          <CardFooter>
            <Users className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-xs text-muted-foreground">8 completed</span>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Recent Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">26</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
          <CardFooter>
            <FileText className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-xs text-muted-foreground">12 new this week</span>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Next Appointment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">Kamal Hossain</div>
            <p className="text-xs text-muted-foreground">
              Follow-up consultation
            </p>
          </CardContent>
          <CardFooter>
            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-xs text-muted-foreground">In 15 minutes</span>
          </CardFooter>
        </Card>
      </div>
      
      <Tabs defaultValue="appointments">
        <TabsList className="mb-4">
          <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
          <TabsTrigger value="patients">Recent Patients</TabsTrigger>
          <TabsTrigger value="records">Add Record</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appointments" className="space-y-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Appointments for Today</h2>
            </div>
            
            <div className="divide-y">
              {todaysAppointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-medium text-blue-700">
                        {appointment.patientName.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    
                    <div>
                      <p className="font-medium">{appointment.patientName}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{appointment.time}</span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Badge 
                      className={
                        appointment.status === "completed" 
                          ? "bg-green-100 text-green-800 hover:bg-green-100" 
                          : appointment.status === "waiting" 
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" 
                          : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      }
                    >
                      {appointment.status === "completed" ? "Completed" :
                       appointment.status === "waiting" ? "Waiting" : "Upcoming"}
                    </Badge>
                    
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="patients" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search patients..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              Add New Patient
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Recent Patients</h2>
            </div>
            
            <div className="divide-y">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <div 
                    key={patient.id} 
                    className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="font-medium text-blue-700">
                          {patient.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{patient.name}</p>
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            {patient.age} years
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            Last visit: {formatDate(patient.lastVisit)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {patient.condition}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">View Records</Button>
                      <Button size="sm">Add Record</Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  No patients found matching your search.
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="records">
          <MedicalRecordForm onSave={handleSaveRecord} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

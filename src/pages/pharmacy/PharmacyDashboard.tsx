
import { useState } from "react";
import { 
  Search, 
  CheckCircle, 
  Clock, 
  XCircle,
  AlertCircle,
  FileText,
  Pill
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { VerifyPrescription } from "@/components/pharmacy/VerifyPrescription";
import { Prescription } from "@/types/medical";

export default function PharmacyDashboard() {
  const [verifiedPrescription, setVerifiedPrescription] = useState<Prescription | null>(null);
  const [dispensed, setDispensed] = useState<string[]>([]);

  // Mock data for recently verified prescriptions
  const recentlyVerified = [
    { id: "RX12345", patientName: "Rahul Ahmed", date: "2025-04-17", items: 3, status: "dispensed" },
    { id: "RX12346", patientName: "Shabana Begum", date: "2025-04-17", items: 2, status: "dispensed" },
    { id: "RX12347", patientName: "Kamal Hossain", date: "2025-04-17", items: 4, status: "verified" },
    { id: "RX12348", patientName: "Anika Rahman", date: "2025-04-17", items: 1, status: "expired" },
  ];

  // Handle prescription verification
  const handleVerifyPrescription = (prescription: Prescription | null) => {
    setVerifiedPrescription(prescription);
  };

  // Handle medicine dispensation
  const handleDispenseMedicine = (medicineIndex: number) => {
    setDispensed(prev => [...prev, medicineIndex.toString()]);
  };

  // Handle complete dispensation
  const handleCompleteDispensation = () => {
    alert("Dispensation recorded successfully!");
    setVerifiedPrescription(null);
    setDispensed([]);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-1.5">
        <h1 className="text-2xl md:text-3xl font-bold">Pharmacy Dashboard</h1>
        <p className="text-muted-foreground">
          Verify prescriptions and dispense medicines
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Prescriptions Today
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-2xl font-bold">24</div>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Medicines Dispensed
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-2xl font-bold">76</div>
            <Pill className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Verification Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
              <div className="h-full bg-healthcare-green rounded-full" style={{ width: '98.5%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="verify">
        <TabsList>
          <TabsTrigger value="verify">Verify Prescription</TabsTrigger>
          <TabsTrigger value="history">Recent History</TabsTrigger>
        </TabsList>
        <TabsContent value="verify" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VerifyPrescription onVerify={handleVerifyPrescription} />
            
            {verifiedPrescription ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Verified Prescription</h2>
                    <p className="text-sm text-muted-foreground">
                      Verification Code: <span className="font-mono">{verifiedPrescription.verificationCode}</span>
                    </p>
                  </div>
                  <Badge className="bg-healthcare-green">Valid</Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Patient ID</p>
                      <p>{verifiedPrescription.patientId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Doctor</p>
                      <p>{verifiedPrescription.doctorId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Issued</p>
                      <p>{new Date(verifiedPrescription.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hospital</p>
                      <p>{verifiedPrescription.hospitalName}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Medicines to Dispense</h3>
                    <div className="space-y-2">
                      {verifiedPrescription.medicines.map((medicine, index) => (
                        <div 
                          key={index}
                          className={`flex justify-between items-center p-3 rounded-md ${
                            dispensed.includes(index.toString()) 
                              ? "bg-green-50 border border-green-100" 
                              : "bg-muted"
                          }`}
                        >
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{medicine.name}</p>
                              {dispensed.includes(index.toString()) && (
                                <CheckCircle className="ml-2 h-4 w-4 text-healthcare-green" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {medicine.dosage}, {medicine.frequency}, {medicine.duration}
                            </p>
                          </div>
                          <Button
                            variant={dispensed.includes(index.toString()) ? "outline" : "default"}
                            size="sm"
                            onClick={() => handleDispenseMedicine(index)}
                            disabled={dispensed.includes(index.toString())}
                          >
                            {dispensed.includes(index.toString()) ? "Dispensed" : "Dispense"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Instructions</h3>
                    <p className="text-sm bg-muted p-3 rounded-md">
                      {verifiedPrescription.instructions}
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full"
                    disabled={dispensed.length !== verifiedPrescription.medicines.length}
                    onClick={handleCompleteDispensation}
                  >
                    Complete Dispensation
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
                <div className="text-center max-w-xs">
                  <div className="bg-muted h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Prescription Verified</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter a valid verification code to view prescription details and dispense medicines.
                  </p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="history">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recently Verified Prescriptions</h2>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by ID or name..."
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="divide-y">
              {recentlyVerified.map(prescription => (
                <div 
                  key={prescription.id}
                  className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm">{prescription.id}</p>
                      <p className="font-medium">{prescription.patientName}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <p>{prescription.date}</p>
                      <span>•</span>
                      <p>{prescription.items} items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={
                        prescription.status === "dispensed" 
                          ? "bg-healthcare-green text-white" 
                          : prescription.status === "verified"
                          ? "bg-healthcare-blue text-white" 
                          : "bg-healthcare-red text-white"
                      }
                    >
                      <span className="flex items-center gap-1">
                        {prescription.status === "dispensed" ? (
                          <>
                            <CheckCircle className="h-3 w-3" />
                            <span>Dispensed</span>
                          </>
                        ) : prescription.status === "verified" ? (
                          <>
                            <Clock className="h-3 w-3" />
                            <span>Verified</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3" />
                            <span>Expired</span>
                          </>
                        )}
                      </span>
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

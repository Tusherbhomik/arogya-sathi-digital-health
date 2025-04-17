
import { useState } from "react";
import { 
  BarChart3, 
  Users, 
  Shield,
  AlertTriangle,
  UserPlus,
  Pill,
  FileText,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuditTable } from "@/components/admin/AuditTable";
import { AuditRecord } from "@/types/medical";

export default function AdminDashboard() {
  // Mock audit records
  const [auditRecords] = useState<AuditRecord[]>([
    {
      id: "audit-001",
      type: "prescription",
      entityId: "presc-123456",
      actorId: "doc-246810",
      actorRole: "doctor",
      action: "Created new prescription",
      timestamp: new Date().toISOString(),
      details: {
        patientId: "pat-987654",
        medicines: ["Amoxicillin", "Paracetamol"]
      },
      flagged: false
    },
    {
      id: "audit-002",
      type: "dispense",
      entityId: "disp-789012",
      actorId: "pharm-135790",
      actorRole: "pharmacy",
      action: "Dispensed medicine",
      timestamp: new Date().toISOString(),
      details: {
        prescriptionId: "presc-123456",
        medicines: ["Amoxicillin", "Paracetamol"]
      },
      flagged: false
    },
    {
      id: "audit-003",
      type: "access",
      entityId: "record-345678",
      actorId: "doc-246810",
      actorRole: "doctor",
      action: "Accessed patient record",
      timestamp: new Date().toISOString(),
      details: {
        patientId: "pat-987654",
        reason: "Consultation"
      },
      flagged: false
    },
    {
      id: "audit-004",
      type: "prescription",
      entityId: "presc-234567",
      actorId: "doc-357911",
      actorRole: "doctor",
      action: "Created new prescription with unusual dosage",
      timestamp: new Date().toISOString(),
      details: {
        patientId: "pat-876543",
        medicines: ["Oxycodone", "Diazepam"],
        dosage: "High"
      },
      flagged: true,
      reason: "Unusual prescription pattern detected"
    }
  ]);

  return (
    <div className="space-y-6">
      <header className="space-y-1.5">
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor system usage and audit records
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,842</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 text-healthcare-green mr-1" />
              <span className="text-healthcare-green font-medium">+18%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,453</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 text-healthcare-green mr-1" />
              <span className="text-healthcare-green font-medium">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Dispensations</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,719</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 text-healthcare-green mr-1" />
              <span className="text-healthcare-green font-medium">+7%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Flagged Activities</CardTitle>
            <AlertTriangle className="h-4 w-4 text-healthcare-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownRight className="h-3 w-3 text-healthcare-red mr-1" />
              <span className="text-healthcare-red font-medium">-3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>System access by user type over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="h-full flex items-center justify-center">
                <div className="space-y-2 text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Analytics chart will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>Quick statistics and actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pharmacy compliance</span>
                  <span className="font-medium">98.3%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full">
                  <div className="h-2 bg-healthcare-blue rounded-full" style={{ width: '98.3%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Doctor compliance</span>
                  <span className="font-medium">96.7%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full">
                  <div className="h-2 bg-healthcare-blue rounded-full" style={{ width: '96.7%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Digital adoption</span>
                  <span className="font-medium">78.4%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full">
                  <div className="h-2 bg-healthcare-blue rounded-full" style={{ width: '78.4%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" className="w-full flex items-center gap-1">
                  <UserPlus className="h-4 w-4" />
                  <span>Add User</span>
                </Button>
                <Button size="sm" variant="outline" className="w-full flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span>Permissions</span>
                </Button>
                <Button size="sm" variant="outline" className="w-full flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  <span>Reports</span>
                </Button>
                <Button size="sm" variant="outline" className="w-full flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Alerts</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="audit">
        <TabsList>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Events</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="audit" className="space-y-4">
          <AuditTable records={auditRecords} />
        </TabsContent>
        <TabsContent value="flagged">
          <AuditTable records={auditRecords.filter(record => record.flagged)} />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Reports</CardTitle>
              <CardDescription>Generate and download system reports</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Monthly Usage Report</h3>
                    <p className="text-sm text-muted-foreground">
                      Overall system usage statistics by user role
                    </p>
                  </div>
                  <Button>Generate</Button>
                </div>
                
                <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Prescription Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      Patterns of prescriptions across different regions
                    </p>
                  </div>
                  <Button>Generate</Button>
                </div>
                
                <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Suspicious Activity Report</h3>
                    <p className="text-sm text-muted-foreground">
                      Detailed analysis of flagged activities
                    </p>
                  </div>
                  <Button>Generate</Button>
                </div>
                
                <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">System Performance</h3>
                    <p className="text-sm text-muted-foreground">
                      Technical metrics and uptime statistics
                    </p>
                  </div>
                  <Button>Generate</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

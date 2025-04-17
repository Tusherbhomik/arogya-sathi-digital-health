
import { useState } from "react";
import { Prescription } from "@/types/medical";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  FileText,
  User,
  Building,
  Check,
  Download,
  Printer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PrescriptionCardProps {
  prescription: Prescription;
}

export function PrescriptionCard({ prescription }: PrescriptionCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-healthcare-green text-white";
      case "completed":
        return "bg-healthcare-blue text-white";
      case "expired":
        return "bg-healthcare-red text-white";
      default:
        return "bg-healthcare-gray text-foreground";
    }
  };

  // Mock functions for download and print
  const handleDownload = () => {
    console.log("Downloading prescription:", prescription.id);
    // Actual download implementation would go here
  };

  const handlePrint = () => {
    console.log("Printing prescription:", prescription.id);
    // Actual print implementation would go here
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setDialogOpen(true)}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-healthcare-blue" />
            <h3 className="font-medium">Prescription</h3>
          </div>
          <Badge className={getStatusColor(prescription.status)}>
            {prescription.status}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>{formatDate(prescription.date)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span>Dr. {prescription.doctorId}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-gray-500" />
            <span>{prescription.hospitalName}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            {prescription.medicines.length} medicines prescribed
          </p>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Prescription Details</DialogTitle>
            <DialogDescription>
              Issued on {formatDate(prescription.date)}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Doctor</p>
                <p className="font-medium">Dr. {prescription.doctorId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hospital</p>
                <p className="font-medium">{prescription.hospitalName}</p>
              </div>
              <Badge className={getStatusColor(prescription.status)}>
                {prescription.status}
              </Badge>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Medicines</h4>
              <div className="space-y-2">
                {prescription.medicines.map((medicine, index) => (
                  <div 
                    key={index} 
                    className="bg-muted rounded-md p-3"
                  >
                    <div className="flex justify-between">
                      <p className="font-medium">{medicine.name}</p>
                      <p className="text-sm">{medicine.dosage}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {medicine.frequency} for {medicine.duration}
                    </p>
                    {medicine.notes && (
                      <p className="text-xs mt-1 text-muted-foreground">
                        Note: {medicine.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Instructions</h4>
              <p className="text-sm bg-muted rounded-md p-3">
                {prescription.instructions}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-muted px-3 py-1.5 rounded text-sm font-mono flex items-center gap-1.5">
                <Check className="h-4 w-4 text-healthcare-green" />
                Verification Code: {prescription.verificationCode}
              </div>
              <p className="text-xs text-muted-foreground">
                Show this code at the pharmacy
              </p>
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDownload}
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handlePrint}
                className="flex items-center gap-1"
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button 
                onClick={() => setDialogOpen(false)}
              >
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

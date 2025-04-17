
import { MedicalRecord } from "@/types/medical";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, File, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MedicalRecordCardProps {
  record: MedicalRecord;
  onClick?: () => void;
}

export function MedicalRecordCard({ record, onClick }: MedicalRecordCardProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{record.diagnosis}</CardTitle>
          <Badge variant="outline">{formatDate(record.date)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(record.date)}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <File className="h-4 w-4 text-muted-foreground" />
          <span>Dr. {record.doctorId}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-1">
            {record.symptoms.map((symptom, index) => (
              <span
                key={index}
                className="bg-muted px-1.5 py-0.5 rounded-sm text-xs"
              >
                {symptom}
              </span>
            ))}
          </div>
        </div>
        
        <p className="text-sm border-t pt-2 mt-2 line-clamp-2">
          {record.notes}
        </p>
      </CardContent>
    </Card>
  );
}

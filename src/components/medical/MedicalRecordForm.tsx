
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MedicalRecord } from "@/types/medical";

const medicalRecordSchema = z.object({
  patientId: z.string().min(1, "Patient ID is required"),
  diagnosis: z.string().min(3, "Diagnosis is required"),
  symptoms: z.string().min(3, "Symptoms are required"),
  notes: z.string().min(3, "Notes are required"),
  date: z.date(),
  followUpDate: z.date().optional(),
});

type MedicalRecordFormValues = z.infer<typeof medicalRecordSchema>;

interface MedicalRecordFormProps {
  onSave: (record: MedicalRecord) => void;
  patient?: { id: string; name: string };
}

export function MedicalRecordForm({ onSave, patient }: MedicalRecordFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Form setup
  const form = useForm<MedicalRecordFormValues>({
    resolver: zodResolver(medicalRecordSchema),
    defaultValues: {
      patientId: patient?.id || "",
      diagnosis: "",
      symptoms: "",
      notes: "",
      date: new Date(),
    },
  });

  // Handle form submission
  const onSubmit = async (data: MedicalRecordFormValues) => {
    setIsLoading(true);
    try {
      // Parse symptoms from comma-separated string to array
      const symptoms = data.symptoms.split(",").map(s => s.trim());
      
      // Create medical record
      const record: MedicalRecord = {
        id: `record-${Date.now()}`,
        patientId: data.patientId,
        doctorId: "doctor-123", // This would come from authentication in a real app
        hospitalName: "City Medical Center", // This would come from doctor profile in a real app
        date: data.date.toISOString(),
        diagnosis: data.diagnosis,
        symptoms,
        notes: data.notes,
        followUpDate: data.followUpDate?.toISOString(),
        attachments: [],
      };
      
      // Save record
      onSave(record);
      form.reset();
    } catch (error) {
      console.error("Error saving medical record:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {patient ? `Add Medical Record for ${patient.name}` : "Add Medical Record"}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="patientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient ID</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter patient ID" 
                    {...field} 
                    disabled={!!patient}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="followUpDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Follow-up Date (Optional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a follow-up date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select a date for patient's follow-up visit
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="diagnosis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diagnosis</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter primary diagnosis" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="symptoms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Symptoms</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter symptoms, separated by commas" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  List all symptoms separated by commas (e.g., fever, headache, cough)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter detailed notes about the patient's condition and treatment" 
                    className="min-h-32"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Record"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

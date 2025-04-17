
import { Patient } from "@/types/user";

interface HealthCardProps {
  patient: Patient;
}

export function HealthCard({ patient }: HealthCardProps) {
  return (
    <div className="health-card-bg rounded-xl text-white shadow-lg p-6 max-w-md w-full overflow-hidden relative">
      {/* Card header with logo and ID */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-healthcare-blue font-bold text-lg">AS</span>
          </div>
          <div>
            <h3 className="text-sm font-medium opacity-80">Arogya Sathi</h3>
            <h2 className="text-lg font-bold">Digital Health Card</h2>
          </div>
        </div>
        
        <div className="text-right">
          <span className="text-xs opacity-70">Card ID</span>
          <p className="text-sm font-mono">{patient.healthCardId}</p>
        </div>
      </div>
      
      {/* Patient details */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">{patient.name}</h3>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <span className="text-xs opacity-70">Date of Birth</span>
            <p className="text-sm">{patient.dateOfBirth}</p>
          </div>
          <div>
            <span className="text-xs opacity-70">Gender</span>
            <p className="text-sm capitalize">{patient.gender}</p>
          </div>
          <div>
            <span className="text-xs opacity-70">Blood Group</span>
            <p className="text-sm">{patient.bloodGroup || 'Not specified'}</p>
          </div>
          <div>
            <span className="text-xs opacity-70">NID</span>
            <p className="text-sm">{patient.nid}</p>
          </div>
        </div>
      </div>
      
      {/* Emergency contact */}
      <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
        <h4 className="text-sm font-medium mb-1">Emergency Contact</h4>
        <p className="text-sm">{patient.emergencyContact || 'Not specified'}</p>
      </div>
      
      {/* Card footer with verification hint */}
      <div className="mt-6 text-xs text-center opacity-70">
        Scan QR code to verify details. Health card valid nationwide.
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 border-4 border-white/30 rounded-full opacity-30"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white/20 rounded-full opacity-20"></div>
    </div>
  );
}

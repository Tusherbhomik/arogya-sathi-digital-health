
import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-healthcare-blue flex items-center justify-center">
            <span className="text-white font-bold text-xl">AS</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-1">Arogya Sathi</h1>
        <p className="text-muted-foreground">Digital Health Management System</p>
      </div>

      <div className="w-full max-w-md">
        <AuthForm />
      </div>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Arogya Sathi helps patients, doctors and pharmacies manage healthcare
          <br /> while ensuring security and transparency.
        </p>
      </div>
    </div>
  );
}

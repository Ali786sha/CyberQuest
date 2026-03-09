import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background grid-lines flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neon pulse-neon mb-2">
            CYBER LEARN
          </h1>
          <p className="text-muted-foreground">Advanced Gaming Education Platform</p>
        </div>
        <div className="card-cyber">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
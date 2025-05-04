"use client";

import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { ResumeGenerator } from "../components/ui/resume-generator";

export default function Dashboard() {
  const { isSignedIn, isLoaded } = useAuth();

  // Show a loading state while Clerk is determining the user's authentication status
  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Redirect to the login page if the user is not signed in
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  // Render the dashboard for authenticated users
  return (
    <main className="min-h-screen w-full overflow-hidden bg-transparent">
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4">
        <ResumeGenerator />
      </div>
    </main>
  );
}
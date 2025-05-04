"use client";

import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tl from-black via-zinc-950 to-blue-950">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            card: "bg-gray-800 text-white shadow-lg",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
          },
        }}
      />
    </div>
  );
}
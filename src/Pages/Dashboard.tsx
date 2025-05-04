"use client"

import { ResumeGenerator } from "../components/ui/resume-generator"

export default function Dashboard() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-transparent">
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4">
        <ResumeGenerator />
      </div>
    </main>
  )
}

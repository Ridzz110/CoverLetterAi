"use client"

import { useState } from "react"
import { Button } from "./button"
import { Card } from "./card"
import { Textarea } from "./textarea"
import { FileUploader } from "./file-uploader"
import { ResumeOutput } from "./resume-output"
import { Loader2, FileText, Sparkles } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export function ResumeGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [cvUploaded, setCvUploaded] = useState(false)
  const [tailoredResume, setTailoredResume] = useState("")
  const [showOutput, setShowOutput] = useState(false)

  const handleGenerate = () => {
    if (!cvUploaded || !jobDescription.trim()) return

    setIsGenerating(true)

    // Simulate API call to generate resume
    setTimeout(() => {
      setTailoredResume(
        `# John Doe\n\n**Software Engineer**\n\njohn.doe@example.com | (123) 456-7890 | linkedin.com/in/johndoe\n\n## Summary\n\nResults-driven software engineer with 5+ years of experience in web development. Proficient in React, Node.js, and cloud technologies with a strong focus on creating scalable and maintainable applications.\n\n## Experience\n\n### Senior Frontend Developer | TechCorp\n*Jan 2021 - Present*\n\n- Led development of responsive web applications using React and TypeScript\n- Implemented CI/CD pipelines reducing deployment time by 40%\n- Mentored junior developers and conducted code reviews\n\n### Software Engineer | WebSolutions Inc.\n*Mar 2018 - Dec 2020*\n\n- Developed and maintained RESTful APIs using Node.js and Express\n- Collaborated with UX designers to implement user-friendly interfaces\n- Optimized database queries resulting in 30% performance improvement\n\n## Skills\n\n- **Frontend**: React, TypeScript, HTML5, CSS3, Tailwind CSS\n- **Backend**: Node.js, Express, RESTful APIs\n- **Database**: MongoDB, PostgreSQL\n- **Tools**: Git, Docker, AWS, CI/CD\n\n## Education\n\n**Bachelor of Science in Computer Science**\n*University of Technology, 2018*`,
      )
      setIsGenerating(false)
      setShowOutput(true)
    }, 2000)
  }

  const handleReset = () => {
    setShowOutput(false)
    setJobDescription("")
    setCvUploaded(false)
    setTailoredResume("")
  }

  return (
    <AnimatePresence mode="wait">
      {!showOutput ? (
        <motion.div
          key="input"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="overflow-hidden border-0 bg-black/40 p-6 backdrop-blur-md w-full">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white">Cover Letter Tailoring AI</h1>
              <p className="mt-2 text-gray-300">Generate the perfect Cover Letters for your dream job</p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-300" />
                  <h3 className="font-medium text-white">Upload Your CV</h3>
                </div>
                <FileUploader onUploadSuccess={() => setCvUploaded(true)} />
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="font-medium text-white">Job Description</h3>
                </div>
                <Textarea
                  placeholder="Paste the job description here..."
                  className="min-h-[120px] resize-none bg-gray-900/60 text-white placeholder:text-gray-400"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <Button
                className="w-full bg-blue-950"
                onClick={handleGenerate}
                disabled={isGenerating || !cvUploaded || !jobDescription.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Tailored Resume
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          key="output"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl"
        >
          <ResumeOutput content={tailoredResume} onReset={handleReset} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

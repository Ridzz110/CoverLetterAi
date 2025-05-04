// Full component with updated file handling

"use client"

import { useState } from "react"
import { Button } from "./button"
import { Card } from "./card"
import { Textarea } from "./textarea"
import { FileUploader } from "./file-uploader"
import { ResumeOutput } from "./resume-output"
import { Loader2, FileText, Sparkles } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import axios from "axios" 

export function ResumeGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [cvUploaded, setCvUploaded] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [tailoredResume, setTailoredResume] = useState("")
  const [showOutput, setShowOutput] = useState(false)

  const handleFileUploadSuccess = (file: File) => {
    setCvFile(file)
    setCvUploaded(true)
  }

  const handleGenerate = async () => {
    if (!cvUploaded || !cvFile || !jobDescription.trim()) {
      // Show error or notification to user
      return
    }

    setIsGenerating(true)

    try {
      // Create FormData object
      const formData = new FormData()
      formData.append("resume", cvFile)
      formData.append("jd_text", jobDescription)

      // Make POST request to FastAPI backend
      const response = await axios.post("https://coverletterapi.onrender.com/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Handle successful response
      setTailoredResume(response.data.result)
      setIsGenerating(false)
      setShowOutput(true)
    } catch (error) {
      console.error("Error generating cover letter:", error)
      setIsGenerating(false)
      // Show error message to user
      alert("Failed to generate cover letter. Please try again.")
    }
  }

  const handleReset = () => {
    setShowOutput(false)
    setJobDescription("")
    setCvUploaded(false)
    setCvFile(null)
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
                <FileUploader onUploadSuccess={handleFileUploadSuccess} />
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
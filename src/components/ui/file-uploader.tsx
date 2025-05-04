"use client"

import type React from "react"
import { useState } from "react"
import { Upload, Check, AlertCircle } from "lucide-react"

interface FileUploaderProps {
  onUploadSuccess: (file: File) => void
}

export function FileUploader({ onUploadSuccess }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    handleFile(droppedFile)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    setError(null)

    // Check file type (PDF, DOCX, etc.)
    const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    if (!validTypes.includes(file.type)) {
      setError("Please upload a PDF or DOCX file")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB")
      return
    }
    setFile(file)
    onUploadSuccess(file) // Pass the file object to the parent component
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${
        isDragging
          ? "border-purple-400 bg-purple-900/20"
          : error
            ? "border-red-400 bg-red-900/20"
            : file
              ? "border-green-400 bg-green-900/20"
              : "border-gray-600 bg-gray-800/40 hover:border-gray-500 hover:bg-gray-800/60"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {file ? (
        <div className="flex flex-col items-center text-center">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-900/50">
            <Check className="h-5 w-5 text-green-400" />
          </div>
          <p className="mb-1 font-medium text-white">{file.name}</p>
          <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center text-center">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-900/50">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <p className="mb-1 font-medium text-red-300">{error}</p>
          <p className="text-sm text-red-400">Please try again with a valid file</p>
        </div>
      ) : (
        <>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
            <Upload className="h-5 w-5 text-purple-300" />
          </div>
          <p className="mb-1 text-sm font-medium text-gray-200">Drag and drop your CV here</p>
          <p className="mb-3 text-xs text-gray-400">Supports PDF, DOCX (Max 5MB)</p>
          <label className="cursor-pointer rounded-md bg-gray-800 px-3 py-1.5 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-gray-700 hover:bg-gray-700">
            Browse Files
            <input
              type="file"
              className="hidden"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileInput}
            />
          </label>
        </>
      )}
    </div>
  )
}
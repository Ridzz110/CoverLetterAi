"use client"

import { useEffect, useRef } from "react"
import { Button } from "./button"
import { Download, Copy, Printer } from "lucide-react"
import { marked } from "marked"

interface ResumePreviewProps {
  content: string
}

export function ResumePreview({ content }: ResumePreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const parseContent = async () => {
      if (previewRef.current) {
        const parsedContent = await marked.parse(content); // Await if parse is asynchronous
        previewRef.current.innerHTML = parsedContent;
      }
    };
  
    parseContent();
  }, [content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
  }

  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Resume</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
              }
              h1, h2, h3 { margin-top: 0; }
              h1 { font-size: 24px; }
              h2 { font-size: 20px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
              h3 { font-size: 18px; }
              p { margin: 0 0 10px; }
              ul { padding-left: 20px; }
              @media print {
                body { padding: 0; }
              }
            </style>
          </head>
          <body>
            ${marked.parse(content)}
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
    }
  }

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "tailored-resume.md"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </Button>
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>

      <div className="max-h-[500px] overflow-y-auto rounded-lg border border-gray-200 bg-white p-6">
        <div ref={previewRef} className="prose prose-gray max-w-none" />
      </div>
    </div>
  )
}

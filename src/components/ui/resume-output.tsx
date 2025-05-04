"use client"

import { useEffect, useRef } from "react"
import { Button } from "./button"
import { Card } from "./card"
import { Download, Copy, Printer, RefreshCw } from "lucide-react"
import { marked } from "marked"

interface ResumeOutputProps {
  content: string
  onReset: () => void
}

export function ResumeOutput({ content, onReset }: ResumeOutputProps) {
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
    <Card className="overflow-hidden border-0 bg-black/40 backdrop-blur-md">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Your Tailored Resume</h2>
          <Button variant="ghost" size="icon" onClick={onReset} className="text-gray-300 hover:text-white">
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="border-gray-700 bg-gray-800/60 text-gray-200 hover:bg-gray-700 hover:text-white"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="border-gray-700 bg-gray-800/60 text-gray-200 hover:bg-gray-700 hover:text-white"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="border-gray-700 bg-gray-800/60 text-gray-200 hover:bg-gray-700 hover:text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto rounded-lg border border-gray-700 bg-gray-900/60 p-6">
          <div
            ref={previewRef}
            className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-purple-300"
          />
        </div>
      </div>
    </Card>
  )
}

'use client'

import { Upload } from "lucide-react";

export default function FileUploader() {

  function handleFileUpload() {
    const ele = document.createElement('input');
    ele.setAttribute('type', 'file');
    ele.setAttribute('accept', 'application/pdf');
    ele.addEventListener("change", async (e) => {
      const file = ele.files?.item(0);
      if (file) {
        const formData = new FormData();
        formData.append('pdf', file)

        await fetch('http://localhost:4000/upload/pdf', { method: 'POST', body: formData })
        console.log("file uploaded")
      }
    })
    ele.click();
  }
  return (
    <div className="min-h-full flex items-center justify-center">
      <div onClick={handleFileUpload} className="flex flex-col items-center gap-1 cursor-pointer">
        <Upload size={30} />
        <h3>Upload a PDF file</h3>
      </div>
    </div>
  )
}

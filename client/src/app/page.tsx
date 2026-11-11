import FileUploader from "@/components/FileUploader";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-end">
      <nav><UserButton /></nav>
      <div className="min-h-screen min-w-full flex justify-between">
        {/* left */}
        <div className="flex-1">
          <FileUploader />
        </div>
        {/* right */}
        <div className="flex-3 border-2 border-white"></div>
      </div>
    </div>
  )
}

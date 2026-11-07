import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <nav><UserButton /></nav>
      <div>
        {/* left */}
        <div></div>
        {/* right */}
        <div></div>
      </div>
    </div>
  )
}

import Link from "next/link"
import { ArrowLeft, FolderSearch } from "lucide-react"
import { Container } from "@/components/Container"

export default function ProjectNotFound() {
  return (
    <main className="min-h-dvh pt-24 pb-24 flex items-center">
      <Container className="max-w-xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#2b7fff]/10 border border-[#2b7fff]/20 flex items-center justify-center mx-auto mb-6">
          <FolderSearch className="w-8 h-8 text-[#2b7fff]" />
        </div>
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-3">Project Not Found</h1>
        <p className="text-[#94A3B8] mb-8">
          The project you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F8FAFC] hover:border-[#2b7fff]/40 hover:text-[#2b7fff] transition-all duration-300 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
      </Container>
    </main>
  )
}

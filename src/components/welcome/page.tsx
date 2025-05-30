import { Button } from "@/components/ui/button"
import { GraduationCap, Users, Award, Globe } from "lucide-react"
import Link from "next/link"

const  WelcomeHero = ()=> {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Join
            <span className="block text-yellow-400">The Largest SDA Institution in Africa</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            A community of innovators, scholars, and leaders. At BugemaUniversity, we don't just prepare you for
            your career—we prepare spiritually and intellectually
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg"
              asChild
            >
              <Link href="https://erms.bugemauniv.ac.ug/application/">Start Your Application</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
              asChild
            >
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold">1,000+</div>
              <div className="text-sm text-blue-200">Students</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <GraduationCap className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold">100+</div>
              <div className="text-sm text-blue-200">Programs</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Award className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm text-blue-200">Job Placement</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Globe className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold">10+</div>
              <div className="text-sm text-blue-200">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default WelcomeHero
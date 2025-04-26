"use client"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { useSendMail } from "@/hooks/useSendMail"
import useAddEmail from "@/hooks/useAddEmail"
import { useState } from "react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [useremail,setuseremail] = useState("")
  const[submitting,setIsSubmitting] = useState(false)
  const {sendEmail}  = useSendMail()
  const AddEmail= useAddEmail()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setuseremail(e.target.value) 
  }
  
  const cleanForm = () => {
        setuseremail("")
      }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsSubmitting(true)
  
      try {
        AddEmail(useremail)
        sendEmail(useremail, "Welcome to ShopCheap - Thanks for Subscribing!", `Hi ${useremail},

Thank you for subscribing to ShopCheap! We're thrilled to have you on board.

Now, you'll be the first to receive exclusive updates, tips, promotions, or industry insights. Expect valuable content delivered straight to your inbox .

If you ever have questions or feedback, just reply to this email—we'd love to hear from you!\n

Thanks again for joining us. Stay tuned for your first edition!\n

Best regards,\n
ShopCheap\n
https://shopcheap.vercel.app/`
)
        } catch (error) {
        console.error("Error updating product:", error)
        alert("Email Already Exist")
      } finally {
        setIsSubmitting(false)
        cleanForm()
      }
    }
//   console.log(useremail)

  return (
    <footer className="bg-dark border-t">
      <div className="container mx-auto px-4 py-12 ">
        {/* Newsletter Section */}
        <div className="bg-gray-300 p-6 rounded-lg shadow-sm mb-10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Subscribe To Our <span className="text-gold">Newsletter</span></h3>
              <p className="text-gray-600">
                Get the latest updates, deals and exclusive offers directly to your inbox.
              </p>
            </div>
            <div className="flex gap-2">
                
              <form onSubmit={handleSubmit} className="flex gap-2">
              <Input 
              value={useremail}
              onChange={handleChange}
              type="email"
               placeholder={submitting?"Submitting ...":"Your email address"}
                className="max-w-md border-black" 
                />

              <Button type="submit" className="bg-gold">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h4 className="font-bold text-lg text-white mb-4">Company</h4>
            <div className="space-y-3">
              <Link href="/about" className="block text-gray-600 hover:text-orange-400">
                About Us
              </Link>
              <Link href="/careers" className="block text-gray-600 hover:text-orange-400">
                Careers
              </Link>
              
              <Link href="/impact" className="block text-gray-600 hover:text-orange-400">
                Social Impact
              </Link>
              <Link href="/affiliates" className="block text-gray-600 hover:text-orange-400">
                Affiliate Program
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-lg text-white mb-4">Customer Service</h4>
            <div className="space-y-3">
              <Link href="/help" className="block text-gray-600 hover:text-orange-400">
                Help Center
              </Link>
              <Link href="/shipping" className="block text-gray-600 hover:text-orange-400">
                Shipping & Delivery
              </Link>
              <Link href="/returns" className="block text-gray-600 hover:text-orange-400">
                Returns & Exchanges
              </Link>
              <Link href="/order-tracking" className="block text-gray-600 hover:text-orange-400">
                Order Tracking
              </Link>
              <Link href="/gift-cards" className="block text-gray-600 hover:text-orange-400">
                Gift Cards
              </Link>
              <Link href="/contact" className="block text-gray-600 hover:text-orange-400">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-bold text-white text-lg mb-4">My Account</h4>
            <div className="space-y-3">
              <Link href="/sign-in" className="block text-gray-600 hover:text-orange-400">
                Sign In
              </Link>
              <Link href="/sign-up" className="block text-gray-600 hover:text-orange-400">
                Register
              </Link>
              
              <Link href="/cart" className="block text-gray-600 hover:text-orange-400">
                Shopping Cart
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg text-white mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-gray-600 mt-0.5" />
                <span className="text-gray-600">
                  32 km Gayaza-Zirobwe Rd
                  <br />
                  Bugema University
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-600" />
                <span className="text-gray-600"><a href="tel:+256 787357137" >+256 787357137</a></span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-600" />
                <span className="text-gray-600"><a href="mailto: eliaakjtrnq@gmail.com">eliaakjtrnq@gmail.com</a></span>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <h5 className="font-medium text-gold mb-3">Follow Us</h5>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-200 p-2 rounded-full hover:bg-gold transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-gray-700" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-200 p-2 rounded-full hover:bg-gold transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-gray-700" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    href="https://x.com/shopcheap__"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-200 p-2 rounded-full hover:bg-gold transition-colors"
                  >
                    <Twitter className="h-5 w-5 text-gray-700" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-200 p-2 rounded-full hover:bg-gold transition-colors"
                  >
                    <Youtube className="h-5 w-5 text-gray-700" />
                    <span className="sr-only">YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        {/* <div className="mb-8">
          <h4 className="font-bold text-lg mb-4">We Accept</h4>
          <div className="flex flex-wrap gap-3">
            {["visa", "mastercard", "amex", "paypal", "apple-pay", "google-pay"].map((payment) => (
              <div
                key={payment}
                className="bg-white border rounded-md px-3 py-2 w-16 h-10 flex items-center justify-center"
              >
                <img
                  src={`/placeholder.svg?height=30&width=40&text=${payment}`}
                  alt={`${payment} payment method`}
                  className="max-h-6"
                />
                
              </div>
            ))}
          </div>
        </div> */}

        <Separator className="my-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 ">
          <div className="mb-4 md:mb-0">© {currentYear} ShopCheap. All rights reserved.</div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/privacy-policy" className="hover:text-orange-400">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-orange-400">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="hover:text-orange-400">
              Accessibility
            </Link>
            <Link href="/sitemap" className="hover:text-orange-400">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

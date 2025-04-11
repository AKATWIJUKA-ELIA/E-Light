import ShoppingCart from "@/components/shopping-cart/page"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-6">
      <ShoppingCart />

      <div className="max-w-7xl mx-auto p-4 mt-6 text-sm text-gray-600">
        <p>
          The price and availability of items at Amazon.com are subject to change. The Cart is a temporary place to
          store a list of your items and reflects each item&apos;s most recent price.{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">Learn more</span>
        </p>
        <p>
          Do you have a gift card or promotional code? We&apos;ll ask you to enter your claim code when it&apos;s time to pay.
        </p>
      </div>
    </main>
  )
}

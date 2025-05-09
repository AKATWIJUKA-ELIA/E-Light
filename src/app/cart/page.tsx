import ShoppingCart from "@/components/shopping-cart/page"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-6 md:mt-22 mt-32 dark:bg-dark ">
      <ShoppingCart />

      <div className="max-w-7xl mx-auto p-4 mt-6 text-sm text-gray-600">
        <p>
          The price and availability of items at ShopCheap.com are subject to change. The Cart is a temporary place to
          store a list of your items and reflects each item&apos;s most recent price.{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">Learn more</span>
        </p>
      </div>
    </main>
  )
}

import Link from "next/link"
import { Search, ArrowLeft, ShoppingBag, Filter, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import useGetApprovedProducts from "@/hooks/useGetApprovedProducts"
import useGetCategories from "@/hooks/useGetCategories"
import SearchModel from "../SearchModel/page"
import HeroCard from "../HeroCards/page"
type ProductsNotFoundProps = {
        category?: string;
      };
const ProductsNotFound= ({category}: ProductsNotFoundProps)=> {

  const {data:popularCategories} = useGetCategories()
          const { data: products } = useGetApprovedProducts();
          const [Focused, setFocused] = useState(false)
          const [searchTerm, setSearchTerm] = useState('');

          const forceBlur = () => {
                document.getElementById("inputsearchnomatches")?.blur();
              };
        const HandleClose =()=>{
                setFocused(false)
                forceBlur()
        }

  const recentSearches = ["wireless headphones", "summer dresses", "kitchen gadgets"]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="h-48 w-48 mb-6 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag className="h-24 w-24 text-gray-300" strokeWidth={1} />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* <Search className="h-12 w-12 text-gray-400" /> */}
          </div>
        </div>

        <h1 className="text-3xl text-dark font-bold mb-4">No Matches Found for &ldquo;<span className='font-bold text-gold' >{decodeURIComponent(category??"") }</span>&ldquo;</h1>
        <p className="text-gray-600 max-w-lg mb-8">
          We couldn&apos;t find any  matches for your search criteria. Try adjusting your filters or search terms.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input value={searchTerm}
                                            id='inputsearchnomatches'
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                             onFocus={()=>{setFocused(true)}}
                                             type="text"
                                              className='pl-10' 
                                              placeholder='Search '  />
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Browse All Products
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="suggestions" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="categories">Popular Categories</TabsTrigger>
          <TabsTrigger value="recent">Recent Searches</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">You might be interested in</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 p-2 gap-2" >
          {products?.slice(0,7).map((product) => (
        <HeroCard key={product._id} product={product} />
      ))}
          </div>
          
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Browse Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {popularCategories?.slice(0,10)?.map((category) => (
                <Link  key={category._id} href={`/category/${category.cartegory}`} className="font-medium hover:underline">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  
                  
                  <Tag className="h-8 w-8 mb-2 text-gray-500" />
                    {category.cartegory}
                  
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Your Recent Searches</h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <Button key={index} variant="outline" size="sm" className="rounded-full">
                <Search className="mr-2 h-3 w-3" />
                {search}
              </Button>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Need Help Finding Something?</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Filter className="h-8 w-8 mb-4 text-gray-500" />
              <h3 className="font-medium mb-2">Adjust Your Filters</h3>
              <p className="text-sm text-gray-500">Try removing some filters to see more products</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Search className="h-8 w-8 mb-4 text-gray-500" />
              <h3 className="font-medium mb-2">Check Your Spelling</h3>
              <p className="text-sm text-gray-500">Make sure all words are spelled correctly</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <ShoppingBag className="h-8 w-8 mb-4 text-gray-500" />
              <h3 className="font-medium mb-2">Browse Categories</h3>
              <p className="text-sm text-gray-500">Find products by navigating through categories</p>
            </CardContent>
          </Card>
        </div>
      </div>
      {  searchTerm.length>1 ? (<SearchModel Focused={Focused} searchTerm={searchTerm||""} onClose={HandleClose} />):("")}
    </div>
    
  )
}
export default ProductsNotFound
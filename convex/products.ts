import {action, internalQuery, mutation, query} from "./_generated/server"
import {v} from "convex/values"
import { api, internal } from "../convex/_generated/api";

export const generateUploadUrl = mutation(async (ctx)=>{
      return await ctx.storage.generateUploadUrl()
})
function getFutureDate(duration: string): string {
  const now = new Date();

  if (duration === "weekly") {
    now.setDate(now.getDate() + 7);
    return now.toISOString();
  }
  if (duration === "monthly") {
    now.setMonth(now.getMonth() + 1);
    return now.toISOString();
  }
  if (duration === "quarterly") {
    now.setMonth(now.getMonth() + 3);
    return now.toISOString();
  }
  // Default: 7 days
  now.setDate(now.getDate() + 7);
  return now.toISOString();
}


export const createProduct = mutation({
        args:{
              products: v.object({
                approved: v.boolean(),
                product_cartegory: v.string(),
                product_condition: v.string(),
                product_description: v.string(),
                product_image: v.array(v.string()),
                product_name: v.string(),
                product_owner_id: v.string(),
                product_price: v.string(),

                product_embeddings:v.optional(v.array(v.number())),
                product_image_embeddings:v.optional(v.array(v.number())),

                  }),
        },
        handler: async (ctx, args) => {
                try{
              await ctx.db.insert("products", {
                    ...args.products,
              });
              return { success: true, message: "Product created successfully" };
        }catch{
                return { success: false, message: "Error creating product" };   
        }
        },
  })

  export const getProducts = query({
           
        handler: async (ctx) => {
      const products = await ctx.db.query("products").filter((q)=> q.eq(q.field("approved"), true)).collect();

                for (const product of products) {
            product.product_image = (await Promise.all(
              product.product_image.map(async (image: string) => {
                return await ctx.storage.getUrl(image);
              })
            )).filter((url): url is string => url !== null);
          }
//       console.log(products)
      return products
      
    },
    
  })

  export const getProduct = query({
        args:{id: v.string(),},
              handler: async (ctx, args) => {
                     const single = await ctx.db.query("products").filter((q)=> q.eq(q.field("_id"), args.id)).first(); 
                //      console.log("Single Job",single)
                    if (single) {
                        single.product_image = (
                        await Promise.all(
                        single.product_image.map(async (image: string) => {
                        return await ctx.storage.getUrl(image);
                        })
                        )
                        ).filter((url): url is string => url !== null);
                    }
                    return single
                    },
                    })
        

export const getProductsByIds = query({
args: { ids: v.array(v.string()) }, // Accept an array of product IDs
handler: async (ctx, { ids }) => {
        return await Promise.all(
          ids.map(async (id) => {
            const normalizedId = ctx.db.normalizeId("products", id);
            if (!normalizedId) {
              throw new Error(`Invalid ID: ${id}`);
            }
            const product= await ctx.db.get(normalizedId);
            if(product){
                product.product_image = (await Promise.all(
                        product.product_image.map(async (image: string) => {
                                return await ctx.storage.getUrl(image);
                        }
                ))).filter((url): url is string => url !== null);
          }
          return product;
        })
        ); // Fetch all products at once
},

});

export const getImageUrl = query({
        args: { fileId: v.id("_storage") }, // Convex stores files in the `_storage` table
        handler: async (ctx, { fileId }) => {
          return await ctx.storage.getUrl(fileId); // Generate the view URL
        },
      });

      export const getProductsByOwner = query({
        args: { id: v.string() },
        handler: async (ctx, args) => {
          const products = await ctx.db
            .query("products")
            .filter((q) => q.eq(q.field("product_owner_id"), args.id))
            .collect();
      
          for (const product of products) {
            product.product_image = (await Promise.all(
              product.product_image.map(async (image: string) => {
                return await ctx.storage.getUrl(image);
              })
            )).filter((url): url is string => url !== null);
          }
      
        //   console.log("primary products:", products);
          return products;
        },
      });

      export const getProductsByOwnerApproved = query({
        args: { id: v.string() },
        handler: async (ctx, args) => {
          const products = await ctx.db
            .query("products")
            .filter((q) => q.and(
                q.eq(q.field("product_owner_id"), args.id),
                q.eq(q.field("approved"),true)
              ))
            .collect();
      
          for (const product of products) {
            product.product_image = (await Promise.all(
              product.product_image.map(async (image: string) => {
                return await ctx.storage.getUrl(image);
              })
            )).filter((url): url is string => url !== null);
          }
      
        //   console.log("primary products:", products);
          return products;
        },
      });

      export const getRelatedProducts = query({
        args: { category: v.string() },
        handler: async (ctx, args) => {
          const products = await ctx.db
            .query("products")
            .withIndex("by_product_category", q => q.eq("product_cartegory", args.category))
            .filter((q) => q.and(
                q.eq(q.field("product_cartegory"), args.category),
                q.eq(q.field("approved"),true)
              ))
            .collect();
      
          for (const product of products) {
            product.product_image = (await Promise.all(
              product.product_image.map(async (image: string) => {
                return await ctx.storage.getUrl(image);
              })
            )).filter((url): url is string => url !== null);
          }
      
        //   console.log("Related products:", products);
          return products;
        },
      });

      export const UpdateProduct = mutation({
        args:{_id: v.id("products"),
                product: v.object({
                _id: v.id("products"),
                 approved: v.boolean(),
                  product_cartegory: v.string(),
                  product_condition: v.string(),
                  product_description: v.string(),
                  product_image: v.array(v.string()),
                  product_name: v.string(),
                  product_price: v.string(),
                    }),
          },
        handler: async (ctx, args) => {
              if(args.product){
              const product = await ctx.db.patch(args._id, args.product);
              return product
              }
              
        }})

        export const DeleteProduct = mutation({
                args: { id: v.id("products") }, // use `v.id("tableName")` for safety
                handler: async (ctx, args) => {
                  const product = await ctx.db.get(args.id);
              
                  if (!product) {
                    throw new Error("Product not found");
                  }
              
                  await ctx.db.delete(args.id);
                  return { success: true };
                },
        });

        
        export const getAllProducts = query({
                handler: async (ctx) => {
              const products = await ctx.db.query("products").collect(); 
        //       console.log(products)
              return Promise.all(
                products.map(async (product) => ({
                  ...product,
                  product_image: product.product_image ? await ctx.storage.getUrl(product.product_image[0]) : null,
                 
                }))
              
              );
              
            },
            
        })

        export const ApproveRevoke = mutation({
                args: { id: v.id("products") },
                handler: async (ctx, args) => {
                  const product = await ctx.db.get(args.id);
              
                  if (!product) {
                    throw new Error("Product not found");
                  }
              
                  const updatedProduct = await ctx.db.patch(args.id, {
                    approved: !product.approved,
                  });
              
                  return updatedProduct;
                },
        });

        export const searchResults = internalQuery({
                args:{
                        results: v.array(
                                v.object({
                                        _id: v.id("products"),
                                        _score: v.number()
                                }),
                        ),
                },
                handler: async (ctx, {results}) =>{
                        const products = await Promise.all(
                                results.map(async ({_id,_score}) =>{
                                        const product = await ctx.db.get(_id);
                                        if(!product) return null;
                                        return {
                                                ...product,
                                                score:_score,
                                        }
                                }
                        ))
                        return products.filter((b)=> b!= null && b.score > 0.256);
                }
        })

        export const ImagesearchResults = internalQuery({
                args:{
                        results: v.array(
                                v.object({
                                        _id: v.id("products"),
                                        _score: v.number()
                                }),
                        ),
                },
                handler: async (ctx, {results}) =>{
                        const products = await Promise.all(
                                results.map(async ({_id,_score}) =>{
                                        const product = await ctx.db.get(_id);
                                        if(!product) return null;
                                        product.product_image = (await Promise.all(
                                                        product.product_image.map(async (image: string) => {
                                                                return await ctx.storage.getUrl(image);
                                                        }
                                                ))).filter((url): url is string => url !== null);
                                        return {
                                                ...product,
                                                score:_score,
                                        }
                                }
                        ))
                        return products.filter((b)=> b!= null && b.score > 0.256);
                }
        })


        export const vectorSearch: ReturnType<typeof action> = action({
                args: { embeding: v.array(v.number()) },
                handler: async (ctx, args) => {
                        const results = await ctx.vectorSearch("products", "by_product_embeddings", {
                                vector: args.embeding,
                                limit: 6
                        });
                        return await ctx.runQuery(
                                internal.products.searchResults, { results }
                        );
                }

        });

        export const ImagevectorSearch: ReturnType<typeof action> = action({
                args: { embeding: v.array(v.number()) },
                handler: async (ctx, args) => {
                        const results = await ctx.vectorSearch("products", "product_image_embeddings", {
                                vector: args.embeding,
                                limit: 6
                        });
                        return await ctx.runQuery(
                                internal.products.ImagesearchResults, { results }
                        );
                }

        });
              
        export const recordInteraction = mutation({
                args: {
                user_id: v.string(),
                product_id: v.string(),
                type: v.string(), // "view" | "cart" | "purchase"
                },
                handler: async (ctx, args) => {
                        const existingInteractions =  await ctx.db.query("interactions").collect();
                        const existingInteraction = existingInteractions.find(interaction => 
                                interaction.user_id === args.user_id && 
                                interaction.product_id === args.product_id &&
                                interaction.type === args.type
                        );
                        if (!existingInteraction) {
                                await ctx.db.insert("interactions", {
                                ...args,
                                count: 1, // Initialize count to 1 for new interaction
                        });
                        return { success: true, message: "Interaction recorded successfully" };
                        }
                        const interaction =  existingInteraction.count + 1;
                        await ctx.db.patch(existingInteraction._id, {
                                count: interaction,
                        });
                        return { success: true, message: "Interaction updated successfully" };
                },
        });

        export const recommendProducts: ReturnType<typeof query> = query({
                args: { user_id: v.string(), type: v.string() }, // type can be "view", "cart", "purchase"
                handler: async (ctx, args) => {
                        const recommendations = await ctx.db
                        .query("interactions")
                        .withIndex("by_user_and_type", (q) => q.eq("user_id", args.user_id).eq("type", args.type))
                        .take(10) // Limit to 10 interactions for performance
                        if (!recommendations  || recommendations.length === 0) {
                                return await ctx.runQuery(
                                        internal.products.getTopRated ).then(
                                                results => results.slice(0, 3) 
                                        ) // show  top rated  products
                        }
                                       
                                       
                        const recommendedProductIds = [...new Set(recommendations.map((v) => v.product_id))];

                        const recommendedProducts = await Promise.all(
                                recommendedProductIds.map((id) => ctx.db.query("products").filter((q) => q.eq(q.field("_id"), id)).first()
                                .then(async (product) => {
                                        if (!product) return null; // Handle case where product is not found
                                        return {
                                                ...product,
                                                product_image: (product.product_image && product.product_image.length > 0) ? 
                                                (await Promise.all(
                                                        product.product_image.map(async (image: string) => {
                                                                return await ctx.storage.getUrl(image);
                                                        })
                                                )).filter((url): url is string => url !== null) : []
                                        };
                                }
                        )
                                
                        ));
                        return recommendedProducts.filter((product) => product !== null); // Filter out any null products
                        }
                        
        })

        export const getTopRated = internalQuery({
                handler: async (ctx) => {
                        const TopRatedIds = [
                                ...new Set((await ctx.db.query("reviews")
                                .collect())
                                .filter((review) => review.rating > 2)
                                .map((review) => review.product_id)
                        )];
                        return await Promise.all(
                                TopRatedIds.map((id) => ctx.db.query("products").filter((q) => q.eq(q.field("_id"), id)).first()
                                .then(async (product) => {
                                        if (!product) return null; // Handle case where product is not found
                                        return {
                                                ...product,
                                                product_image: (product.product_image && product.product_image.length > 0) ? 
                                                (await Promise.all(
                                                        product.product_image.map(async (image: string) => {
                                                                return await ctx.storage.getUrl(image);
                                                        })
                                                )).filter((url): url is string => url !== null) : []
                                        };
                                }
                        )
                        ));
                        // return TopRatedProducts
                }
        })

        export const getTopRatedProducts: ReturnType<typeof query> = query({
                handler: async (ctx) => {       
                        const topRatedProducts = await ctx.runQuery(internal.products.getTopRated);
                        return topRatedProducts;
                }
        })

        export const getSponsoredProducts = query({
                handler: async (ctx) => {
                        const premium = await ctx.db.query("products")
                        .withIndex("by_sponsorship", (q) => q.eq("product_sponsorship", "premium")).collect();
                        const basic = await ctx.db.query("products")
                        .withIndex("by_sponsorship", (q) => q.eq("product_sponsorship", "basic")).collect();
                        const elite = await ctx.db.query("products")
                        .withIndex("by_sponsorship", (q) => q.eq("product_sponsorship", "elite")).collect();
                        const sponsored = [...premium, ...basic, ...elite];
                        return await Promise.all(
                                sponsored.map(async (product) => {
                                        if (!product) return null; // Handle case where product is not found
                                        return {
                                                ...product,
                                                product_image: (product.product_image && product.product_image.length > 0)
                                                        ? (await Promise.all(
                                                                product.product_image.map(async (image: string) => {
                                                                        return await ctx.storage.getUrl(image);
                                                                })
                                                        )).filter((url): url is string => url !== null)
                                                        : []
                                        };
                                })
                        );
                          
        }})

        export const BoostProducts = mutation({
                args: {
                        product_id: v.id("products"),
                        user_id: v.string(),
                        boost_type:v.string(),
                        duration: v.string(), // Duration in milliseconds
                        status: v.optional(v.union(
                                v.literal("active"),
                                v.literal("expired"),))
                },
                handler: async (ctx, args) => {
                        const product = await ctx.db.get(args.product_id);
                        if (!product) {
                                return { success: false, message: "Product not found" };
                        }
                        // Check if the user is the owner of the product
                        if (product.product_owner_id !== args.user_id) {
                                return { success: false, message: "You are not the owner of this product" };
                        }
                        // Check if the product is already boosted
                        const existingBoost = await ctx.db.query("boosts")
                                .filter((q) => q.eq(q.field("product_id"), args.product_id))
                                .first();
                        if (existingBoost) {
                                return { success: false, message: "Product is already boosted" };
                        }
                        // Insert the boost record
                        await ctx.db.insert("boosts", {
                                ...args,
                                status: args.status ? args.status : "active", // Default to "active" if not provided
                                duration: args.duration ? new Date(getFutureDate(args.duration)).getTime() : new Date(getFutureDate("weekly")).getTime(), // Default to 7 days if not provided
                        });
                        return { success: true, message: "Boost prepared successfully" };
                }
        })

export const getBoostedProductsIds = query({
        args: { user_id: v.string() },
        handler: async (ctx, args) => {
                const boosts = await ctx.db.query("boosts")
                .withIndex("by_user_and_status",(q)=>(q.eq("user_id",args.user_id).eq("status","active")))
                .collect();
                const boostedProductsIds = await Promise.all(
                        boosts.map(async (boost) => {
                                return boost.product_id;
                        })
                );
                return boostedProductsIds.filter((id) => id !== null);
        }
});
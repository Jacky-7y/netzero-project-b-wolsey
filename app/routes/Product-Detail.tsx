import { useLoaderData, Link } from "react-router";
import { Product } from "../models/Product";
import { connectDB } from "../lib/db.server";
import type { Route } from "./+types/Product-Detail";

export async function loader({ params }: Route.LoaderArgs) {
  await connectDB();
  const product = await Product.findById(params.id).lean();
  
  if (!product) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return { product: JSON.parse(JSON.stringify(product)) };
}

export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();

  return (
    <main className="bg-stone-50 min-h-screen py-12">
      <div className="container-custom">
        {/* Back Button */}
        <Link 
          to="/gallery" 
          className="inline-flex items-center text-stone-500 hover:text-brand-olive font-bold uppercase text-sm mb-8 transition-colors"
        >
          <span className="mr-2">←</span> Back to Collection
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-stone-200">
          {/* Image Section */}
          <div className="md:w-1/2 bg-stone-100 flex items-center justify-center p-4">
            <img 
              src={product.imageUrl.startsWith('/') ? product.imageUrl : `/images/${product.imageUrl}`} 
              alt={product.name}
              className="max-h-[600px] w-full object-contain rounded shadow-sm"
            />
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
            <div className="mb-6">
              <span className="text-brand-gold font-bold uppercase tracking-widest text-sm">Unique Treasure</span>
              <h1 className="text-4xl font-bold text-black mt-2 mb-4 leading-tight">{product.name}</h1>
              <p className="text-3xl font-black text-brand-olive">${product.price}</p>
            </div>

            <div className="border-t border-stone-100 pt-6 flex-grow">
              <h3 className="text-xs font-bold uppercase text-stone-400 mb-3 tracking-widest">Description</h3>
              <p className="text-stone-700 leading-relaxed text-lg italic font-serif">
                "{product.description}"
              </p>
            </div>

            <div className="mt-10 p-6 bg-stone-50 rounded-lg border border-stone-200">
              <p className="text-sm text-stone-500 mb-4">
                Interested in this item? Visit our downtown Kingston location or contact us to reserve it for pick-up.
              </p>
              <Link to="/contact" className="btn-primary w-full text-center py-4">
                Inquire About This Item
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
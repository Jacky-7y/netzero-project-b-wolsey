import { useLoaderData, Link } from "react-router";
import { Product } from "../models/Product";
import { connectDB } from "../lib/db.server";

export async function loader() {
  await connectDB();
  const rawProducts = await Product.find().lean();
  const products = JSON.parse(JSON.stringify(rawProducts));
  return { products };
}

export default function Gallery() {
  const { products } = useLoaderData<typeof loader>();

  return (
    <main className="bg-stone-50 min-h-screen pb-20">
      {/* Page Header */}
      <section className="bg-brand-olive text-white py-16 text-center shadow-md">
        <h1 className="text-4xl font-bold uppercase tracking-widest">Our Collection</h1>
        <p className="text-stone-300 mt-2 font-serif italic">Hand-selected treasures from Antique Alley</p>
      </section>

      <div className="container-custom py-12">
        {products.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-stone-300 rounded-lg">
            <p className="text-stone-500 italic text-xl">The gallery is currently being curated. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((item: any) => (
              <Link 
                key={item._id} 
                to={`/product/${item._id}`} 
                className="group bg-white rounded-lg shadow-sm overflow-hidden border border-stone-200 hover:shadow-xl hover:border-brand-gold transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.imageUrl.startsWith('/') ? item.imageUrl : `/images/${item.imageUrl}`} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-brand-gold text-white px-4 py-2 rounded text-sm font-bold tracking-widest transition-opacity">
                      VIEW DETAILS
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-black uppercase truncate">{item.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-brand-olive font-black text-xl">${item.price}</p>
                    <span className="text-[10px] text-stone-400 font-mono">REF: {item._id.slice(-5)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
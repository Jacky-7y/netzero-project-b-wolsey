import { Form, useLoaderData, useNavigation, redirect, Link } from "react-router";
import { Product } from "../models/Product";
import { connectDB } from "../lib/db.server";
import type { Route } from "./+types/Admin";

export async function loader({ request }: Route.LoaderArgs) {
  await connectDB();

  const cookie = request.headers.get("Cookie");
  if (!cookie || !cookie.includes("user_session=")) {
    return redirect("/login");
  }

  const rawProducts = await Product.find().lean();
  const products = JSON.parse(JSON.stringify(rawProducts)).map((p: any) => ({
    ...p,
    _id: p._id.toString(),
  }));
  return { products };
}

export async function action({ request }: Route.ActionArgs) {
  await connectDB();
  const formData = await request.formData();
  const intent = formData.get("intent");
  const id = formData.get("id")?.toString();

  try {
    if (intent === "logout") {
      return redirect("/login", {
        headers: {
          "Set-Cookie": "user_session=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax",
        },
      });
    }

    if (intent === "create") {
      await Product.create({
        name: formData.get("name"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        imageUrl: formData.get("imageUrl") || "/images/placeholder.jpg",
      });
    } else if (intent === "update" && id) {
      await Product.findByIdAndUpdate(id, {
        name: formData.get("name"),
        price: Number(formData.get("price")),
        description: formData.get("description"),
      });
    } else if (intent === "delete" && id) {
      await Product.findByIdAndDelete(id);
    }
    return { ok: true };
  } catch (err) {
    console.error("DB Error:", err);
    return { ok: false };
  }
}

export default function AdminPanel() {
  const { products } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <main className="bg-stone-50 min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-brand-olive text-white py-12 shadow-inner relative">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold tracking-widest uppercase">Inventory Manager</h1>
          <p className="mt-2 text-stone-300 text-sm">
            {isSubmitting ? "Syncing changes..." : "All changes saved"}
          </p>
        </div>
        
        {/* Logout Button */}
        <Form method="post" className="absolute top-4 right-4">
          <input type="hidden" name="intent" value="logout" />
          <button type="submit" className="text-xs border border-white/30 px-3 py-1 rounded hover:bg-white/10 transition-colors uppercase font-bold tracking-tighter">
            Logout
          </button>
        </Form>
      </section>

      <div className="container-custom mt-10">
        {/* CREATE FORM */}
        <div className="bg-white p-8 rounded shadow-md border-t-4 border-brand-gold mb-12">
          <h2 className="text-2xl font-bold mb-6 text-brand-olive uppercase tracking-wide">List New Treasure</h2>
          <Form method="post" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input type="hidden" name="intent" value="create" />
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-stone-500">Item Name</label>
              <input name="name" placeholder="e.g. Victorian Pocket Watch" className="input-field" required />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-stone-500">Price ($)</label>
              <input 
                name="price" 
                type="number" 
                step="0.01"
                placeholder="0.00" 
                className="input-field" 
                required 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-stone-500">Image Filename</label>
              <input name="imageUrl" placeholder="item-name.jpg" className="input-field" />
            </div>

            <div className="flex flex-col gap-1 md:col-span-3">
              <label className="text-xs font-bold uppercase text-stone-500">Description</label>
              <textarea name="description" placeholder="Describe the history and condition..." className="input-field h-24 resize-none" required />
            </div>

            <button type="submit" className="btn-primary md:col-span-3 py-4 text-lg">
              ADD TO COLLECTION
            </button>
          </Form>
        </div>

        {/* LISTING */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-brand-olive uppercase tracking-wide border-b-2 border-stone-200 pb-2">Current Stock</h2>
          
          {products.map((item: any) => (
            <div key={item._id} className="bg-white p-6 rounded shadow-sm flex flex-col md:flex-row items-center gap-8 border border-stone-200 hover:border-brand-gold transition-colors">
              
              <img 
                src={item.imageUrl.startsWith('/') ? item.imageUrl : `/images/${item.imageUrl}`} 
                className="w-24 h-24 object-cover rounded border-2 border-stone-100 shadow-sm" 
                alt="" 
              />

              {/* UPDATE FORM */}
              <Form method="post" className="flex flex-col md:flex-row items-center gap-6 flex-grow w-full">
                <input type="hidden" name="id" value={item._id} />
                <input type="hidden" name="intent" value="update" />
                
                <div className="flex flex-col flex-grow w-full">
                  <input 
                    name="name" 
                    defaultValue={item.name} 
                    className="text-xl font-bold text-black border-b border-transparent focus:border-brand-gold bg-transparent outline-none w-full" 
                  />
                  <textarea 
                    name="description" 
                    defaultValue={item.description} 
                    className="text-stone-600 text-sm italic mt-2 w-full bg-transparent border-none focus:ring-0 resize-none p-0"
                  />
                </div>
                
                <div className="flex items-center bg-stone-50 px-3 py-2 rounded border border-stone-200">
                  <span className="text-xl font-bold text-brand-olive mr-1">$</span>
                  <input 
                    name="price" 
                    type="number" 
                    step="0.01"
                    defaultValue={item.price} 
                    className="text-xl font-bold text-black w-24 bg-transparent outline-none" 
                  />
                </div>
                
                <button type="submit" className="w-full md:w-auto bg-stone-800 text-white font-bold px-6 py-2 rounded hover:bg-brand-olive transition-all uppercase text-sm tracking-widest shadow-sm">
                  SAVE
                </button>
              </Form>

              {/* DELETE FORM */}
              <Form method="post" className="md:border-l-2 md:pl-6 border-stone-100">
                <input type="hidden" name="id" value={item._id} />
                <input type="hidden" name="intent" value="delete" />
                <button type="submit" className="text-red-600 hover:text-red-800 hover:scale-125 transition-all text-4xl font-light leading-none">
                  &times;
                </button>
              </Form>
            </div>
          ))}

          {products.length === 0 && (
            <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-stone-300 text-stone-400">
              <p className="text-xl italic font-serif">"The shelves are currently bare..."</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
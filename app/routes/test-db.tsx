import { Form, useLoaderData, useNavigation } from "react-router";
import { Product } from "../models/Product";
import { connectDB } from "../lib/db.server";
import type { Route } from "./+types/test-db";
import { redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  await connectDB();

  const cookie = request.headers.get("Cookie");
  if (!cookie || !cookie.includes("user_session=")) {
    return redirect("/login");
  }

  const rawProducts = await Product.find().lean();
  const products = rawProducts.map((p: any) => ({ ...p, _id: p._id.toString() }));
  return { products };
}

export async function action({ request }: Route.ActionArgs) {
  await connectDB();
  const formData = await request.formData();
  const intent = formData.get("intent");
  const id = formData.get("id")?.toString();

  try {
    if (intent === "create") {
      await Product.create({
        name: formData.get("name"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
      });
    } else if (intent === "update" && id) {
      await Product.findByIdAndUpdate(id, {
        name: formData.get("name"),
        price: Number(formData.get("price")),
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

export default function TestCRUD() {
  const { products } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans bg-slate-100 min-h-screen">
      <h1 className="text-4xl font-black text-black mb-2">Antique Alley CRUD Testing</h1>
      <p className="mb-8 text-gray-700 font-medium">
        {isSubmitting ? "Updating Database..." : "System Ready"}
      </p>

      {/* CREATE FORM */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10 border-2 border-gray-300">
        <h2 className="font-bold text-xl text-black mb-4 underline decoration-blue-500">Add New Inventory Item</h2>
        <Form method="post" className="flex flex-col md:flex-row gap-4">
          <input type="hidden" name="intent" value="create" />
          <input name="name" placeholder="Item Name" className="border-2 border-gray-300 p-2 rounded text-black bg-white focus:border-blue-500 outline-none flex-grow" required />
          <input name="description" placeholder="Short Description" className="border-2 border-gray-300 p-2 rounded text-black bg-white focus:border-blue-500 outline-none flex-grow" required />
          <input name="price" type="number" placeholder="Price" className="border-2 border-gray-300 p-2 rounded text-black bg-white focus:border-blue-500 outline-none w-32" required />
          <button type="submit" className="bg-blue-700 text-white font-bold px-8 py-2 rounded hover:bg-black transition-colors">
            ADD ITEM
          </button>
        </Form>
      </div>

      {/* LISTING */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-black mb-4">Current Stock</h2>
        {products.map((item: any) => (
          <div key={item._id} className="bg-white p-5 rounded-lg shadow flex items-center justify-between border-2 border-gray-200">
            
            {/* UPDATE FORM */}
            <Form method="post" className="flex items-center gap-6 flex-grow">
              <input type="hidden" name="id" value={item._id} />
              <input type="hidden" name="intent" value="update" />
              
              <div className="flex flex-col flex-grow">
                {/* Product Name Input - Bold Black */}
                <input 
                  name="name" 
                  defaultValue={item.name} 
                  className="text-xl font-bold text-black border-b-2 border-transparent focus:border-blue-500 bg-transparent outline-none w-full" 
                />
                <span className="text-sm font-mono text-gray-500">REF: {item._id}</span>
                <p className="text-gray-800 text-sm italic">{item.description}</p>
              </div>
              
              {/* Price Input - Bold Black */}
              <div className="flex items-center">
                <span className="text-2xl font-bold text-black mr-1">$</span>
                <input 
                  name="price" 
                  type="number" 
                  defaultValue={item.price} 
                  className="text-2xl font-bold text-black w-24 border-b-2 border-transparent focus:border-blue-500 bg-transparent outline-none" 
                />
              </div>
              
              <button type="submit" className="bg-gray-200 text-black font-bold px-4 py-2 rounded border border-gray-400 hover:bg-black hover:text-white transition-all shadow-sm">
                SAVE
              </button>
            </Form>

            {/* DELETE FORM */}
            <Form method="post" className="ml-4 border-l-2 pl-4 border-gray-200">
              <input type="hidden" name="id" value={item._id} />
              <input type="hidden" name="intent" value="delete" />
              <button type="submit" className="text-red-600 hover:scale-125 transition-transform text-3xl font-bold px-2">
                &times;
              </button>
            </Form>

          </div>
        ))}

        {products.length === 0 && (
          <p className="text-center text-gray-600 py-10 bg-white rounded border-2 border-dashed border-gray-300">
            Inventory is currently empty.
          </p>
        )}
      </div>
    </div>
  );
}
import { Form, redirect, useActionData } from "react-router";
import { User } from "../models/User";
import { connectDB } from "../lib/db.server";
import type { Route } from "./+types/Login";

export async function action({ request }: Route.ActionArgs) {
  await connectDB();
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  
  const user = await User.findOne({ username, password });

  if (!user) {
    return { error: "Invalid Credentials" };
  }

  
  return redirect("/admin", {
    headers: {
      "Set-Cookie": `user_session=${user._id}; Path=/; HttpOnly; Max-Age=3600`,
    },
  });
}

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-300 w-96">
        <h1 className="text-2xl font-black text-black mb-6 text-center">ANTIQUE ALLEY LOGIN</h1>
        
        <Form method="post" className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-black uppercase mb-1">Username</label>
            <input name="username" type="text" className="w-full border-2 border-gray-300 p-2 rounded text-black outline-none focus:border-blue-500" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-black uppercase mb-1">Password</label>
            <input name="password" type="password" className="w-full border-2 border-gray-300 p-2 rounded text-black outline-none focus:border-blue-500" required />
          </div>

          {actionData?.error && (
            <p className="text-red-600 text-sm font-bold bg-red-50 p-2 rounded border border-red-200">{actionData.error}</p>
          )}

          <button type="submit" className="w-full bg-black text-white font-bold py-3 rounded hover:bg-blue-700 transition-colors">
            LOG IN
          </button>
        </Form>
      </div>
    </div>
  );
}
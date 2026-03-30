import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  route("gallery", "routes/Gallery.tsx"),
  route("product/:id", "routes/Product-Detail.tsx"),
  route("about", "routes/About.tsx"),
  route("contact", "routes/Contact.tsx"),
  route("login", "routes/Login.tsx"),
  route("admin", "routes/Admin.tsx"),
] satisfies RouteConfig;
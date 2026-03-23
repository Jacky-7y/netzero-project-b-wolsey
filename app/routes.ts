import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("test-db", "routes/test-db.tsx"),
    route("login", "routes/login.tsx"),
] satisfies RouteConfig;
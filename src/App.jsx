import { useRouter } from "./hooks/useRouter";
import { LandingPage } from "./pages/Landing";
import { DocsPage } from "./pages/Docs";

export default function App() {
  const { route } = useRouter();

  // Simple hash router: #/docs → docs page, everything else → landing
  if (route === "/docs" || route.startsWith("/docs/")) {
    return <DocsPage />;
  }

  return <LandingPage />;
}

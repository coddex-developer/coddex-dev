import { Box } from "@radix-ui/themes";
import { BackgroundBeams } from "./components/ui/background-beams";
import HomePage from "./pages/HomePage/intex";
import { NavbarMenuComponent } from "./components/NavbarMenuComponent";

export default function Home() {


  return (
    <>
      <NavbarMenuComponent />
      <HomePage />
    </>
  );
}

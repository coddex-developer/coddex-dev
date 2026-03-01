import { Box } from "@radix-ui/themes";
import { BackgroundBeams } from "./components/ui/background-beams";
import { NavbarMenu } from "./components/NavbarMenu";
import HomePage from "./pages/HomePage/intex";

export default function Home() {


  return (
    <>
      <NavbarMenu />
      <HomePage />
    </>
  );
}

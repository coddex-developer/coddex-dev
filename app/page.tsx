import HomePage from "./pages/HomePage/intex";
import { NavbarMenuComponent } from "./components/NavbarMenuComponent";
import { Pointer } from "@/components/ui/pointer";

export default function Home() {


  return (
    <>
      <NavbarMenuComponent />
      <HomePage />
      <Pointer />
    </>
  );
}

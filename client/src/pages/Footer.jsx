import { FaCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-3 bottom-0 flex justify-center items-center gap-2 shadow-md">
      <FaCopyright className="h-5" />
      <span className="text-sm md:text-base font-light">Sample Project by StarGem</span>
    </footer>
  );
}

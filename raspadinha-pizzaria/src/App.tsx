import ScratchCard from "./components/ScratchCard";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-red-700 drop-shadow-md mb-4 text-center tracking-tight">
          Raspadinha do Pizzaiolo 🍕
        </h1>

        <h2 className="text-lg sm:text-xl text-gray-800 font-semibold mb-2 text-center">
          Ganhe descontos incríveis na sua próxima pizza!
        </h2>

        <h3 className="text-base sm:text-lg text-gray-700 font-medium mb-8 text-center">
          Raspe{" "}
          <span className="font-bold text-red-600">45%</span> da área para
          descobrir seu prêmio!
        </h3>

        <div className="relative w-72 h-72 mb-8 flex items-center justify-center shadow-2xl rounded-full border-4 border-red-300 bg-white/50 backdrop-blur-sm">
          <ScratchCard />
        </div>
      </main>

      <Footer />
    </div>
  );
}

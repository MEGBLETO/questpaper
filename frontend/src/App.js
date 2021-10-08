import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Typewriter from "typewriter-effect/dist/core";
import { HiAcademicCap } from "react-icons/hi";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div className="">
        <Nav />
        <div className="min-h-screen bg-hero-image bg-cover bg-gray-500 text-white flex flex-col  text-center justify-center">
          {/* Hero section */}
          <h1 className="text-4xl p-2 font-bold">
            Une Grande Selection De Sujets D'examen Gratuit
          </h1>
          <p className="p-3">
            {}
            20 ans d'experience dans le secteur de l'education avec une large
            selection de sujets d'examens ainsi que leurs correction
          </p>

          <button className="bg-blue p-3 bg-gray-500 mx-auto hover:bg-gray-300 ease-out ">
            En Savoir Plus
          </button>
        </div>
      </div>

      {/* A propos de nous */}
      <section className="flex flex-col text-center h-screen">
        <h2 className="text-xl font-bold p-3">Nos Services</h2>

        <div className="flex flex-col  sm:flex-row justify-around bg-gray-400 p-4">
        <div>
          <p>ldjjh cd ds</p>
          <HiAcademicCap  className="text-5xl sm: none"/>
        </div>
        <div>
        <p>ldjjh cd ds</p>
          <HiAcademicCap  className="text-5xl sm: none"/>
        </div>
        <div>
        <p>ldjjh cd ds</p>
          <HiAcademicCap  className="text-5xl sm: none"/>
        </div>
        </div>
        
      </section>
    </Router>
  );
}

export default App;

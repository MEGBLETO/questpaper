import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  HiAcademicCap,
  HiOutlineUserGroup,
  HiOutlineSun,
} from "react-icons/hi";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Join from "./components/Join";

function App() {
  return (
    <Router>
      <div className="">
        <Nav />
        <div className="min-h-screen bg-hero-image bg-cover bg-opacity-10 bg-gray-600 text-white flex flex-col  text-center justify-center">
          {/* Hero section */}
          <h1 className="text-5xl p-2 font-bold">
            Une Grande Selection De Sujets D'examen Gratuit
          </h1>
          <p className="p-3  font-bold text-lg">
            {}
            20 ans d'experience dans le secteur de l'education avec une large
            selection de sujets d'examens ainsi que leurs correction.
          </p>

          <button className="bg-blue p-3 bg-gray-800 mx-auto hover:bg-gray-300 ease-out ">
            En Savoir Plus...
          </button>
        </div>
      </div>

      {/* A propos de nous */}
      <section className="flex flex-col text-center">
        <h2 className="text-xl font-bold p-4 bg-gray-400">Nos Services</h2>

        <div className="flex flex-col  sm:flex-row justify-around  p-4">
          <div className="flex flex-col items-center p-4">
            <HiOutlineUserGroup className="text-5xl sm: none" />
            <p>
              On Propose une large variété de sujet d’examen provenant de
              diverse école et université de là sous région.
            </p>
          </div>
          <div className="flex flex-col items-center p-4">
            <HiAcademicCap className="text-5xl sm: none" />
            <p>
              Nous proposons des corrigées de chaque sujet et les utilisateurs
              dispose également d’un chat pour échanger avec nos experts.
            </p>
          </div>
          <div className="flex flex-col items-center p-4">
            <HiOutlineSun className="text-5xl sm: none" />
            <p>
              Nous accordons la plus grande importance à la qualité du contenu
              que nous offrons sur notre site.
            </p>
          </div>
        </div>
      </section>

      {/* Rejoignez Nous */}

      <Join />

      {/* Contactez Nous */}

      <section className="flex flex-col">
        <div className="flex flex-col text-center text-2xl font-bold bg-gray-400 p-5">
          <h1>Contactez Nous</h1>
        </div>
        <form className="sm:p-4 flex flex-col w-1/2 mx-auto">
          <div className="flex flex-col p-3">
            <label className="p-1 font-bold" htmlFor="Name">Name:</label>
            <input className="border-4 p-2 " type="text" />
          </div>

          <div className="flex p-3 flex-col">
            <label className="p-1 font-bold" htmlFor="Email">Email:</label>
            <input className="border-4 p-2" type="text" />
          </div>

          <div className="flex p-3 mb-3 flex-col">
            <label className="p-1 font-bold" htmlFor="Message">Message:</label>
            <textarea className="border-4 p-2" />
          </div>
            
            <div className="mx-auto mb-4">
              <input className="p-3 cursor-pointer" type="submit" name="Envoyer" />
            </div>
        </form>
      </section>

      <Footer />
    </Router>
  );
}

export default App;

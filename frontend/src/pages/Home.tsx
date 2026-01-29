import Header from "../components/Header";
import Hero from "../components/Hero";
import DemoForm from "../components/DemoForm";
import Features from "../components/Features";
import Integration from "../components/Integration";
import About from "../components/About";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <div className="bg-gradient-primary">
        <Header />
        <Hero />
      </div>
      <DemoForm />
      <Features />
      <Integration />
      <About />
      <Footer />
    </div>
  );
}

export default Home;

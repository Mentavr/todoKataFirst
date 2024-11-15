import './App.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';

function App() {
  return (
    <section className="todoapp">
      <Header />
      <Main />
      <Footer />
    </section>
  );
}

export default App;

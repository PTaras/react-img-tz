import Home from './components/Home';

function App() {
  return (
    <div className="container">
      <header className="App-header">
        <h1 className="text-center">TEST APP</h1>
      </header>
      <Home />
      <footer className="bg-light text-center text-lg-start fixed-bottom">
        <div className="text-center p-3" >
          © 2018 - 2019
        </div>
    </footer>
    </div>
  );
}

export default App;

import './App.css';
import Content from './Content.js';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <header>
          <h1>Säätutka</h1>
        </header>
        <div className='content'>
          <Content />
        </div>
      </div>
    </div>
  );
}

export default App;

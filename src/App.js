import { UseState } from './UseState.js'
import { ClassState } from './ClassState.js'
import './App.css';
import { UseReducer } from './UseReducer.js';

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <UseReducer name="use Reducer" />
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Start from './Start';
import Login from './Login';
import Game from './Game';
import Highscorelist from './Highscorelist';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/start' element={<Start />} />
        <Route path='/login' element={<Login />} />
        <Route path='/game' element={<Game />} />
        <Route path='highscorelist' element={<Highscorelist />} />
      </Routes>
    </div>
  );
}

export default App;

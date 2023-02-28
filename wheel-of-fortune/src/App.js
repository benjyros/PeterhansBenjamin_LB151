import { Routes, Route } from 'react-router-dom';
import Start from './Start';
import Login from './Login';
import Spin from './Spin';
import Play from './Play';
import Highscorelist from './Highscorelist';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/start' element={<Start />} />
        <Route path='/login' element={<Login />} />
        <Route path='/spin' element={<Spin />} />
        <Route path='/play' element={<Play />} />
        <Route path='/highscorelist' element={<Highscorelist />} />
      </Routes>
    </div>
  );
}

export default App;

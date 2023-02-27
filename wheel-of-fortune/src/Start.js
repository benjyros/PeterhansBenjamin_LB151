import { Link } from 'react-router-dom';

export default function Start() {

    return (
        <div className='Game w-full h-screen place-content-center grid'>
            <Link to='/game' className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">Spiel spielen!</Link>
        </div>
    );
}
import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { initScene } from './utils/initScene';
// import { initScene } from './utils/initSphere';
// import { initIsland } from './utils/initIsland';
// import { initMarble } from './utils/initMarble';
// import { initCar } from './utils/initCar';
// import { initSky } from './utils/initSky'

// import { part1 } from './threeDemo/part-2';
import { part1 } from './threeDemo/part-3';



function App() {
  const [count, setCount] = useState(0)
  const threeScene = useRef(false);

  useEffect(() => {
    if(!threeScene.current){
      // initScene();
      // initIsland();
      // initMarble();
      // initCar();
      // initSky()
      part1()
      threeScene.current = true;
    }
  }, []);

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App

import QuizForm from './Components/QuizForm'
import StartScreen from './Components/StartScreen'
import bg from './bg.png'


function App() {
  let startPhase = true;
  let gameRunning = false;
  let gameEnd = false;

  
  return (
    <div className="App">

      <img className="app-bg" src={bg} />

      <header className="App-header">
        quiz app - guess country based on flag or capitol.
      </header>

      <div className="container">

        <div className="app-wrapper">
            <h1>Country quiz</h1>

           { startPhase && <StartScreen />}

            { gameRunning && <QuizForm />}
        </div>
       

      </div>

    </div>
  );
}


// 1. left to do reconstruct code.
// 2. install dependencies
// 3. setup redux toolkit store.
// 4. output statse methods fetchs in slices
// 5. complete with redux.

// additational . exclude  other questions  for future question.
// compare (Lighthouse) old stats to reduxed app states
// old stats { perfor: 97, access: 81, bestPractic: 93, SEO: 82}


// SRC
// https://github.com/studnik18/world-flags-quiz    analog
// https://devchallenges.io/challenges/Bu3G2irnaXmfwQ8sZkw8?ref=hackernoon.com    challange src
export default App;

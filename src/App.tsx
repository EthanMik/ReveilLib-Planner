import './App.css'
import fieldimg from './assets/VURC_pushback.png'
import FieldContainer from './components/FieldImg'
import { FIELD_IMG_DIMENSIONS } from './core/Util'

function App() {
  return (
    <div>
        <FieldContainer src={fieldimg} img={FIELD_IMG_DIMENSIONS}/>
    </div>
  )
}

export default App
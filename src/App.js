import { GlobalProvider } from './components/store/GlobalContext'
import Container from './components/Container'
import "./styles/clicker.css";
import "./styles/variables.css";

function App() {
  return (
    <GlobalProvider>
        <Container/>
    </GlobalProvider>
);
}

export default App;

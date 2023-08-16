import './App.css';
import Navagation from './Components/Navagation/Navagation'
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg';

function App() {
  return (
    <div className="App">
    <ParticlesBg type="cobweb" bg={true} />
     <Navagation />
     <Logo />
     <Rank />
     <ImageLinkForm />
      {/*  <FaceRecongition /> */}
    </div>
  );
}

export default App;

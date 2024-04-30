import Navbar from './Navbar.tsx';
import Home from './Home.tsx';


const App: React.FC = () => {
  const handleClick = (yo: string, e: React.MouseEvent<HTMLButtonElement>) => {
      // Handle the click event here
      console.log(yo + "  -  " + e.target);
  };

  return (
    <div className='App'>
        <Navbar/>
    </div>
      
  );
};

export default App;
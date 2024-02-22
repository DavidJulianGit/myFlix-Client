import { createRoot } from 'react-dom/client';
import NavigationBar from './components/nagivation-bar/navigation-bar';
import MainView from './components/main-view/main-view';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const App = () => {
   return (
      <>
         <NavigationBar />
         <MainView />
      </>
   );
};

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App />);

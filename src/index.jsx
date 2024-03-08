import { createRoot } from 'react-dom/client';
import { Container } from 'react-bootstrap';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store'
import MainView from './components/main-view/main-view';



// Styles
//import 'bootstrap/dist/css/bootstrap.min.css'; 
import './bootstrap.min.css';
import './index.scss';


const App = () => {
   return (
      <>
         <Provider store={store}>
            <Container>
               <MainView />
            </Container>
         </Provider>

      </>
   );
};

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App />);


import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< Updated upstream
import MainView from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
=======
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import  MainView  from './components/main-view/main-view';


// Import statement to indicate that we need to bundle `./index.scss`
>>>>>>> Stashed changes
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
<<<<<<< Updated upstream
    return (
      <MainView />
=======
    return(
     <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
>>>>>>> Stashed changes
    );
  }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

<<<<<<< Updated upstream
// Tells React to render your app in the root DOM element
=======
// Tell React to render our app in the root DOM element
>>>>>>> Stashed changes
ReactDOM.render(React.createElement(MyFlixApplication), container);
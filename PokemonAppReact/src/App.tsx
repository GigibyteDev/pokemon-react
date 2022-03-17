import './Styles/App.css';
import Header from './Components/Header';
import PokemonForm from './Components/PokemonForm';
import Party from './Components/Party';
import {Routes, Route} from 'react-router-dom';
import Notification from './Components/Notification';
import {useState} from 'react';
import {notificationTypes} from './Components/Notification';
import {resetAnimation} from './Helpers/HelperFunctions';

function App() {

  const [notificationType, setNotificationType] = useState<notificationTypes>('hidden');
  const [notificationText, setnotificationText] = useState<string>('');

  const handleShowNotification = (type: notificationTypes, message: string) => {
    setNotificationType(type);
    setnotificationText(message);
    let notification = document.getElementById('notificationBox');
    resetAnimation(notification);
  }

  return (
    <div className="App">
      <Header />
      <Notification type={notificationType} message={notificationText} />
      <Routes>
        <Route path="/"  element={<PokemonForm showNotification={handleShowNotification}/>} />
        <Route path="/party" element={<Party showNotification={handleShowNotification} />} />
      </Routes>
    </div>
  );
}

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

// import Home from './views/Home.js';
import ConsultantDashboard from './views/ConsultantDashboard.js';

const App = () => {
  
  return (
    <div className="scopecliq">
      <ConsultantDashboard/>
    </div>
  );
}

export default App;

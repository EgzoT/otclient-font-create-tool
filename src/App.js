import './App.css';

import Main from './views/Main';

const style = {
  backgroundColor: "#282c34",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white"
}

function App() {
  return (
    <div className="App" style={ style }>
      <Main/>
    </div>
  );
}

export default App;

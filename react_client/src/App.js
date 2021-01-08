import React,{ Fragment } from "react";
import Widget from './components/Widget';
import socket from "./socket/socket";

function App() {
  const [perfData, setPerfData] = React.useState({});


  React.useEffect(() => {
      
      socket.on("PerfDataForUI", (data) => {

          setPerfData(prevData => {
              const currData = {...prevData};
              currData[data.mac] = data
              return currData;
          })
      })
  }, []);

  let widgetList = null;
  if(Object.keys(perfData).length > 0){
    widgetList = Object.keys(perfData).map((machine) => {
      return <Widget key={perfData[machine].mac} {...perfData[machine]} />
    })
  }
  
  return (
    <Fragment>
      {widgetList}
    </Fragment>
  );
}

export default App;

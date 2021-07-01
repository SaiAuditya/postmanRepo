import ReportItem from './ReportItem';
import classes from './Report.module.css';
import {useState, useEffect} from 'react';
import StackedBar from '../DetailedReport/summary';
let passArray = []
let failArray= []
let fileNames =[]
const loadData = async () =>
 {
  const responce = await fetch(
    'http://localhost:3003/api/files'
  );
  const data = await responce.json();
  await data.filesJson.map((report) => {
    passArray.push(report.totalPass)
    failArray.push(report.totalFail)
    fileNames.push(report.name+"_"+report.timeStamp)
  })
  return data;
 
}
const Reports = (props) => {

const [files, setFiles] = useState(null);


useEffect( () => {
   loadData().then(data=>(
    setFiles(data)
    )
    );
},[]);

//console.log(files);
  return (
    <section className={classes.products}>
      <h2>All Avaialable Reports</h2>
     { !files && <div className={classes.loader}></div>}
      {files && <StackedBar passArray={passArray} failArray={failArray} fileNames = {fileNames}></StackedBar>}
      {files &&
      <ul>
        {files.filesJson.map((report) => (
          <ReportItem
            key={report.id}
            id={report.id}
            title={report.name}
            pass={report.totalPass}
            fail={report.totalFail}
            timeStamp={report.timeStamp}
          />
        ))}
      </ul>}
    </section>
  );
};

export default Reports;


import Card from '../UI/Card';
import {useSelector,useDispatch} from 'react-redux';
import { useEffect,Fragment } from 'react';
import DoughnutChart from './piechart'
import ReportStep from '../DetailedReport/reportstep'
import VerticalBar from './barchart';
import {uiActions} from '../../store/ui-slice';
const loadData = async (filename) =>
 {
  const responce = await fetch(
    'http://localhost:3003/api/files/'+filename
  );
  const data = await responce.json();
  return data;
 }

const DetaildReport = () =>
{
    const filename = useSelector((state)=>state.ui.filename);
    const passSteps = useSelector((state)=>state.ui.totalPassedTests);
    const failSteps = useSelector((state)=>state.ui.totalFailedTests);
    const passReq = useSelector((state)=>state.ui.totalPassedReqs);
    const failReq = useSelector((state)=>state.ui.totalFailedReqs);
    const postReqCount = useSelector((state)=>state.ui.totalPostReqs);
    const getReqCount = useSelector((state)=> state.ui.totalGetReqs);
    const results = useSelector((state)=>state.ui.results);
    const filterBy = useSelector((state)=>state.ui.activeFiter);
    const dispatch = useDispatch();
  
    useEffect(()=>
    {
       loadData(filename).then((data)=> {
       
       dispatch(uiActions.update_Results(data))

       console.log(data);

        const setCounts = () =>
        {
        let passedCount = 0
        let failedCount = 0
        let _postReqCount = 0
        let _getReqCount = 0
        for(var i =0 ; i< data.resultsArray.length; i++)
        {
            for (var key in data.resultsArray[i].tests)
            {
                data.resultsArray[i].tests[key] ? passedCount++ : failedCount++
            }
        }
        
        let totalReq= data.collection.requests.length;
        let passedReq = totalReq-failedCount;
        console.log("test "+data.collection.requests)
        for (var j=0; j< data.collection.requests.length;j++)
        {
            data.collection.requests[j].method === "POST" ? _postReqCount+=1: _getReqCount+=1
              
        }
        console.log("passedCount"+passedCount)
        console.log("post Reqs " +_postReqCount)
        console.log("get Reqs " +_getReqCount)
        dispatch(uiActions.updateCounts({totalPassedTests: passedCount, totalFailedTests: failedCount, 
            totalFailedReqs:failedCount,totalPassedReqs:passedReq, totalGetReqs:_getReqCount, totalPostReqs: _postReqCount}))
        }
        setCounts();
       } 
       ); 
        console.log(filename);
    },[filename,dispatch])

    const filterAll = ()=>{ dispatch(uiActions.updateFilterBy('All'))}
    const filterFail = () => {dispatch(uiActions.updateFilterBy('Failed'))}
    const filterPass= ()=> {dispatch(uiActions.updateFilterBy('Passed'))}
   
    return(
        <Fragment>
        {results && <Card>
            <button onClick ={filterAll}>All</button>
            <button onClick = {filterFail}>Fail</button>
            <button onClick={filterPass}>Pass</button>
        <p>Filtering on {filterBy}</p>
            </Card>}
      { results && <Card> 
           <table>
            <tbody>
            <tr>{results && <td>{filename} </td>}
            </tr>  
            <tr>  
            <td>
            <p><b>Total Requests</b></p>
            <p>Passed : <b>{passReq}</b></p>
            <p>Failed : <b>{failReq}</b></p>
            <DoughnutChart data={[failReq,passReq]}/>
            </td>
            <td>
            <p><b>Total Tests</b></p>
            <p>Passed : <b>{passSteps}</b></p>
            <p>Failed : <b>{failSteps}</b></p>
            <DoughnutChart data={[failSteps,passSteps]}/>      
            </td>
            <td>
                <p></p>
                <p></p>
                <p></p>
                <VerticalBar data={[postReqCount,getReqCount]}></VerticalBar>
            </td>
            </tr>
            <tr>
            </tr>
            </tbody>
            </table> 
      </Card> }

        { results && results.resultsArray.map((step,index) => <ReportStep data={step} key={index}></ReportStep>)}
        
        </Fragment>

    );

    
}

export default DetaildReport;
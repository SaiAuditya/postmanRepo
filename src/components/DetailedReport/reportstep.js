import {useSelector} from 'react-redux';
import Card from '../UI/Card'
import classes from '../DetailedReport/reportstep.module.css'
const ReportStep = (props) =>
{
    const filterBy = useSelector((state)=>state.ui.activeFiter);
    const {name, url, time, tests} = props.data
    let passed = []
    let failed = []
    for(var key in tests)
    {
        tests[key] ? passed.push(key) : failed.push(key)
    }
  
    if ((filterBy==='Passed') && failed.length>0)
    {
        return(null);
    }else if ((filterBy==='Failed') && failed.length===0)
    {
        return(null);
    }
  else {
    return (
        <Card>
            <table>
                <tbody>
                <tr>
    <td>Name :{name}</td>
                    <td>URL :<a href = {url}>{url}</a> </td>
    <td>Total Time:{time/1000} Seconds</td>
                </tr>
        <tr>
            <td>
        {
            passed.map((key,index) => <p className={classes.pass} key={index}>{key} : PASSED</p>)
        }
        {
            failed.map((key,index) => <p className={classes.fail} key={index}>{key} : FAILED</p>)
        }
        </td>
        </tr>
        </tbody>
            </table>
        
        </Card>
    );
    }
}

export default ReportStep
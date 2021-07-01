
import Card from '../UI/Card';
import classes from './ReportItem.module.css';
import { useDispatch,useSelector} from 'react-redux';
import {uiActions} from '../../store/ui-slice'

const ReportItem = (props) => {

  const { title, pass, fail, timeStamp, id } = props;
  const showDetailedReport = useSelector((state)=>state.ui.reportIsVisible)
 
  const dispath = useDispatch();
  const onClickHandler = () =>
  {
    //console.log('dispatching action')
    dispath(uiActions.showReport(title));
  }

  return (
    <li className={classes.item}>
      {!showDetailedReport && <Card>
        <header>
  <h3>{id+1}.{title}</h3>
          <div className={classes.pass}>Pass: {pass}</div>
          <div className={classes.fail}>Fail: {fail}</div>
        </header>
        <p>{timeStamp}</p>
        <div className={classes.actions}>
          <button onClick={onClickHandler}>View Report</button>
        </div>
      </Card>}
    </li>
  );
};

export default ReportItem;

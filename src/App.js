import { Fragment} from 'react';
import { useSelector} from 'react-redux';

import Layout from './components/Layout/Layout';
import Reports from './components/Reports/Reports';
import Notification from './components/UI/Notification';
import DetaildReport from './components/DetailedReport/DetailedReport';

function App() {

  const notification = useSelector((state) => state.ui.notification);
  const showReport = useSelector((state)=>state.ui.reportIsVisible);

  console.log(showReport);


  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}

      <Layout>
      {!showReport && <Reports />}
      {showReport && <DetaildReport></DetaildReport>}
      </Layout>
    </Fragment>
  );
}

export default App;

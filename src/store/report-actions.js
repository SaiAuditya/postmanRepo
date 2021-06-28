import { uiActions } from './ui-slice';

export const fetchReportsData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'http://localhost:3003/api/files'
      );

      if (!response.ok) {
        throw new Error('Could not fetch report data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      await fetchData();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};

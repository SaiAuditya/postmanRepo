import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',

  initialState: { results:null, reportIsVisible: false, notification: null, 
    filename:null, totalPassedReqs:0, totalFailedReqs: 0, 
    activeFiter:'Passed', activeFilterRoute:'dummyURL', 
    totalPassedTests:0, totalFailedTests:0, totalGetReqs:0, totalPostReqs:0},

  reducers: {

    showReport(state,action) {
      state.reportIsVisible = true;
      state.filename=action.payload;
    },
    hideReport(state) {
      state.reportIsVisible = false;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
      },
      updateCounts(state,action)
      {
        state.totalPassedReqs = action.payload.totalPassedReqs;
        state.totalFailedReqs = action.payload.totalFailedReqs;
        state.totalPassedTests = action.payload.totalPassedTests;
        state.totalFailedTests = action.payload.totalFailedTests;
        state.totalGetReqs = action.payload.totalGetReqs;
        state.totalPostReqs = action.payload.totalPostReqs;
      },
      update_Results(state,action)
      {
        //console.log("payLoad "+ action.payload)
        state.results=action.payload;
        //console.log(state.results)
      },

      updateFilterBy(state,action)
      {
        state.activeFiter = action.payload
      }
    }
      
});

export const uiActions = uiSlice.actions;

export default uiSlice;

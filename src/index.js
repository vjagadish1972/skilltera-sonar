import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { UserContextState } from "./Context/userContextState";
import { JobApprovalContextState } from "./Context/jobApprovalContextState";
import { OpsContextState } from "./Context/opsContextState";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const root = createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <JobApprovalContextState>
      <UserContextState>
        <OpsContextState>
          <Provider store={store}>
            <QueryClientProvider client={queryClient} >
              <App />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </Provider>
        </OpsContextState>
      </UserContextState>
    </JobApprovalContextState>
  </React.StrictMode>,

)


reportWebVitals();

//REVERT RAKESH CHANGES Again - 16 Aug
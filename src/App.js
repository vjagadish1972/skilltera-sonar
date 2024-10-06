import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RoutesPath from "./Route/route";
//import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ErrorContextState } from "./Context/errorContextState";
import "react-chat-elements/dist/main.css";

function App() {
    return (
        <BrowserRouter>
            <ErrorContextState>
                <RoutesPath />
            </ErrorContextState>
        </BrowserRouter>
    );
}

export default App;

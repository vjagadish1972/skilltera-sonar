import "./style.css";

//components
import CompanyNavBar from "../NavBar";
export default function CompanyLayout({ children }) {
    return (
        <div className="company_layout">
            <CompanyNavBar />
            {children}
        </div>
    );
}

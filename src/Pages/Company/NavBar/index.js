import "./style.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
//Assets
import { MdNotifications, MdMessage } from "react-icons/md";
import Logo from "../../../Assets/skilltera_logo1.png";
//components
import UserDropdown from "./UserDropdown";
import { useState  , useEffect} from "react";
import { TbMessageDown } from "react-icons/tb";
import ApiConstants from '../../../Services/apiconstants';
import axios from 'axios';

const CompanyNavBar = () => {
    const company_loggedin_user_data = JSON.parse(sessionStorage.getItem("company_loggedin_user_data"))
    const token = company_loggedin_user_data.token

    const [notificationStatus,setNotificationStatus] = useState(false)
    const navigate = useNavigate();
    const pages = [
        {
            name: "Candidates",
            link: "/company",
            path: "",
        },
        // {
        //     name: "Post a Job",
        //     link: "/postjob",
        // },
        // {
        //     name: "Jobs Posted",
        //     link: "/jobs",
        // },
    ];

    const messageButton = () => {
        navigate('/messages')
    }


    const getNotificationStatus = async () => {

       await axios.get(ApiConstants.GET_NOTIFICATION_STATUS_COMPANY, {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    token: token,
                    "Access-Control-Allow-Origin": true,
                    "Access-Control-Allow-Methods": "GET, POST, PATCH",
                },
            })  
        .then((res) => {
        
            setNotificationStatus(res.data.notification_status)
        }) 
        .catch((error) => {
            // if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {
            //   Interceptor(error.response.status)
            // }
            console.log(error);

        });
    }


    useEffect(() => {

       getNotificationStatus()

    },[token])

    

    return (
        <div className="company_navbar">
            <div className="logo_container">
                <img src={Logo} alt="logo" className="img-fluid" />
            </div>
            <nav className="nagivator showSidebar">
                <ul>
                    {pages.map((entry) => (

                        < NavigatorLink key={entry.link} data={entry} />
                    ))}
                </ul>
            </nav>
            <div className="control_icons">
                <div className="message_icon">
                {notificationStatus === true ? <TbMessageDown size={20} onClick={messageButton} /> : <MdMessage onClick={messageButton} />   }   
                </div>
                <div className="notification_icon">
                    <MdNotifications />
                </div>
                <UserDropdown />
            </div>
        </div>
    );
}
const NavigatorLink = ({ data }) => {
    const location = useLocation();
    let customStyle = {
        borderBottom: "2px solid transparent",
        color: "#444",
        fontWeight: "normal",
    };
    if (location.pathname.split("/")[1] === data.link.split("/")[1]) {
        customStyle = {
            color: "#246da2",
            borderBottom: "2px solid #246da2",
            fontWeight: "bold",
        };
    }
    return (
        <li style={customStyle}>
            <NavLink exact to={data.link}>
                {data.name}
            </NavLink>
        </li>
    );
};

export default CompanyNavBar

import React from "react";
import { useSelector } from "react-redux";
import Footer from "../../Component/Footer/footer";
import NavBarNew from "../../Component/NavBar New/navBarNew";
import HomePageJobLists from "../HomePageJobLists/homePageJobLists"
import OurServices from "../Our Services/ourServices";
import "./home.css";

//Pages
import Blog from "../Blog/blog";
import CandidateHome from "./Candidate Home/candidateHome";
import ClientHome from "./ClientHome/clientHome";
import ReferHome from "./Refer Home/referHome";

const Home = () => {
    const ItemSelection = useSelector((state) => state.homeItemSelection);
    return (
        <div className="home_page__wrapper">
            <NavBarNew />
            {ItemSelection === "candidate" && <CandidateHome />}
            {ItemSelection === "refer" && <ReferHome />}
            {ItemSelection === "client" && <ClientHome />}
            {ItemSelection === "blog" && <Blog/>}
            {ItemSelection === "all_Jobs" && <HomePageJobLists/>}
            {ItemSelection === "our-services" && <OurServices/>}
           
            <Footer />
        </div>
    );
};


export default Home;









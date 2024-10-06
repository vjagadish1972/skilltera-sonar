import React from "react";
import AboutCard from "./AboutCard/aboutCard";
import CertificateCard from "./CertificateCard/certificateCard";
import EducationCard from "./EducationCard/educationCard";
import ExperienceCard from "./ExperienceCard/experienceCard";
import RecommendationCard from "./RecommendationCard/recommendationCard";
import { SkillCard } from "./SkillCard/skillCard";


const UserPersonalInfo = () => {

  return (
    <>
      <AboutCard />
      <SkillCard />
      <CertificateCard />
      <RecommendationCard />
      <ExperienceCard />
      <EducationCard />

    </>
  );
};

export default UserPersonalInfo;

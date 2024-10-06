import AboutCardCandidate from "./AboutCardCandidate/aboutCardCandidate"
import CertificateCardCandidate from "./CertificateCardCandidate/certificateCardCandidate"
import EducationCardCandidate from "./EducationCardCandidate/educationCardCandidate"
import SkillCardCandidate from "./SkillCardCandidate/skillCardCandidate"


export const Personal = (props) => {
    return (
        <>
            <AboutCardCandidate {...props} />
            <SkillCardCandidate skills={props.skills} />
            <CertificateCardCandidate certificate={props.certificate} />
            <EducationCardCandidate education={props.education} />
        </>
    )
}

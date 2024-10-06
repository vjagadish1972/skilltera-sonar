import { useState } from "react";
import "./style.css";
import { LinearDropdown } from "../../../Component/Common/Dropdown";
import { Button } from "../../../Component/Common/Button/Button";
import AsyncSelect from "react-select/async";
import StarRating from "../StarRatingClient";
//Assets
import { IoMdCloseCircleOutline } from "react-icons/io";
//APIs
import { getAllSkills } from "../../../Services/API/common.api";
const FilterComponent = ({ closeComp, prefillData, updateFilterData, refreshApi, setRefreshApi }) => {
    const [skillList, setSkillList] = useState(prefillData.searchedSkills);
    const [filterData, setFilterData] = useState(prefillData);
    async function fetchOptions(inputValue) {
        if (inputValue.length < 3) return [];
        const response = await getAllSkills({
            search: inputValue,
        });
        if (response.status === 200) {
            const data = response.data.skills;
            const options = data.map((item) => ({
                value: item._id,
                label: item.skill,
            }));
            return options;
        } else {
            alert("Error fetching options:");
            return [];
        }
    }
    function removeSkill(skillValue) {
        const filteredArr = skillList.filter(
            (skill) => skill.value !== skillValue
        );
        setSkillList(filteredArr);
        setFilterData({
            ...filterData,
            searchedSkills: [...filteredArr],
        });
    }
    function showResults() {
        setRefreshApi(!refreshApi)
        updateFilterData(filterData);
        closeComp();
    }
    function clearAll() {
        setFilterData({
            minExp: 0,
            maxExp: 0,
            jobType: '',
            searchedSkills: [],
        });
        setSkillList([]);
    }
    return (
        <div className="filter_container">
            <div className="filter_container__row_1">
                <span>Filter</span>
                <span onClick={clearAll} style={{ cursor: "pointer" }}>
                    Clear All
                </span>
            </div>
            {/* <SearchBar /> */}
            <AsyncSelect
                isSearchable={true}
                cacheOptions={true}
                value=''
                loadOptions={(inputValue) => fetchOptions(inputValue)}
                onChange={(value) => {
                    let temp = skillList;
                    let flag = false;

                    for (let skill in skillList) {
                        if (skillList[skill].value === value.value) {
                            alert("Already Exists");
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        temp.push({
                            ...value,
                            ratingValue: 0,
                        });

                        setSkillList([...temp]);
                        setFilterData({
                            ...filterData,
                            searchedSkills: [...temp],
                        });
                    }
                }}
                placeholder="Search skills"
                noOptionsMessage={() =>
                    "Enter Atleast 3 characters/No options available"
                }
            />
            <div className="filter_container__skill_row">
                {skillList.length ? (
                    skillList.map((skill, index) => (
                        <span className="job_card__skill" key={skill.value}>
                            <span onClick={() => removeSkill(skill.value)}>
                                <IoMdCloseCircleOutline />
                            </span>
                            <p>{skill.label}</p>
                            <StarRating
                                ratingValue={skill.ratingValue}
                                onChange={(value) => {
                                    let tempSkill = skill;
                                    let tempArr = skillList;
                                    tempSkill.ratingValue = value;
                                    tempArr[index] = tempSkill;
                                    setSkillList([...tempArr]);
                                }}
                            />
                        </span>
                    ))
                ) : (
                    <p>No Skill Selected</p>
                )}
            </div>
            <div className="filter_container__jobType_row_container">
                <span className="filter_container__jobType_row">
                    <p>Select Job Type</p>
                    <LinearDropdown
                        label='Select Job Type'
                        options={jobType}
                        selected={filterData.jobType}
                        setselected={(value) => {
                            setFilterData({
                                ...filterData,
                                jobType: value,
                            });
                        }}

                    />
                </span>


            </div>
            <div className="filter_container__exp_row_container">
                <p>Experience ( Years )</p>
                <span className="filter_container__exp_row_minima">
                    <p>Minimum</p>
                    <LinearDropdown
                        options={yearsArr}
                        selected={filterData.minExp}
                        setselected={(value) => {
                            setFilterData({
                                ...filterData,
                                minExp: value,
                            });
                        }}
                    />
                </span>
                <span>
                    <p>Maximum</p>
                    <LinearDropdown
                        options={yearsArr}
                        selected={filterData.maxExp}
                        setselected={(value) => {
                            setFilterData({
                                ...filterData,
                                maxExp: value,
                            });
                        }}
                    />
                </span>
            </div>
            <div className="filter_container__btn_ctrls">
                <Button
                    text="Cancel"
                    buttonVariant="outlined"
                    fontsize="14px"
                    width="7rem"
                    padding=".25rem 1rem"
                    height="2.5rem"
                    onClick={closeComp}
                />
                <Button
                    text="Show Results"
                    fontsize="14px"
                    width="max-content"
                    padding=".25rem 1rem"
                    height="2.5rem"
                    onClick={showResults}
                />
            </div>
        </div>
    );
};
export default FilterComponent;
const yearsArr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
];
const jobType = ['Fulltime', 'C2C', 'C2H', 'Parttime']

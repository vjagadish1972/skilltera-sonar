import axios from 'axios';
import react, { useEffect, useState } from 'react'
import ApiConstants from '../../../Services/apiconstants';
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Interceptor } from '../../../ErrorStatus/errorStatus';
import { GetAllSkills } from '../../../Redux/Reducer/skillReducerSlice';

export default function SkillAddRemove() {
    const [values, setValues] = useState({
        skillDataAdmin: {},
    });
    const {
        register,
        handleSubmit,
    } = useForm();
    const [pending, setPending] = useState(true);
    const [columnsList, setColumnsList] = useState([]);
    const searchItem = useSelector((state) => state.searchBar);
    const [deleted, setDeleted] = useState('');
    const [addedSkill, setAddedSkill] = useState('');
    const dispatch = useDispatch()

    const skillSelection = useSelector(
        (state) => state.skills
    );


    const skillAdminData = () => {
        const id = JSON.parse(sessionStorage.getItem("ADMIN")).admin._id;
        const token = JSON.parse(sessionStorage.getItem("ADMIN")).token;
        axios
            .get(ApiConstants.SKILL_VIEW_ALL,
                {

                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        token: token,
                        id: id,
                        "Access-Control-Allow-Origin": true,
                        "Access-Control-Allow-Methods": "GET, POST, PATCH",
                    }

                })
            .then((response) => {
                setValues({
                    ...values,
                    skillDataAdmin: response.data.skills,
                });
            })
            .catch((error) => {
                if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {
                    Interceptor(error.response.status)
                }

            });
    };

    useEffect(() => {
        // skillAdminData();
        dispatch(GetAllSkills())
    }, [deleted, addedSkill])

    const deleteSKillAdmin = (skillId) => {
        const id = JSON.parse(sessionStorage.getItem("ADMIN")).admin._id;
        const token = JSON.parse(sessionStorage.getItem("ADMIN")).token;

        axios
            .put(ApiConstants.SKILL_DEACTIVATE + skillId, {},
                {

                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        token: token,
                        id: id,
                        "Access-Control-Allow-Origin": true,
                        "Access-Control-Allow-Methods": "GET, POST, PATCH",
                    }

                })
            .then((response) => {
                Swal.fire({
                    title: response.data.message,
                    icon: "success",
                    width: 400,
                    height: 100,
                });
                setDeleted(skillId)
            })
            .catch((error) => {

                if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {
                    Interceptor(error.response.status)
                }

            });
    };


    useEffect(() => {
        const timeout = setTimeout(() => {
            setColumnsList([
                {
                    name: "ID",
                    cell: (row, index) => index + 1,
                },
                {
                    name: "Skill",
                    selector: (row) => row.skill,
                },
                {
                    name: "Selection",
                    cell: (row) => (
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{
                                'background': '#6e4dcd',
                                'borderRadius': '8px'
                            }}
                            onClick={() => deleteSKillAdmin(row._id)}
                        >
                            Deactivate
                        </button>
                    ),
                },
                {
                    name: (<>
                        <form onSubmit={handleSubmit(addingSkillData)}>
                            <div className="input-group">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter Skill"
                                    {...register("addingSkill")}
                                    required />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-warning"
                                        type="submit">Add</button>
                                </div>
                            </div>
                        </form>
                    </>)
                },

            ]);
            setPending(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [])

    const addingSkillData = (data) => {
        const id = JSON.parse(sessionStorage.getItem("ADMIN")).admin._id;
        const token = JSON.parse(sessionStorage.getItem("ADMIN")).token;
        axios
            .post(ApiConstants.SKILL_ADD, {
                newSkill: data.addingSkill
            },
                {

                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        token: token,
                        id: id,
                        "Access-Control-Allow-Origin": true,
                        "Access-Control-Allow-Methods": "GET, POST, PATCH",
                    }

                })
            .then((response) => {
                Swal.fire({
                    title: response.data.message,
                    icon: "success",
                    width: 400,
                    height: 100,
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: error.response.data.error,
                    icon: "error",
                    width: 400,
                    height: 100,
                });
            });
        setAddedSkill(data.addingSkill)
    }
    return (
        <>
            {
                Object.keys(skillSelection.skillList.data).length && (
                    <DataTable
                        title='Skill - Add/Remove '
                        striped
                        responsive
                        pagination
                        paginationRowsPerPageOptions={[10, 20, 30]}
                        paginationPerPage={10}
                        highlightOnHover
                        progressPending={pending}
                        columns={columnsList}
                        data={skillSelection.skillList.data.filter((item) => {
                            if (searchItem.initialValue === "") {
                                return item;
                            } else if (
                                item.skill.toLowerCase().includes(searchItem.initialValue.toLowerCase())
                            ) {
                                return item;
                            }
                        })}
                    />
                )
            }
        </>
    );
}
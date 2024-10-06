import axios from 'axios';
import react from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import ApiConstants from '../../../Services/apiconstants';
import { Interceptor } from "../../../ErrorStatus/errorStatus"
import { GetAllJobList } from '../../../Redux/Reducer/jobRoleReducerSlice'

export default function JobRole() {

    const [values, setValues] = useState({
        jobRoleDataAdmin: {},
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [pending, setPending] = useState(true);
    const [columnsList, setColumnsList] = useState([]);
    const searchItem = useSelector((state) => state.searchBar);
    const [deleted, setDeleted] = useState('');
    const [jobRoleAdded, setJobRoleAdded] = useState('')
    const dispatch = useDispatch()
    const jobRoleSelection = useSelector((state) => state.jobRole);

    const jobRoleAdminData = () => {
        const id = JSON.parse(sessionStorage.getItem("ADMIN")).admin._id;
        const token = JSON.parse(sessionStorage.getItem("ADMIN")).token;
        axios
            .get(ApiConstants.VIEW_ALL_JOB_ROLE,
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
                    jobRoleDataAdmin: response.data.roles,
                });
            })
            .catch((error) => {

                if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {
                    Interceptor(error.response.status)
                }
            });
    };
    useEffect(() => {
        //jobRoleAdminData()

        dispatch(GetAllJobList())
    }, [deleted, jobRoleAdded])


    useEffect(() => {
        const timeout = setTimeout(() => {
            setColumnsList([
                {
                    name: "ID",
                    cell: (row, index) => index + 1,
                },
                {
                    name: "Skill",
                    selector: (row) => row.role,
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
                            onClick={() => deleteJobRoleAdmin(row._id)}
                        >
                            Deactivate
                        </button>
                    ),
                },
                {
                    name: (<>
                        <form onSubmit={handleSubmit(addingJobRole)}>
                            <div className="input-group">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter Job Role"
                                    {...register("addingJobRole")}
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

    const deleteJobRoleAdmin = (jobRoleId) => {
        const id = JSON.parse(sessionStorage.getItem("ADMIN")).admin._id;
        const token = JSON.parse(sessionStorage.getItem("ADMIN")).token;
        axios
            .put(ApiConstants.JOB_ROLE_DEACTIVATE_BY_ID + jobRoleId, {},
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
                setDeleted(jobRoleId)
            })
            .catch((error) => {
                if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {
                    Interceptor(error.response.status)
                }

            });

    };

    const addingJobRole = (data) => {
        const id = JSON.parse(sessionStorage.getItem("ADMIN")).admin._id;
        const token = JSON.parse(sessionStorage.getItem("ADMIN")).token;
        axios
            .post(ApiConstants.ADD_JOB_ROLES, {
                newRole: data.addingJobRole
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
                setJobRoleAdded(data.addingJobRole)
            })
            .catch((error) => {

                if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {
                    Interceptor(error.response.status)
                }
            })
    }
    return (
        <>
            {
                Object.keys(jobRoleSelection.jobRoleList.data).length && (
                    <DataTable
                        title='Job Role - Add/Remove '
                        striped
                        responsive
                        pagination
                        paginationRowsPerPageOptions={[10, 20, 30]}
                        paginationPerPage={10}
                        highlightOnHover
                        progressPending={pending}
                        columns={columnsList}
                        data={jobRoleSelection.jobRoleList.data.filter((item) => {
                            if (searchItem.initialValue === "") {
                                return item;
                            } else if (
                                item.role.toLowerCase().includes(searchItem.initialValue.toLowerCase())
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
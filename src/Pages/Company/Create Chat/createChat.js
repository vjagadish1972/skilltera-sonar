import react, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import ApiConstants from "../../../Services/apiconstants";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Modal } from 'react-bootstrap';
import $ from "jquery";
import { Interceptor } from "../../../ErrorStatus/errorStatus"

export default function CreateChat({ handleShow, fullName, chatId, subject, closeCreateChatModal }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
    } = useForm();

    const handleButtonClick = () => {
        closeCreateChatModal()
    }
    const onSubmit = (data) => {
        const company_loggedin_user_data = JSON.parse(sessionStorage.getItem("company_loggedin_user_data"))
        const token = company_loggedin_user_data.token
        axios.post(ApiConstants.CREATE_CONVERSATIONS, {
            subject: subject.jobName,
            candidateId: chatId
        }, {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                token: token,
                "Access-Control-Allow-Origin": true,
                "Access-Control-Allow-Methods": "GET, POST, PATCH",
            }
        }).then((response) => {
            axios.post(ApiConstants.CREATE_CHAT_MESSAGE_BY_COMPANY, {
                conversationId: response.data.conversation._id,
                text: data.message
            }, {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    token: token,
                    "Access-Control-Allow-Origin": true,
                    "Access-Control-Allow-Methods": "GET, POST, PATCH",
                }
            }).then(res => {
                Swal.fire({
                    title: res.data.message,
                    icon: "success",
                    width: 400,
                    height: 50,
                }).then(() => {
                    resetField('message')
                    $("[data-dismiss=modal]").trigger({ type: "click" })
                })


            }).catch(error => {
                if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 503 && error.response.status <= 599)) {
                    Interceptor(error.response.status)
                }
            })
        }).catch((error) => {
            Swal.fire({
                title: error.response.data.error,
                icon: "error",
                width: 400,
                height: 50,
            })
            if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 503 && error.response.status <= 599)) {
                Interceptor(error.response.status)
            }
        })
    }
    return (
        <>
            <Modal show={handleShow} animation={false}>
                <Modal.Header>
                    <Modal.Title>{fullName}</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="modal-body">
                        <div className="form-group mb-2">
                            <label>Subject:</label> &nbsp;
                            <span><b>{subject?.jobName}</b></span>

                            {/* <input type="text" className="form-control"
                                disabled
                                placeholder={subject.jobName}
                                {...register('subject', {
                                    required: true
                                })}

                            /> */}
                            {/* {errors.subject?.type === 'required' && <p role="alert" style={{ color: "red" }}>Subject is required</p>} */}
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea type="textarea"
                                rows="8"
                                className="form-control"
                                placeholder="Write something to the candidate..."
                                {...register('message', {
                                    required: true
                                })} />
                            {errors.message?.type === 'required' && <p role="alert" style={{ color: "red" }}>Message is required</p>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleButtonClick} data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Send</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
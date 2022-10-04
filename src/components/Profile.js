import React,{ useState } from 'react'
import '../styles/Profile.css'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom'
import ProfileContent from './ProfileContent.js'
import JobSeekerJobsApplied from './JobSeekerJobsApplied.js'
import JobsPosted from './JobsPosted.js'
import PostAJob from './PostAJob.js'
import { useStateValue } from '../DataStore'
import ChangePassword from './ChangePassword'
import Footer from './Footer'
import axios from 'axios'
import Cookies from 'js-cookie'
import ReactModal from "react-modal";
import UpdateJob from "./UpdateJob";
import AcceptApplications from './AcceptApplications'


function Profile() {
	const [ { profile },  ] = useStateValue();

	const initialState = {
		changePassword: false,
		profile: false,
		jobsApplied: false,
		jobsPosted: false,
		postAJob: false
	};

	const tempProfile = {
		first_name: "Henrich",
		last_name: "Hertz",
		email: "hertz@gmail.com",
		phone_number: "071869307",
		residence: "Milan",
		is_staff: true,
	}

	const navigate = useNavigate();

	const [selected, setSelected] = useState(initialState);

	const [state, setState] = useState({
		selectedRow: "",
		jobUpdate: false,
		acceptApplications: false,
		selectedJob:{}
	})


	const updateJob = (e) => {
		e.preventDefault();
		setState({ ...state, jobUpdate: true, acceptApplications: false });
	};

	const applicationsAccept = e =>{
		e.preventDefault();
		setState({ ...state, jobUpdate: false, acceptApplications: true });

	}

	const logOut = async (e) =>{
		const yes = window.confirm("Are you sure you want to log out?")

		if (yes) {
			const config = {
				headers: {
					Accept: "application/json",
					"Content-Type": "application.json",
					"X-CSRFToken": Cookies.get("csrftoken"),
				},
			};

			const body ={
				withCredentails: true,
				data: "logout"
			}

			try{
				const res = await axios.post('http://localhost/users/logout',body,config)

				const { success, error } = res.data

				if(success){
					alert(success)
					navigate('/')
				}else{
					alert(error)
				}

			}catch(error){
				alert("Something went wrong. Failed to log out")
			}
		}
	}


	return (
		<div className="Profile">
			<div className="profile__sidebar">
				<div className="avatar">
					<Icon icon="carbon:user-avatar-filled-alt" width="50" height="50" />
				</div>

				<div className="sideBar__itemContainer">
					<div className={`sidebar__item ${selected.profile ? "active" : ""}`} onClick={() => setSelected({ ...selected, changePassword: false, profile: true, jobsApplied: false, jobsPosted: false, postAJob: false })}>Profile</div>
				</div>

				{tempProfile.is_staff? "":(<div className="sideBar__itemContainer">
					<div className={`sidebar__item ${selected.jobsApplied ? "active" : ""}`} onClick={() => setSelected({ ...selected, changePassword: false, profile: false, jobsApplied: true, jobsPosted: false, postAJob: false })}>
						Jobs Applied
					</div>
				</div>
)}

				{tempProfile.is_staff? (<div className="sideBar__itemContainer">
					<div className={`sidebar__item ${selected.jobsPosted ? "active" : ""}`} onClick={() => setSelected({ ...selected, changePassword: false, profile: false, jobsApplied: false, jobsPosted: true, postAJob: false })}>
						Jobs Posted
					</div>
					<div className={`sidebar__item ${selected.postAJob ? "active" : ""}`} onClick={() => setSelected({ ...selected, changePassword: false, profile: false, jobsApplied: false, jobsPosted: false, postAJob: true })}>
						Post A Job
					</div>
				</div>
):""}
				<div className="sideBar__itemContainer">
					<div className={`sidebar__item ${selected.changePassword ? "active" : ""}`} onClick={() => setSelected({ ...selected, changePassword: true, profile: false, jobsApplied: false, jobsPosted: false, postAJob: false })}>Change Password</div>
				</div>

				<div className="sideBar__itemContainer">
					<div className="sidebar__item" onClick={logOut}>Sign Out</div>
				</div>
			</div>
			<div className="profile__main">
				<div className="main__navigation">
					<Icon onClick={() => navigate('/')} icon="eva:arrow-back-outline" color="black" width="30" />
				</div>

				<div className="main__contentSection">
					{selected.profile ? (<ProfileContent profile={tempProfile} />) : ""}
					{selected.jobsApplied ? (<JobSeekerJobsApplied />) : ""}
					{selected.jobsPosted ? (<JobsPosted handler={setState} />) : ""}
					{selected.postAJob ? (<PostAJob />) : ""}
					{selected.changePassword ? (<ChangePassword />) : ""}
				</div>

				{state.selectedRow && selected.jobsPosted? (<div className="jobsButton">
					<button onClick={updateJob}>Update</button>
					<button onClick={applicationsAccept}>Accept Applications</button>
					</div>
				) : (
					""
				)}
			</div>

		

			<ReactModal
				isOpen={state.jobUpdate}
				contentLabel="Update job Details"
				onRequestClose={(e) => setState({ ...state, showModal: false })}
				className="Modal"
				overlayClassName="Overlay"
				appElement={document.getElementById("root")}
			>
				<UpdateJob jobDetails={state.selectedJob}/>
				<button
					onClick={(e) => setState({ ...state, jobUpdate: false })}
				>
					Close
				</button>
			</ReactModal>

			<ReactModal
				isOpen={state.acceptApplications}
				contentLabel="Update job Details"
				onRequestClose={(e) => setState({ ...state, showModal: false })}
				className="Modal"
				overlayClassName="Overlay"
				appElement={document.getElementById("root")}
			>
				<AcceptApplications jobDetails={state.selectedJob}/>
				<button
					onClick={(e) => setState({ ...state, acceptApplications: false })}
				>
					Close
				</button>
			</ReactModal>

			{tempProfile.is_staff?"":(<div className="ProfileFooter">
				<Footer />
			</div>)}
		</div>
	);
}

export default Profile
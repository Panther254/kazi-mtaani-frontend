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
			</div>
			<div className="profile__main">
				<div className="main__navigation">
					<Icon onClick={() => navigate('/')} icon="eva:arrow-back-outline" color="black" width="30" />
				</div>

				<div className="main__contentSection">
					{selected.profile ? (<ProfileContent profile={tempProfile} />) : ""}
					{selected.jobsApplied ? (<JobSeekerJobsApplied />) : ""}
					{selected.jobsPosted ? (<JobsPosted />) : ""}
					{selected.postAJob ? (<PostAJob />) : ""}
					{selected.changePassword ? (<ChangePassword />) : ""}
				</div>
			</div>
		</div>
	);
}

export default Profile
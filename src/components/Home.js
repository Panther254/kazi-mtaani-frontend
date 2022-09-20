import React from 'react'
import { useNavigate } from "react-router-dom"
import '../styles/Home.css'
import NavBar from './NavBar.js'
import Job from './Job.js'
import Footer from './Footer.js'
import { Icon } from '@iconify/react';
import { useStateValue } from '../DataStore'

const Home = () => {
	const navigate = useNavigate();
	const [{ user },] = useStateValue();

	const getStarted =()=>{
		if (user) {
			navigate('/profile')
		} else {
			navigate('login')
		}
	}

	return (
		<div className="Home">
			<NavBar />
			
			<div className="home__image">
				<div className="home__image__overlayText">
					<h3>Are You Unemplyed and</h3>
					<h3>In Need of A Job?</h3>
					<p>Looking for a job does not have to be</p>
					<p>stressfull anymore</p>
					<button onClick={getStarted}>Get Started</button>
				</div>
			</div>
			<hr/>
			<div className="home__jobFilters">
				<h5>FIND A JOB</h5>
				<div className="home__filters">
					<form action="">
						<div className="input__container">
							<input type="text" placeholder="Job Function" value=""/>
						</div>
						<div className="input__container">
							<input type="text" placeholder="Job Type" value=""/>
						</div>
						<div className="input__container">
							<input type="text" placeholder="Location" value=""/>
						</div>
						<div className="input__container">
							<button>Search</button>
						</div>
					</form>
				</div>
			</div>

			<div className="home__featuredJobs">
				<div className="featuredJobs__topBar">
				</div>
				<div className="featuredJobs_mainSection">
					<div className="left__section">
						<Job key="1"/>
						<Job key="2"/>
						<Job key="3"/>
						<Job key="4"/>
					</div>
					<div className="right__section">
						<h4>HOTTEST JOBS THIS MONTH</h4>
						<div className="job__listView">
							<p><strong>SALES EXECUTIVE MANAGER-COAST</strong></p>
							<p>Malindi-Coast</p>
						</div>
						<hr/>
						<div className="job__listView">
							<p><strong>SALES EXECUTIVE MANAGER-COAST</strong></p>
							<p>Malindi-Coast</p>
						</div>
						<hr/>
						<div className="social__login">
							<p>Login To Apply</p>
							<div className="social__icons">
								<Icon icon="logos:facebook" />
								<Icon icon="logos:twitter" />
								<Icon icon="flat-color-icons:google" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="home__services">
				<h2><strong>OUR SERVICES</strong></h2>
				<p><strong>Jobs-Hub is an online Platform That Connects Employers and Job Seekers Together. We try to make the process of finding the right candidate for your
					</strong>
				</p>
				<p><strong>
					organization to be as efficient as possible by linking the various Employers to qualified potential employees.
					</strong>
				</p>
			</div>

			<div className="home__howItWorks">
				<div className="icons__descriptions">
					<div className="icon__description">
						<Icon icon="carbon:user-avatar-filled" color="#009aee" />
						<p>Create Your Account and Update Your Profile</p>
					</div>
					<div className="icon__description">
						<Icon icon="bi:search" color="#009aee" />
						<p>Search For Jobs</p>
					</div>
					<div className="icon__description">
						<Icon icon="fa-regular:handshake" color="#009aee" />
						<p>Get Matched With Your Employer</p>
					</div>
				</div>
				<button onClick={getStarted}>GET STARTED</button>
			</div>

			<div className="home__testimonials">
				<div className="icon__container">
					<Icon icon="carbon:user-avatar-filled-alt" color="white" />
				</div>	
				<p>
					"We currently have seven employees, ranging from professionals such as our accountant and warehouse
					manager and the blue-collar staff such as our driver and office cleaners all outsourced through
					BrighterMonday. We are completely satisfied with their service and so are our employees. They pay our staff on
					time, invoice us on time and are very responsive to any queries we may have and are always ready to problem
					solve with us if the need arises.”
				</p>
				<p><strong>JAMES NJENGA-HUMAN RESOURCE MANAGER</strong></p>
			</div>

			<Footer/>
		</div>
	)
}

export default Home


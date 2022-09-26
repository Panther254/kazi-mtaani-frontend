import React from "react";
import "../styles/Footer.css";
import { Icon } from '@iconify/react';

const Footer = () => {
	return (
		<div className="Footer">

			<div className="footerDetails">
				<div className="socials">
					<h3>SOCIALS</h3>
					<Icon icon="foundation:social-facebook" color="white" />
					<Icon icon="akar-icons:instagram-fill" color="white" />
					<Icon icon="fa-brands:twitter-square" color="white" />
				</div>

				<div className="pages">
					<h3>PAGES</h3>
					<p>Home</p>
					<p>About Us</p>
					<p>Services</p>
					<p>Contact us</p>
				</div>

				<div className="newsletter">
					<p>Get the latest job updates</p>
					<form>
						<div className="newsletterInput">
							<input type="text" />
							<button>Subscribe</button>
						</div>
						<div className="disclaimer">
							<input type="checkbox" />
							<p>By checking the box, you agree that you have read the terms annd condition</p>
						</div>
					</form>
				</div>

			</div>
			<svg
				height="485"
				viewBox="0 0 1438 485"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M0 175.264L27.0376 150.151C53.0738 123.841 106.148 72.4178 160.223 37.737C213.297 4.25205 266.37 -13.6863 319.444 12.6233C372.518 37.737 425.592 107.099 479.667 141.779C532.741 175.264 585.815 175.264 638.889 184.832C691.962 193.203 746.038 209.945 799.111 209.945C852.185 209.945 905.259 193.203 958.333 193.203C1012.41 193.203 1065.48 209.945 1118.56 184.832C1171.63 158.522 1224.7 90.3562 1277.78 98.7274C1331.85 107.099 1384.93 193.203 1410.96 236.255L1438 279.307V485H1410.96C1384.93 485 1331.85 485 1277.78 485C1224.7 485 1171.63 485 1118.56 485C1065.48 485 1012.41 485 958.333 485C905.259 485 852.185 485 799.111 485C746.038 485 691.962 485 638.889 485C585.815 485 532.741 485 479.667 485C425.592 485 372.518 485 319.444 485C266.37 485 213.297 485 160.223 485C106.148 485 53.0738 485 27.0376 485H0V175.264Z"
					fill="#009AEE"
				/>

			</svg>
		</div>
	);
};

export default Footer;

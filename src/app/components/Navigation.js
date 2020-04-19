import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navigation = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to='/dashboard'>
						<h1>My Application</h1>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default connect((state) => state)(Navigation);

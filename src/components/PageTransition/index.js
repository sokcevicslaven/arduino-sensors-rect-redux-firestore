// Animated pages transitions

import React from 'react';
import { CSSTransition } from 'react-transition-group';

// Styles
import useStyles from './style';

const PageTransition = ({ match, children }) => {
	const classes = useStyles();

	return (
		<CSSTransition
			in={match != null}
			timeout={300}
			unmountOnExit
			classNames={{
				enter: classes.pageEnter,
				enterActive: classes.pageEnterActive,
				exit: classes.pageExit,
				exitActive: classes.pageExitActive
			}}
		>
			<div className={classes.page}>{children}</div>
		</CSSTransition>
	);
};

export default PageTransition;

// Dashboard - custom style

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => {
	// Colors
	const textSecondary = theme.palette.text.secondary;
	const divider = 'rgba(0, 0, 0, 0.12)';

	// Card face
	const face = {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		backfaceVisibility: 'hidden',
		backgroundColor: '#FFF',
		borderRadius: 4
	};

	// Common title
	const title = {
		fontSize: '1.4rem',
		textTransform: 'capitalize'
	};

	// Return css classes
	return {
		container: {
			width: 295,
			height: 420,
			perspective: 1500,

			'&:hover $card': {
				zIndex: 5,
				visibility: 'visible',
				transform: 'rotateY(180deg)'
			}
		},

		card: {
			height: '100%',
			position: 'relative',
			textAlign: 'center',
			borderRadius: 4,

			transition: 'transform .5s',
			transformStyle: 'preserve-3d',

			boxShadow: [
				['0px 5px 5px -3px rgba(0,0,0,0.2)'],
				['0px 8px 10px 1px rgba(0,0,0,0.14)'],
				['0px 3px 14px 2px rgba(0,0,0,0.12)']
			]
		},

		front: {
			...face
		},

		cover: {
			height: 105,
			overflow: 'hidden',
			borderRadius: '4px 4px 0 0',
			'& img': {
				width: '100%',
				height: 'auto'
			}
		},

		user: {
			width: 120,
			height: 120,
			margin: '-55px auto 0 auto',
			'& img': {
				width: '100%',
				borderRadius: '50%',
				border: '4px solid #fff'
			}
		},

		title: {
			...title,
			margin: 0
		},

		subtitle: {
			color: textSecondary,
			marginTop: 0,
			marginBottom: 16
		},

		content: {
			height: '100%',
			padding: '10px 20px'
		},

		divider: {
			border: 'none',
			margin: '0 20px',
			height: 1,
			flexShrink: 0,
			background: divider
		},

		footer: {
			color: textSecondary,
			padding: '10px 0',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		},

		back: {
			...face,
			position: 'absolute',
			top: 0,
			left: 0,
			transform: 'rotateY( 180deg )',
			zIndex: 3
		},

		backHeader: {
			padding: '15px 20px',
			height: '90px',

			'& p': {
				margin: '5px 0',
				color: textSecondary,
				fontSize: 13
			},

			'& p span': {
				display: 'block',
				textAlign: 'right'
			}
		},

		backTitle: {
			...title,
			margin: '10px 0'
		},

		stats: {
			margin: '10px 20px 20px 20px',
			display: 'flex',
			justifyContent: 'center',

			'& div': {
				width: '100%',

				'&:nth-child(2)': {
					borderLeft: `1px solid ${divider}`,
					borderRight: `1px solid ${divider}`
				},

				'& > p': {
					fontSize: 18,
					margin: '5px 0 0 0'
				},
				'& > p + p': {
					margin: '0 0 5px 0',
					fontSize: 14,
					color: textSecondary
				}
			}
		}
	};
});

// App - custom style

import { makeStyles } from '@material-ui/core/styles';
// import { blue, red } from '@material-ui/core/colors';

export default makeStyles(theme => ({
  page: {
    position: 'absolute',
    left: 15,
    right: 15
  },
  pageEnter: {
    opacity: 0,
    transform: 'scale(1.1)'
  },
  pageEnterActive: {
    opacity: 1,
    transform: 'scale(1)',
    transition: 'opacity 300ms, transform 300ms'
  },
  pageExit: {
    opacity: 1,
    transform: 'scale(1)'
  },
  pageExitActive: {
    opacity: 0,
    transform: 'scale(0.9)',
    transition: 'opacity 300ms, transform 300ms'
  }
}));

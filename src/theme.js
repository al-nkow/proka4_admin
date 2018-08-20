import { createMuiTheme } from '@material-ui/core/styles';
import {
  primary,
  error,
  // white
} from './utils/colors';

export default createMuiTheme({
  palette: {
    // type: 'dark',
    primary,
    error,
    // white,
  },
  overrides: {
  //   a: {
  //     textDecoration: 'none !important',
  //   },
  //   MuiPaper: {
  //     elevation2: {
  //       boxShadow: '0 2px 6px rgba(161, 161, 161, 0.5)',
  //     },
  //   },
  //   MuiTabIndicator: {
  //     root: {
  //       height: '4px',
  //     },
  //   },
  //   MuiFormLabel: {
  //     root: {
  //       color: '#a1a1a1',
  //     },
  //   },
  //   MuiInput: {
  //     underline: {
  //       '&:before': {
  //         backgroundColor: '#a1a1a1',
  //       },
  //       '&$disabled:before': {
  //         backgroundSize: '8px 1px !important',
  //         backgroundImage:
  //           'linear-gradient(to right, rgba(0, 0, 0, 0.42) 50%, transparent 0%)',
  //       },
  //     },
  //   },
    MuiTooltip: {
      tooltip: {
        fontSize: '12px!important',
        fontWeight: '300',
        backgroundColor: 'rgba(33, 33, 33, 0.85)',
      },
    },
  //   MuiTableRow: {
  //     root: {
  //       height: '80px',
  //       '&.even': {
  //         background: row,
  //       },
  //     },
  //     head: {
  //       height: '40px',
  //       '&.controls': {
  //         height: '80px',
  //       },
  //     },
  //   },
  //   MuiTableCell: {
  //     body: {
  //       fontSize: '14px',
  //       color: text.dark,
  //       borderBottom: 'none',
  //     },
  //     head: {
  //       borderBottom: 'none',
  //       fontWeight: 'normal',
  //       fontSize: '14px',
  //       color: text.dark,
  //       padding: '4px 10px 4px 24px',
  //       '&.active': {
  //         fontWeight: 'bold',
  //         background: text.dark,
  //       },
  //     },
  //   },
  //   MuiTableSortLabel: {
  //     root: {
  //       display: 'flex',
  //       width: '100%',
  //       justifyContent: 'space-between',
  //     },
  //     active: {
  //       color: '#ffffff',
  //       '&:hover': {
  //         color: '#ffffff',
  //       },
  //       '&:focus': {
  //         color: '#ffffff',
  //       },
  //     },
  //     icon: {
  //       width: '22px',
  //       height: '22px',
  //     },
  //   },
    MuiButton: {
      root: {
        '&$disabled': {
          opacity: 0.5,
          backgroundColor: `${primary.main} !important`,
          color: '#ffffff !important'
        },
      },
  //     raised: {
  //       '&.danger': {
  //         backgroundColor: `${error.main}`,
  //         color: white,
  //         '&:hover': {
  //           backgroundColor: `#de3f34`,
  //         },
  //       },
  //       '&.success': {
  //         backgroundColor: `${green2}`,
  //         color: white,
  //         '&:hover': {
  //           backgroundColor: `#248650`,
  //         },
  //       },
  //     },
  //     flatSecondary: {
  //       color: error.main,
  //       '&:hover': {
  //         backgroundColor: 'rgba(255, 71, 58, 0.12)',
  //       },
  //     },
    },
  },
});

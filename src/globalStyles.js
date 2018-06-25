import { injectGlobal } from 'styled-components';

export default injectGlobal`
  #root {
    height: 100%;
  }
  html {
    height: 100%;
  }
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: normal;
    color: #333333;
    //background-color: #fff !important;
  }
  a {
    color: #333333;
    text-decoration: none;
  }
`;
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
html,
body,
div,
span {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
}

*,
*:before,
*:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-family: 'Manrope', sans-serif;
}

html, body {
    max-width: 100vw;
}

p,
li,
a,
blockquote,
span, 
div, 
textarea, 
input 
{
margin: 0px;
}


`;
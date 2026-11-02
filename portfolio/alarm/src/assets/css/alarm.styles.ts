import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
container: {
    maxWidth:"440px",
    margin:"60px auto"
},
formBox:{
display:"flex",
flexDirection:"column",
},
input:{
    padding:"10px 12px",
    borderRadius:"8px",
},
submitBtn:{
padding:"12px",
backgroundColor:"#0066cc",
color:"#fff",
cursor:"pointer"    
}
});
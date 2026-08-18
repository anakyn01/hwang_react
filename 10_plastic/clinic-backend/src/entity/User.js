const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name:"User",
    tableName:"USERS",
    columns:{
        id:{
primary:true, type:"number",
generated:"increment",             
        },
        username:{
type:"varchar2", length:50, unique:true,            
        },
        password:{
type:"varchar2", length:100,            
        },
        phone:{
type:"varchar2", length:100, nullable:false,             
        }
    },
});
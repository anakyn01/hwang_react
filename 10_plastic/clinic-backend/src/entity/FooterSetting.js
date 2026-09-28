const {EntitySchema} = require("typeorm");

module.exports=new EntitySchema({
    name:"FooterSettings",
    tableName:"FOOTER_SETTINGS",
columns:{
id:{primary:true, type:"int"},
name:{type:"varchar",length:100, nullable:false},  
address:{type:"varchar", length:255, nullable:false},
clinicName:{type:"varchar", length:100, nullable:false},
phone:{type:"varchar", length:50, nullable:false},
email:{type:"varchar", length:100, nullable:false},
locationUrl:{type:"varchar", length:255, nullable:false},
schedules:{type:"simple-json", nullable:false},
familySites:{type:"simple-json", nullable:false}      
    }
})
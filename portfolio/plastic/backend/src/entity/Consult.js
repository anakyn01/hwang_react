const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Consult",
    tableName: "CONSULT_TB",
    columns: {
        ID: { 
            primary: true, 
            type: "int", 
            generated: "increment" 
        },
        NAME: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 100 
        },
        PHONE: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 50 
        },
        DEPARTMENT: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 100 
        },
        PASSWORD: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 100 
        },
        USER_ID: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 100 
        },
        TITLE: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 300 
        },
        CONTENT: { 
            type: "text" // 💡 clob -> text (게시글 본문 등 긴 글 저장용)
        },
        STATUS: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 50, 
            default: "대기중" 
        },
        CREATED_AT: { 
            type: "datetime", // 💡 date -> datetime
            createDate: true 
        }
    }
});
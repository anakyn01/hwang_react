const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Popup",
    tableName: "POPUP_TB",
    columns: {
        POPUP_IDX: { 
            primary: true, 
            type: "int", // 💡 number -> int
            generated: "increment" 
        },
        TITLE: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 200 
        },
        LINK: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 500, 
            nullable: true 
        },
        FILE_NAME: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 300 
        },
        START_DATE: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 50 
        },
        END_DATE: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 50 
        },
        USE_TODAY_CLOSE: { 
            type: "varchar", // 💡 char 타입은 MySQL에서도 동일하게 사용 가능합니다
            length: 1, 
            default: "N" 
        }
    }
});
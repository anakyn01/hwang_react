const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Selfie",
    tableName: "SELFIE_TB",
    columns: {
        SELFIE_IDX: { 
            primary: true, 
            type: "int", // 💡 number -> int
            generated: "increment" 
        },
        FILE_NAME: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 300 
        },
        LIKES: { 
            type: "int", // 💡 number -> int
            default: 0 
        },
        VIEWS: { 
            type: "int", // 💡 number -> int
            default: 0 
        },
        IS_ACTIVE: { 
            type: "varchar", // 💡 char 타입은 MySQL에서도 그대로 사용
            length: 1, 
            default: "Y" 
        }
    }
});
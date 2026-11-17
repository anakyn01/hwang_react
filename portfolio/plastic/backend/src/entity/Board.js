const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Board",
    tableName: "BOARD_TB",
    columns: {
        BOARD_IDX: { 
            primary: true, 
            type: "int", // 💡 number -> int
            generated: "increment" 
        },
        NAME: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 100 
        },
        BOARD_TYPE: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 50 
        },
        READ_AUTH: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 50 
        },
        WRITE_AUTH: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 50 
        },
        REG_DATE: { 
            type: "datetime", // 💡 date -> datetime (시간 단위까지 저장)
            createDate: true 
        }
    }
});
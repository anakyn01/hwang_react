const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Vlog",
    tableName: "VLOG_TB",
    columns: {
        VLOG_IDX: { 
            primary: true, 
            type: "int", // 💡 number -> int
            generated: "increment" 
        },
        TITLE: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 200 
        },
        VIDEO_URL: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 500 
        },
        FILE_NAME: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 255 
        },
        SORT_ORDER: { 
            type: "int", // 💡 number -> int
            default: 0 
        }
    }
});
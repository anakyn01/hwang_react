const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Safety",
    tableName: "SAFETY_TB",
    columns: {
        SAFETY_IDX: { 
            primary: true, 
            type: "int", // 💡 number -> int
            generated: "increment" 
        },
        TITLE: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 200 
        },
        DESCRIPTION: { 
            type: "text", // 💡 clob -> text (장문의 안전 관련 설명/안내 문구 저장용)
            nullable: true 
        },
        FILE_NAME: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 300 
        },
        SORT_ORDER: { 
            type: "int", // 💡 number -> int
            default: 0 
        }
    }
});
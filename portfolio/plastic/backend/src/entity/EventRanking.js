const { EntitySchema } = require("typeorm");

const ModelSchema = new EntitySchema({ // 💡 JS 문법에 맞게 const 선언 추가
    name: "EventRanking",
    tableName: "EVENT_RANKING_TB",
    columns: {
        EVENT_IDX: { 
            primary: true, 
            type: "int", // 💡 number -> int
            generated: "increment" 
        },
        TITLE: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 200 
        },
        PRICE: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 100 
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

module.exports = ModelSchema;
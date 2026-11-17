const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Category",
    tableName: "CATEGORY_TB",
    columns: {
        CATEGORY_IDX: { 
            primary: true, 
            type: "int", 
            generated: "increment" 
        },
        TITLE: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 150 
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
        SORT_ORDER: { 
            type: "int", 
            default: 0 
        }
    }
});
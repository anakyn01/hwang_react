const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Category",
    tableName: "CATEGORY_TB",
    columns: {
        CATEGORY_IDX: { primary: true, type: "number", generated: "increment" },
        TITLE: { type: "varchar2", length: 150 },
        LINK: { type: "varchar2", length: 500, nullable: true },
        FILE_NAME: { type: "varchar2", length: 300 },
        SORT_ORDER: { type: "number", default: 0 }
    }
});
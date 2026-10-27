const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Safety",
    tableName: "SAFETY_TB",
    columns: {
        SAFETY_IDX: { primary: true, type: "number", generated: "increment" },
        TITLE: { type: "varchar2", length: 200 },
        DESCRIPTION: { type: "clob", nullable: true },
        FILE_NAME: { type: "varchar2", length: 300 },
        SORT_ORDER: { type: "number", default: 0 }
    }
});
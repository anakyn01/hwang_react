const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Consult",
    tableName: "CONSULT_TB",
    columns: {
        ID: { primary: true, type: "number", generated: "increment" },
        NAME: { type: "varchar2", length: 100 },
        PHONE: { type: "varchar2", length: 50 },
        DEPARTMENT: { type: "varchar2", length: 100 },
        PASSWORD: { type: "varchar2", length: 100 },
        USER_ID: { type: "varchar2", length: 100 },
        TITLE: { type: "varchar2", length: 300 },
        CONTENT: { type: "clob" },
        STATUS: { type: "varchar2", length: 50, default: "대기중" },
        CREATED_AT: { type: "date", createDate: true }
    }
});
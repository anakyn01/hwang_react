const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Member",
    tableName: "MEMBER_TB",
    columns: {
        USER_IDX: { primary: true, type: "number", generated: "increment" },
        USER_NAME: { type: "varchar2", length: 100 },
        USER_ID: { type: "varchar2", length: 100, unique: true },
        USER_PW: { type: "varchar2", length: 255 },
        EMAIL: { type: "varchar2", length: 200 },
        IS_MAIL_AGREED: { type: "char", length: 1, default: "N" },
        PHONE: { type: "varchar2", length: 50 },
        IS_SNS_AGREED: { type: "char", length: 1, default: "N" },
        GENDER: { type: "varchar2", length: 20, nullable: true },
        RESIDENT_NUM: { type: "varchar2", length: 100, nullable: true },
        ZIPCODE: { type: "varchar2", length: 20, nullable: true },
        ADDRESS1: { type: "varchar2", length: 300, nullable: true },
        ADDRESS2: { type: "varchar2", length: 300, nullable: true },
        IS_ADMIN: { type: "number", default: 0 },
        STATUS: { type: "varchar2", length: 20, default: "정상" },
        CREATED_AT: { type: "date", createDate: true }
    }
});
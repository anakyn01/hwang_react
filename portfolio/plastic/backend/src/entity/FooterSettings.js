const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "FooterSettings",
    tableName: "FOOTER_SETTINGS_TB",
    columns: {
        id: { primary: true, type: "number" },
        name: { type: "varchar2", length: 200, nullable: true },
        address: { type: "varchar2", length: 500, nullable: true },
        clinicName: { type: "varchar2", length: 200, nullable: true },
        phone: { type: "varchar2", length: 50, nullable: true },
        email: { type: "varchar2", length: 200, nullable: true },
        locationUrl: { type: "varchar2", length: 1000, nullable: true },
        schedules: { type: "json", nullable: true }, // 혹은 clob 타입 호환 처리
        familySites: { type: "json", nullable: true }
    }
});
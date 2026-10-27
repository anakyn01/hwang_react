const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "NavSetting",
    tableName: "NAV_SETTING_TB",
    columns: {
        ID: { primary: true, type: "number" },
        LOGO_TYPE: { type: "varchar2", length: 50, default: "TEXT" },
        LOGO_TEXT: { type: "varchar2", length: 200, nullable: true },
        LOGO_FILE: { type: "varchar2", length: 300, nullable: true },
        MENUS: { type: "clob", nullable: true }
    }
});
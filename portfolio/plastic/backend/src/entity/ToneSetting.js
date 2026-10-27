const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "ToneSetting",
    tableName: "TONE_SETTING_TB",
    columns: {
        ID: { primary: true, type: "number" },
        PRIMARY_TONE: { type: "varchar2", length: 50, default: "BLUE" },
        IS_DARK_MODE: { type: "char", length: 1, default: "N" }
    }
});
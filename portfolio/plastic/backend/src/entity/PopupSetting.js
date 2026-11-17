const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "PopupSetting",
    tableName: "POPUP_SETTING_TB",
    columns: {
        ID: { 
            primary: true, 
            type: "int" // 💡 number -> int
        },
        MAX_POPUPS: { 
            type: "int", // 💡 number -> int
            default: 1 
        }
    }
});
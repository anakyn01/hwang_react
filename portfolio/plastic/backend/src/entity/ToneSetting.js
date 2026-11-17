const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "ToneSetting",
    tableName: "TONE_SETTING_TB",
    columns: {
        ID: { 
            primary: true, 
            type: "int" // 💡 number -> int
        },
        PRIMARY_TONE: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 50, 
            default: "BLUE" 
        },
        IS_DARK_MODE: { 
            type: "varchar", // 💡 char 타입은 MySQL에서도 그대로 사용 가능
            length: 1, 
            default: "N" 
        }
    }
});
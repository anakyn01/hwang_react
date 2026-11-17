const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "NavSetting",
    tableName: "NAV_SETTING_TB",
    columns: {
        ID: { 
            primary: true, 
            type: "int" // 💡 number -> int
        },
        LOGO_TYPE: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 50, 
            default: "TEXT" 
        },
        LOGO_TEXT: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 200, 
            nullable: true 
        },
        LOGO_FILE: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 300, 
            nullable: true 
        },
        MENUS: { 
            type: "json", // 💡 clob -> json (메뉴 트리 구조 데이터를 저장하고 다루기에 최적입니다)
            nullable: true 
        }
    }
});
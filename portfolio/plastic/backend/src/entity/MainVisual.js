const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "MainVisual",
    tableName: "MAIN_VISUAL_TB",
    columns: {
        ID: { 
            primary: true, 
            type: "int" // 💡 number -> int
        },
        SLIDES: { 
            type: "json", // 💡 clob -> json (슬라이드 배열/객체 데이터를 다루기에 가장 적합합니다. 단순 문자열이라면 "text"를 사용하세요.)
            nullable: true 
        }
    }
});
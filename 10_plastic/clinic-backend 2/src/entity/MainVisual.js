const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "MainVisual",
    tableName: "MAIN_VISUAL",
    columns: {
        ID: { primary: true, type: "int" },
        // 여러 장의 슬라이드 정보(이미지 파일명, 제목, 링크 등)를 JSON 배열로 저장할 넓은 공간
        SLIDES: { type: "clob", nullable: true } 
    }
});
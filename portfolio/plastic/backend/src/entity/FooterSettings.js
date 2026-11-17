const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "FooterSettings",
    tableName: "FOOTER_SETTINGS_TB",
    columns: {
        id: { 
            primary: true, 
            type: "int" // 💡 number -> int
            // (보통 설정 테이블은 id가 1인 단일 레코드만 쓰므로 generated: "increment"가 필수는 아닙니다)
        },
        name: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 200, 
            nullable: true 
        },
        address: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 500, 
            nullable: true 
        },
        clinicName: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 200, 
            nullable: true 
        },
        phone: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 50, 
            nullable: true 
        },
        email: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 200, 
            nullable: true 
        },
        locationUrl: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 1000, 
            nullable: true 
        },
        schedules: { 
            type: "json", // 💡 MySQL은 네이티브 JSON 타입을 완벽 지원하므로 clob 대신 그대로 사용 강력 추천!
            nullable: true 
        },
        familySites: { 
            type: "json", // 💡 여기도 동일하게 JSON 유지
            nullable: true 
        }
    }
});
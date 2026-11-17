const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Member",
    tableName: "MEMBER_TB",
    columns: {
        USER_IDX: { 
            primary: true, 
            type: "int", // 💡 number -> int
            generated: "increment" 
        },
        USER_NAME: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 100 
        },
        USER_ID: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 100, 
            unique: true 
        },
        USER_PW: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 255 // (비밀번호 해시에 충분한 길이)
        },
        EMAIL: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 200 
        },
        IS_MAIL_AGREED: { 
            type: "varchar", // 💡 char는 MySQL에서도 동일하게 지원
            length: 1, 
            default: "N" 
        },
        PHONE: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 50 
        },
        IS_SNS_AGREED: { 
            type: "varchar", 
            length: 1, 
            default: "N" 
        },
        GENDER: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 20, 
            nullable: true 
        },
        RESIDENT_NUM: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 100, 
            nullable: true 
        },
        ZIPCODE: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 20, 
            nullable: true 
        },
        ADDRESS1: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 300, 
            nullable: true 
        },
        ADDRESS2: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 300, 
            nullable: true 
        },
        IS_ADMIN: { 
            type: "int", // 💡 number -> int (0: 일반유저, 1: 관리자 등)
            default: 0 
        },
        STATUS: { 
            type: "varchar", // 💡 varchar2 -> varchar
            length: 20, 
            default: "정상" 
        },
        PROVIDER:{
            type: "varchar", // 💡 varchar2 -> varchar (LOCAL, KAKAO, GOOGLE 등)
            length: 20, 
            default: "LOCAL"
        },
        PROFILE_IMG:{
            type: "varchar", // 💡 varchar2 -> varchar
            length: 500, 
            nullable: true
        },
        REFRESH_TOKEN:{
            type: "varchar", // 💡 varchar2 -> varchar
            length: 500, 
            nullable: true
        },
        CREATED_AT: { 
            type: "datetime", // 💡 date -> datetime
            createDate: true 
        },
        UPDATED_AT: { 
            type: "datetime", // 💡 date -> datetime
            updateDate: true 
        }
    }
});
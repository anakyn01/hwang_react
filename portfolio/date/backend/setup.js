const { Sequelize, DataTypes } = require('sequelize');

// 1. DB 연결 설정
const sequelize = new Sequelize('dating_db', 'root', '1234', {
  host: 'localhost', 
  dialect: 'mysql', 
  logging: true,    
});

// ==========================================
// 2. 모델 (테이블) 정의
// ==========================================
const User = sequelize.define('User', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  nickname: { type: DataTypes.STRING(50), allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  gender: { type: DataTypes.ENUM('M', 'F', 'O'), allowNull: false },
  bio: { type: DataTypes.TEXT },
  address: { type: DataTypes.STRING(255) },
  latitude: { type: DataTypes.DECIMAL(10, 8) },
  longitude: { type: DataTypes.DECIMAL(11, 8) },
  profile_image_main: { type: DataTypes.STRING(255) },
  profile_image_sub1: { type: DataTypes.STRING(255) },
  profile_image_sub2: { type: DataTypes.STRING(255) },
  points: { type: DataTypes.INTEGER, defaultValue: 0 },
  no_show_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  suspended_until: { type: DataTypes.DATE, allowNull: true },
  status: { 
    type: DataTypes.ENUM('PENDING', 'ACTIVE', 'INACTIVE', 'BANNED'), 
    defaultValue: 'PENDING'
  },
  membership_tier: {
    type: DataTypes.ENUM('STANDARD', 'PREMIUM'),
    defaultValue: 'STANDARD'
  },
}, { tableName: 'users', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

const Match = sequelize.define('Match', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  sender_id: { type: DataTypes.BIGINT, allowNull: false },
  receiver_id: { type: DataTypes.BIGINT, allowNull: false },
  status: {
    type: DataTypes.ENUM('REQUESTED', 'ACCEPTED', 'COMPLETED', 'NO_SHOW'),
    defaultValue: 'REQUESTED'
  }
}, { tableName: 'matches', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

const Post = sequelize.define('Post', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  category: { type: DataTypes.ENUM('연애 고민', '데이트 코스', '자유'), allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  image_url: { type: DataTypes.STRING(255), allowNull: true },   
}, { tableName: 'posts', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

const Comment = sequelize.define('Comment', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.TEXT, allowNull: false },   
}, { tableName: 'comments', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

const Diary = sequelize.define('Diary', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  mood: { type: DataTypes.ENUM('SAD', 'NEUTRAL', 'SMILE', 'HAPPY', 'LOVE'), allowNull: false },
  title: { type: DataTypes.STRING(255), allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  is_public: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'diaries', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

const ChatRoom = sequelize.define('ChatRoom', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true }
}, { tableName: 'chat_rooms', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

const ChatMessage = sequelize.define('ChatMessage', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  message: { type: DataTypes.TEXT, allowNull: false },
  is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'chat_messages', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

const PremiumSubscription = sequelize.define('PremiumSubscription', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  paid_amount: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('PENDING', 'ACTIVE', 'EXPIRED', 'REJECTED'), defaultValue: 'PENDING' },
  starts_at: { type: DataTypes.DATE, allowNull: true },
  expires_at: { type: DataTypes.DATE, allowNull: true }    
}, { tableName: 'premium_subscriptions', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });

const PremiumMatch = sequelize.define('PremiumMatch', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  sender_id: { type: DataTypes.BIGINT, allowNull: false },
  receiver_id: { type: DataTypes.BIGINT, allowNull: false },
  status: { type: DataTypes.ENUM('REQUESTED', 'ACCEPTED', 'COMPLETED', 'NO_SHOW'), defaultValue: 'REQUESTED' },
  is_super_like: { type: DataTypes.BOOLEAN, defaultValue: true },
  manager_comment: { type: DataTypes.STRING(255), allowNull: true },
}, { tableName: 'premium_matches', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' });


// ==========================================
// 🔗 3. 테이블 간의 연결 고리(Relation) 설정
// ==========================================
// (중복 없이 깔끔하게 한 번씩만 선언되었습니다)

User.hasMany(Match, { foreignKey: 'sender_id', as: 'sentMatches' });
User.hasMany(Match, { foreignKey: 'receiver_id', as: 'receivedMatches' });
Match.belongsTo(User, { foreignKey: 'sender_id', as: 'Sender' });
Match.belongsTo(User, { foreignKey: 'receiver_id', as: 'Receiver' });

User.hasMany(Post, { foreignKey: 'user_id', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'user_id', as: 'author' });

Post.hasMany(Comment, { foreignKey: 'post_id', as: 'post_comments' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

User.hasMany(Comment, { foreignKey: 'user_id', as: 'user_comments' });
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'comment_author' }); 

User.hasMany(Diary, { foreignKey: 'user_id', as: 'diaries' });
Diary.belongsTo(User, { foreignKey: 'user_id' }); 

Match.hasOne(ChatRoom, { foreignKey: 'match_id' });
ChatRoom.belongsTo(Match, { foreignKey: 'match_id' }); 

ChatRoom.hasMany(ChatMessage, { foreignKey: 'room_id', as: 'messages' });
ChatMessage.belongsTo(ChatRoom, { foreignKey: 'room_id' }); 

User.hasMany(ChatMessage, { foreignKey: 'sender_id', as: 'sent_messages' });
ChatMessage.belongsTo(User, { foreignKey: 'sender_id', as: 'message_sender' });

User.hasMany(PremiumSubscription, { foreignKey: 'user_id', as: 'subscriptions' });
PremiumSubscription.belongsTo(User, { foreignKey: 'user_id', as: 'premium_user' });

User.hasMany(PremiumMatch, { foreignKey: 'sender_id', as: 'sentPremiumMatches' });
User.hasMany(PremiumMatch, { foreignKey: 'receiver_id', as: 'receivedPremiumMatches' });
PremiumMatch.belongsTo(User, { foreignKey: 'sender_id', as: 'premiumSender' });
PremiumMatch.belongsTo(User, { foreignKey: 'receiver_id', as: 'premiumReceiver' });


// ==========================================
// 4. DB 테이블 생성 실행
// ==========================================
async function initDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ 데이터베이스 연결 성공');
    await sequelize.sync({ alter: true });
    console.log('✅ 모든 테이블 생성 및 관계 설정 완료!');
  } catch (error) {
    console.error('❌ 에러발생:', error);
  } finally {
    process.exit();
  }
}

initDB();
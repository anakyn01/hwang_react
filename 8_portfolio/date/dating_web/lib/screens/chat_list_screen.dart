import 'package:flutter/material.dart';

class ChatListScreen extends StatefulWidget{
  const ChatListScreen({super.key});

  @override
  State<ChatListScreen> createState() => _ChatListScreenState();
}

class _ChatListScreenState extends State<ChatListScreen>{

  // 🎨 테마 색상 (이전 화면들과 통일)
  final Color bgColor = const Color(0xFF12121A);
  final Color cardColor = const Color(0xFF22222E);
  final Color pinkAccent = const Color(0xFFFF4B93);
  final Color subTextColor = const Color(0xFFA0A0B0);

  //임시 채팅방 데이터(시안과 동일하게 구성)
  final List<Map<String, dynamic>> chatRooms = [
{
      'name': '지은',
      'message': '안녕하세요! 프로필 보고 연락드려요 😊',
      'time': '방금',
      'unread': 2,
      'color': const Color(0xFF00E5FF), // Cyan
    },
    {
      'name': '수연',
      'message': '오늘 날씨 너무 좋죠? ☀️',
      'time': '1시간 전',
      'unread': 1,
      'color': const Color(0xFFFF6699), // Pink
    },
    {
      'name': '민준',
      'message': '다음에 같이 카페 가요!',
      'time': '어제',
      'unread': 0,
      'color': const Color(0xFF00E676), // Mint
    },
    {
      'name': '하늘',
      'message': 'ㅎㅎ 저도 그 영화 좋아해요!',
      'time': '2일 전',
      'unread': 0,
      'color': const Color(0xFFFFB74D), // Orange
    },
  ];

  @override
  Widget build(BuildContext context){
    return Scaffold(
backgroundColor: bgColor,
appBar: AppBar(
  backgroundColor: bgColor,
  elevation: 0,
  title:Row(
    children: [
const Text(
'채팅',
style:TextStyle(
  fontSize:24, fontWeight:FontWeight.bold,
  color:Colors.white),  
),
const SizedBox(width:8), 
// 전체 안 읽은 메시지 뱃지 
Container(
padding:const EdgeInsets.all(6),
decoration: BoxDecoration(
color:pinkAccent, shape:BoxShape.circle,  
),
child:const Text(
'3', style:TextStyle(
fontSize:12, fontWeight:FontWeight.bold,
color:Colors.white),  
),
),   
],
),
), 
body:Column(
  children: [
_buildSearchBar(),
_buildNewMatchBanner(),
Expanded(
  child: ListView.separated(
    itemCount:chatRooms.length,
    separatorBuilder:(context, index) => Divider(
      color: cardColor,
      height:1, thickness: 1,
      ),
    itemBuilder:(context, index){
      final chat = chatRooms[index];
      return _buildChatListItem(chat);
    },
    ),
    ),    
  ],
  ),     
  );
  }

  //대화 상대 검색창
  Widget _buildSearchBar(){
    return Padding(
padding: const EdgeInsets.symmetric(horizontal:20, vertical:10),
child:Container(
  height:48,
  decoration: BoxDecoration(
    color:cardColor,
    borderRadius:BorderRadius.circular(24),
  ),
  child:TextField(
style:const TextStyle(color:Colors.white), 
decoration: InputDecoration(
  hintText:'대화 상대 검색',
hintStyle:TextStyle(color: subTextColor, fontSize:15),
prefixIcon:Icon(Icons.search, color:subTextColor),
border:InputBorder.none,
contentPadding:const EdgeInsets.symmetric(vertical:14),
),   
),
),    
    );
  }

  //새로운 매칭 알림배너
  Widget _buildNewMatchBanner(){
    return Padding(
 padding: const EdgeInsets.symmetric(horizontal:20, vertical:10),
 child:Container(
padding:const EdgeInsets.symmetric(horizontal:20, vertical:16),  
decoration: BoxDecoration(
  color:const Color(0xFF1c1425),
  borderRadius:BorderRadius.circular(16),
  border:Border.all(color:pinkAccent.withValues(alpha: 0.3), width:1),
),
child:Row(
  children: [
    const Text('🎉', style:TextStyle(fontSize:28)),
const SizedBox(width:16),
Expanded(
  child: Column(
crossAxisAlignment: CrossAxisAlignment.start,   
    children: [
      const Text(
        '새로운 매칭',
        style:TextStyle(
          color:Colors.white,
          fontSize:15,
          fontWeight:FontWeight.bold),
      ),
      const SizedBox(height:4),
      Text(
        '너에게 님과 매칭되었어요',
style:TextStyle(color:subTextColor, fontSize:13),
),
],
),
),
ElevatedButton(
style:ElevatedButton.styleFrom(
  backgroundColor: pinkAccent,
  shape:RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(20),
  ),
  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 0),
  ),
  onPressed:() {
    print("대화하기 클릭");
  },  
  child: const Text(
    '대화하기',
    style:
    TextStyle(color:Colors.white, fontWeight:FontWeight.bold),
    ),
    ),
  ],
  ),
),
 );
  }

  //개별 채팅방 리스트 아이템
  Widget _buildChatListItem(Map<String, dynamic> chat) {
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical:8),
      leading: CircleAvatar(
        radius: 28,
        backgroundColor: chat['color'],
        child:Text(
chat['name'].substring(0, 1),
style:const TextStyle(
 color:Colors.white,
 fontSize:20,
 fontWeight:FontWeight.bold,
 ),          
),
),
title:Text(
  chat['name'],
  style:const TextStyle(
    color:Colors.white,
    fontSize:16,
    fontWeight:FontWeight.bold,
  ),
),
subtitle: Padding(
  padding: const EdgeInsets.only(top:4.0),
child:Text(
  chat['message'],
  style:TextStyle(color:subTextColor, fontSize:14),
  maxLines: 1,
  overflow:TextOverflow.ellipsis,
),  
  ),
//우측 시간 및 안 읽은 뱃지
trailing: Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.end,
  children: [
    Text(
      chat['time'],
style:TextStyle(color:subTextColor, fontSize:12),
),
const SizedBox(height:6),
if(chat['unread'] > 0)
Container(
  padding:const EdgeInsets.all(6),
  decoration:BoxDecoration(
    color:pinkAccent,
    shape:BoxShape.circle,
  ),
  child:Text(
    chat['unread'].toString(),
    style:const TextStyle(
      color:Colors.white,
      fontSize:10,
      fontWeight:FontWeight.bold
    ),
  ),  
)else
const SizedBox(height: 22),
  ],
  ),
  onTap:(){
print("${chat['name']} 님과의 채팅방 입장");
  },
    );
  }

}
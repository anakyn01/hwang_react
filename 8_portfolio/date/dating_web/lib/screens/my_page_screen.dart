import 'package:flutter/material.dart';

//앱 전체에서 공통으로 쓸 테마 색상들을 미리 변수로 만들어둡니다.
const Color bgColor = Color(0xFF12121A);
const Color cardColor = Color(0xFF22222E);
const Color pinkAccent = Color(0xFFFF4B93);
const Color purpleAccent = Color(0xFFB635F7);
const Color subTextColor = Color(0xFFA0A0B0);
const Color goldColor = Color(0xFFFFD700);

//파생페이지 미리 생성
class ProfileEditScreen extends StatelessWidget{
  const ProfileEditScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    //add
    backgroundColor: bgColor,
    appBar: AppBar(backgroundColor:bgColor, title: const Text('프로필 편집', style:TextStyle(color:Colors.white))), 
    body:const Center(child: Text('닉네임, 나이 등을 수정하는 화면입니다.', style:TextStyle(color:Colors.white)))
    );
}

// 사진관리 화면 (그리드 뷰로 사진들 나열)
class PhotoManagementScreen extends StatelessWidget{
  const PhotoManagementScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    //add
    backgroundColor: bgColor,
appBar: AppBar(
  //add
  backgroundColor: bgColor,
  title:const Text('사진 관리', 
  style:TextStyle(color:Colors.white))), 
    body:GridView.builder(
      padding: const EdgeInsets.all(16),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,//한줄에 3개씩
        crossAxisSpacing: 10, 
        mainAxisSpacing: 10
        ),
        itemCount:6,//6개의 사진칸
itemBuilder: (context, index){
 return Container(
decoration: BoxDecoration(color:cardColor, 
borderRadius:BorderRadius.circular(12)),  
child: index == 0
? const Icon(Icons.add_a_photo, color:pinkAccent, size:40)
: const Icon(Icons.person, color:subTextColor, size:40),
 );
      },
    )
    );
}

//매칭내역 수정
class MatchingSettingsScreen extends StatelessWidget{
  const MatchingSettingsScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    backgroundColor: bgColor,
    appBar: AppBar(backgroundColor: bgColor,
    title:const Text('매칭 내역', 
    style:TextStyle(color:Colors.white))), 
    body:ListView.separated(
      padding:const EdgeInsets.all(16),
      itemCount:3,
      separatorBuilder: (_, __) => const Divider(color:cardColor),
      itemBuilder: (context, index) => ListTile(
leading: const CircleAvatar(backgroundColor: pinkAccent,child:Icon(Icons.favorite, color:Colors.white, size:16)),
title:const Text('님과 매칭 성사', style:TextStyle(color:Colors.white)),
subtitle: Text('2026.09.${14 - index}', style:const TextStyle(color:subTextColor)),
),
    )
    );
}
//일기 내역 화면
class DiaryHistoryScreen extends StatelessWidget{
  const DiaryHistoryScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    backgroundColor: bgColor,
    appBar: AppBar(
      backgroundColor: bgColor,
      title:const Text('나의 일기',style:TextStyle(color:Colors.white))),
      body:ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: 4,
        itemBuilder: (context, index) => Card(
          color:cardColor,
          child:ListTile(
            title:const Text('오늘 한강 산책 좋앗다', 
            style:TextStyle(color:Colors.white)),
            subtitle: Text('2026.09.${10- index}', style:const TextStyle(color:subTextColor)),
),
),
      )
  );
}


class PrivacyScreen extends StatelessWidget{
  const PrivacyScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title:const Text('프라이버시 설정')), 
    body:const Center(child: Text('프라이버시 설정 화면'))
    );
}
class PaymentHistoryScreen extends StatelessWidget{
  const PaymentHistoryScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title:const Text('결제 내역')), 
    body:const Center(child: Text('결제 내역 화면'))
    );
}

//마이 페이지 메인화면
class MyPageScreen extends StatefulWidget{
  const MyPageScreen({super.key});

  @override
  State<MyPageScreen> createState() => _MyPageScreenState();
}

class _MyPageScreenState extends State<MyPageScreen> {
 


/*하단 네비게이션 바(푸터)에서 현재 선택된 탭의 번호를 기억하는 변수입니다.
0: 매칭, 1: 커뮤니티, 2: 일기, 3: 채팅, 4: MY (마이페이지는 4번)
*/
//int _selectedIndex = 4;

//화면에 사용자에게 딱 처음 보여질때 단 한번만 실행되는 초기화 함수
@override
void initState(){
  super.initState();
  //화면ui가 100%로 다 그려지고 나면 이 작업을 실행해라.
  //화면이 다 그려지기도 전에 팝업을 띄우면 에러가 날 수 있어서 사용
  WidgetsBinding.instance.addPostFrameCallback((_){
_askLocationPermission();
  });

}

//기능 1 위치 권한 요청 다이얼로그(팝업창)
void _askLocationPermission(){
showDialog(
  context: context, 
  builder: (context) => 
  AlertDialog(
    backgroundColor:cardColor,
    title:const Text(
     '위치권한 허용', style:TextStyle(color:Colors.white, 
     fontWeight:FontWeight.bold)),
content:Text('위치 정보가 필요합니다. 위치기반 설정을 켜시겠습니까?',
style:TextStyle(color:subTextColor)),     
    actions: [// 팝업창 하단에 들어갈 버튼들
TextButton(
  onPressed: () => Navigator.pop(context),
child:Text('나중에', style:TextStyle(color:subTextColor)), 
),
ElevatedButton(
  style:ElevatedButton.styleFrom(backgroundColor:pinkAccent),
  onPressed:(){
    //TODO:나중에 여기에 실제 위치 권한을 요청하는 코드가 들어갑니다.
    print("위치 권한 승인됨");
    Navigator.pop(context);
  },
  child:const Text('설정하기', style:TextStyle(color:Colors.white)),
),    
],
),
);
}

//사진 /앨범 접근 권한 요청 다이얼 로그
void _askPhotoPermission(VoidCallback onSuccess){
  showDialog(
    context:context,
    builder:(context) => AlertDialog(
      backgroundColor:cardColor,
      title:const Text('사진 접근 권한', style:TextStyle(color:Colors.white,
      fontWeight:FontWeight.bold)),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child:Text('취소', style:TextStyle(color:subTextColor)),
          ),
          ElevatedButton(
            style:ElevatedButton.styleFrom(
              backgroundColor: pinkAccent
            ),
            onPressed: (){
              print("사진 권한 승인됨");
              Navigator.pop(context);
              onSuccess();
            },
            child:const Text('허용',style:TextStyle(color:Colors.white)),
            ),
      ],
      ),
);
}

@override
Widget build(BuildContext context){
  return Container(
    color:Colors.black,
    child: Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 480),
        child: Scaffold(
          backgroundColor: bgColor,          
          appBar:AppBar(// 화면 맨 위 상단바 (지붕)
        backgroundColor: bgColor,
        elevation: 0,
        title:const Text('마이페이지', style:TextStyle(
        fontSize:22, fontWeight:FontWeight.bold, 
        color:Colors.white)),
        actions:[
        IconButton(
        icon:const Icon(Icons.settings, color:Colors.white70),
        onPressed:(){
          print("설정클릭");
        },
        ),
        ],
        ), 
        body:SingleChildScrollView(
        padding:const EdgeInsets.all(20.0),
        child:Column(
         children: [
        _buildProfileCard(), const SizedBox(height:24),
        _buildPremiumBanner(), const SizedBox(height:24),
        _buildMenuList(), const SizedBox(height:40),
         ],
         ),
        ),
        //bottomNavigationBar: _buildBottomNav(),
        ),
      ),
    ),
  );
}

Widget _buildProfileCard(){
  return Container(
decoration: BoxDecoration(
color:cardColor,
borderRadius: BorderRadius.circular(24),
boxShadow: [BoxShadow(
  color:Colors.black.withValues(alpha: 0.2),
  blurRadius: 10,
  offset: const Offset(0, 5)
)],  
),
child: Column(
  children: [
Stack(
  alignment:Alignment.bottomCenter,
  children: [
    Container(
      height: 100,
      decoration: BoxDecoration(
gradient: LinearGradient(colors: [
purpleAccent.withValues(alpha: .4), cardColor  
], begin: Alignment.topCenter,
end:Alignment.bottomCenter
), 
borderRadius: const BorderRadius.only(
  topLeft: Radius.circular(24), 
  topRight: Radius.circular(24)
), 
),
),
Positioned(
bottom:0,  
child:Stack(
  children: [
    Container(
    width:80, height:80,
    decoration:BoxDecoration(
      shape:BoxShape.circle,
border:Border.all(color:pinkAccent, width:2),
color:Colors.pink[100],      
),
child:const Center(child:Text('🌸',style:TextStyle(fontSize:40))),
),
Positioned(
  bottom:0, right:0,
  child:Container(
width:20, height:20,
decoration:BoxDecoration(
color:Colors.greenAccent, shape:BoxShape.circle,
border:Border.all(color:cardColor, width:3)
),    
),
),
],
),
),        
],
),
const SizedBox(height:16),
const Row(
mainAxisAlignment: MainAxisAlignment.center,  
children: [
Text('별빛소나타', style:TextStyle(color:Colors.white,
fontSize:24, fontWeight:FontWeight.bold)),
SizedBox(width:6),
Icon(Icons.verified, color:Colors.lightBlueAccent, size:20),  
],
),
const SizedBox(height:8),  
Text('27세  서울마포구', style:TextStyle(color:subTextColor, fontSize:14)),  
const SizedBox(height:12),
Text('커피 한 잔과 함께..', style:TextStyle(color:subTextColor, fontSize:13)),
const SizedBox(height:24),
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
_buildStatItem('142', '좋아요'),
_buildVerticalDivider(),
_buildStatItem('23', '매칭'), 
_buildVerticalDivider(),
_buildStatItem('8', '일기'), 
_buildStatItem('5,000','보유 포인트', isPoint:true),
],
),
const SizedBox(height:24),
OutlinedButton(
 style:OutlinedButton.styleFrom(
  side:BorderSide(color:subTextColor.withValues(alpha: .3)),
shape:RoundedRectangleBorder(
  borderRadius: BorderRadius.circular(20)),
padding:const EdgeInsets.symmetric(
  horizontal: 40, vertical:12),    
 ),
 onPressed: (){
Navigator.push(context, MaterialPageRoute(
  builder:(context) => const ProfileEditScreen())); 
 },
 child:const Text('프로필 편집', style:TextStyle(color:Colors.white, fontWeight:FontWeight.bold)),
),
const SizedBox(height:20),
],
),    
);
}

Widget _buildPremiumBanner(){
  return Container(
    padding:const EdgeInsets.all(20),
    decoration: BoxDecoration(
      color:cardColor,
borderRadius: BorderRadius.circular(16),
border:Border.all(color:goldColor.withValues(alpha: .3), width:1),      
),
child:Row(
  children: [
const Text('👑', style:TextStyle(fontSize:32)),
const SizedBox(width:16),
Expanded(
  child: Column(
crossAxisAlignment: CrossAxisAlignment.start,    
children: [
Text('SPARK Premium', style:TextStyle(color:goldColor, fontSize:16, fontWeight:FontWeight.bold)),
const SizedBox(height:4),
Text('무제한 좋아요 슈퍼 좋아요 누가 나를 좋아했는지 확인', style:TextStyle(color:subTextColor, fontSize:12)),
],
),
),
ElevatedButton(
  style:ElevatedButton.styleFrom(
backgroundColor: goldColor,
shape:RoundedRectangleBorder(
  borderRadius: BorderRadius.circular(20)),
  ),    
onPressed: (){
print("인앱 결제 프로세스 시작");
},
child:const Text('업그레이드', style:TextStyle(color:Colors.black,fontWeight:FontWeight.bold)),
)         
],
),
);
}

Widget _buildMenuList(){
  return Container(
    decoration: BoxDecoration(
      color:cardColor, borderRadius: BorderRadius.circular(16)),
      child:Column(
        children: [
          _buildMenuTile(
            icon:'📸',title: '사진 관리',
            onTap:(){
              _askPhotoPermission((){
Navigator.push(context, MaterialPageRoute(builder: (context) => 
const PhotoManagementScreen()));            
});
},
),
_buildMenuDivider(),
//add
_buildMenuTile(
  icon:'⚙️', title:'매칭 설정',
  onTap:() => Navigator.push(context, MaterialPageRoute(
    builder: (context) => const MatchingSettingsScreen())),
),
_buildMenuDivider(),

_buildMenuTile(
icon:'🔒',title:'개인정보 보호',
onTap:() => Navigator.push(context, MaterialPageRoute(builder: (context) => const PrivacyScreen())),
),
_buildMenuDivider(),
_buildMenuTile(
icon:'💳', title:'결제 내역',
onTap:() => Navigator.push(context, MaterialPageRoute(builder: (context) => const PaymentHistoryScreen())),  
),
_buildMenuDivider(),
ListTile(
leading:const Text('🚪', style: TextStyle(fontSize:20)),
title:const Text('로그아웃', style: TextStyle(color:Colors.redAccent,
fontSize:16, fontWeight:FontWeight.bold)),
trailing: const Icon(Icons.chevron_right, color:Colors.white24),
onTap:(){
print("로그아웃 처리");
},
),
],
),
);
}

//조립용 도구
Widget _buildStatItem(String number, String label, {bool isPoint = false}){
  return Column(
    children: [
    Text(number, style:TextStyle(color:isPoint ? goldColor: Colors.white,
    fontSize:22, fontWeight:FontWeight.bold)),
    const SizedBox(height: 4),
    Text(label, style:TextStyle(color:subTextColor, fontSize:12)),
  ],
  );
}

Widget _buildVerticalDivider(){
  return Container(
    height: 30, width:1, color:subTextColor.withValues(alpha: 0.2));
}
Widget _buildMenuTile({required String icon, required String title, required VoidCallback onTap}){
  return ListTile(
    leading: Text(icon, style:const TextStyle(fontSize:20)),
    title:Text(title, style:const TextStyle(color:Colors.white, fontSize:16)),
    trailing: const Icon(Icons.chevron_right, color:Colors.white24),
    onTap:onTap,
  );
}

Widget _buildMenuDivider(){
  return Divider(color:bgColor, thickness: 2, height: 2);
}

}
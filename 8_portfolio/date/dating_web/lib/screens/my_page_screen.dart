import 'package:flutter/material.dart';

//파생페이지 미리 생성
class ProfileEditScreen extends StatelessWidget{
  const ProfileEditScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title:const Text('프로필 편집')), 
    body:const Center(child: Text('프로필 편집 화면'))
    );
}

class PhotoManagementScreen extends StatelessWidget{
  const PhotoManagementScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title:const Text('사진 관리')), 
    body:const Center(child: Text('사진 관리 화면'))
    );
}

class MatchingSettingsScreen extends StatelessWidget{
  const MatchingSettingsScreen({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title:const Text('매칭 설정')), 
    body:const Center(child: Text('매칭 설정 화면'))
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
 
//앱 전체에서 공통으로 쓸 테마 색상들을 미리 변수로 만들어둡니다.
final Color bgColor = const Color(0xFF12121A);
final Color cardColor = const Color(0xFF22222E);
final Color pinkAccent = const Color(0xFFFF4B93);
final Color purpleAccent = const Color(0xFFB635F7);
final Color subTextColor = const Color(0xFFA0A0B0);
final Color goldColor = const Color(0xFFFFD700);

/*하단 네비게이션 바(푸터)에서 현재 선택된 탭의 번호를 기억하는 변수입니다.
0: 매칭, 1: 커뮤니티, 2: 일기, 3: 채팅, 4: MY (마이페이지는 4번)
*/
int _selectedindex = 4;

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
void _askPhotoPermission(voidCallback onSuccess){
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
  return Scaffold(
    backgroundColor: bgColor,
    appBar:AppBar(// 화면 맨 위 상단바 (지붕)
backgroundColor: bgColor,
elevation: 0,
title:const Text('마이페이지', style:TextStyle(
fontSize:22, fontWeight:FontWeight.bold, 
color:Colors.white)),
actions:[
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
_builMenuList(), const Sizedbox(height:40),
 ],
 ),
),
bottomNavigationBar: _buildBottomNav(),
);
}

Widget _buildProfileCard(){
  return Container();
}

Widget _buildPremiumBanner(){
  return Container();
}

Widget _buildMenuList(){
  return Container();
}

//조립용 도구
Widget _buildStatItem(String number, String label){
  return Column();
}

Widget _buildVerticalDivider(){
  return Container();
}

Widget _buildBottomNav(){
  return Theme();
}

BottomNavigationBarItem _buildBottomNavItem(String lable, IconData icon, int index){
  return BottomNavigationBarItem(icon: icon);
}

}
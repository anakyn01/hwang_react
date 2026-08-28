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

}

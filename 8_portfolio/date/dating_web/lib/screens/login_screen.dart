import 'package:flutter/material.dart';

import 'signup_profile_screen.dart';

// 사용자가 글씨를 입력하고 체크박스를 누를 때 화면이 변해야 하므로 StatefulWidget을 씁니다.
class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  //🎨 [1] 디자인 테마 색상 정의하기
  final Color bgColor = const Color(0xFF12121A);
  final Color cardColor = const Color(0xFF22222E);
  final Color pinkAccent = const Color(0xFFFF4B93);
  final Color purpleAccent = const Color(0xFFB635F7);
  final Color textColor = Colors.white;
  final Color subTextColor = const Color(0xFF0A0B0);

  //[2] 상태 관리 변수들
  bool _stayLoggedIn = true; //로그인 상태 유지 체크박스 상태(기본값:체크됨)

  //사용자가 입력한 이메일과 비밀번호를 읽어오기 위한
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
//[3] 화면을 그리는 메인 함수
@override
Widget build(BuildContext context){
//키보드가 올라왔을 때 밖을 누르면 키보드가 내려가도록 GestureDetector로 감싸줍니다.
return GestureDetector(
 onTap:() => FocusScope.of(context).unfocus(),
 child:Scaffold(
 backgroundColor: bgColor,
 body:Stack(
//배경 그라데이션 위에 내용물들을 겹쳐서 올리기 위해 Stack을 씁니다.
children: [
  _buildBackgroundGlow(),
  // 화면 우측 상단의 은은한 빛 효과
  SafeArea(
child: SingleChildScrollView(
padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 40.0),
    child:Column(
crossAxisAlignment: CrossAxisAlignment.start,//왼쪽정렬
children:[
_buildLogo(), const SizedBox(height:32),
_buildHeader(), const SizedBox(height:48),
_buildEmailField(), const SizedBox(height:24), 
_buildPasswordField(), const SizedBox(height:16), 
_buildOptionsRow(), const SizedBox(height:32),
_buildLoginButton(), const SizedBox(height:32),
_buildDivider(), const SizedBox(height:32),
_buildKakaoButton(), const SizedBox(height:16),
_buildAppleButton(), const SizedBox(height:48),
_buildSignupLink(),
],
),
),
),
],  
), 
), 
);
}

Widget _buildLogo(){
  return Row(
    children: [
      Icon(Icons.auto_awesome, color:pinkAccent, size:24),
      const SizedBox(width:8),
      Text('SPARK',
      style:TextStyle(
        color:pinkAccent,
        fontSize:20,
        fontWeight:FontWeight.w900,
        letterSpacing: 1.2,
),
),
],
);
}

//인사말 타이틀
Widget _buildHeader(){
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
const Text(
'다시 만나서 \n 반가워요',
style:TextStyle(color:Colors.white, 
fontSize:32, fontWeight:FontWeight.bold,
height:1.3),
const SizedBox(height:12),
Text(
'로그인하고 새로운 인연을 만나보세요',
style:TextStyle(color:subTextColor, fontSize:16),  
),  
],
);
}

Widget _buildEmailField(){
  return Column(
crossAxisAlignment: CrossAxisAlignment.start,    
children: [
const Text('이메일', style:TextStyle(color:Colors.white,
fontSize:14, fontWeight:FontWeight.bold
)),
const SizedBox(height:8),
_buildTextField(
  controller: _emailController,
  hint:'이메일을 입력하세요',
  icon:Icons.mail_outline,
  keyboardType:TextInputType.emailAddress,
), 
],
);
}

//비밀번호 입력칸
Widget _buildPasswordField(){
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
const Text('비밀번호', style:TextStyle(
color:Colors.white, fontSize:14, 
fontWeight:FontWeight.bold
)),
const SizedBox(height:8),
_buildTextField(
  controller: _passwordController,
 hint:'비밀번호를 입력하세요',
 icon:Icons.lock_outline,
 isPassword:true,//글씨가 점으로 가려지도록 설정 
),      
],
);
}

//체크박스와 비밀번호 찾기 줄
Widget _buildOptionsRow(){
  return Row(
mainAxisAlignment: MainAxisAlignment.spaceBetween,
children: [
//체크박스 부분 (클릭 가능하도록 묶어줌)
GestureDetector(
  onTap:(){
    setState( () => _stayLoggedIn = !_stayLoggedIn);
  },
  child:Row(
children: [
  Container(
    width:20, height:20,
    decoration: BoxDecoration(
      color:_stayLoggedIn ? pinkAccent : Colors.transparent,
      // 체크되면 핑크, 아니면 투명
      borderRadius: BorderRadius.circular(6),
border:Border.all(color:_stayLoggedIn ? pinkAccent : subTextColor),
),
child:_stayLoggedIn ? const Icon(Icons.check, size:14, color:Colors.white):null,
),
const SizedBox(width:8),
Text('로그인 상태 유지', style:TextStyle(color:subTextColor, fontSize:14)),
],
),
),
//비밀번호 찾기 버튼
TextButton(
onPressedL(){
  print("비밀번호 찾기 클릭됨");
},
child:Text('비밀번호 찾기', style:TextStyle(color:pinkAccent, 
fontSize:14)),
),
],
);
}

//핑크색 메인 로그인 버튼
Widget _buildLoginButton(){
  return Container(
width:double.infinity,//가로 꽉 차게
height:56,
decoration: BoxDecoration(
  gradient: LinearGradient(colors: [pinkAccent, purpleAccent]),
  borderRadius: BorderRadius.circular(16),
  boxShadow: [
    BoxShadow(color:pinkAccent.withOpacity(0.3), blurRadius: 15,
    offset: const Offset(0, 5)),
  ],
),
child:Material(
  color:Colors.transparent,
  child:InkWell(
    borderRadius: BorderRadius.circular(16),
    onTap:(){
print("이메일:${_emailController.text}, 비번:${_passwordController.text}");
    },
    child: const Center(child: Text(
      
    ),),
  )
)   
)
}
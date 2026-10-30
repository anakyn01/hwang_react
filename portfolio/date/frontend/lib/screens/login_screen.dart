import 'package:flutter/material.dart';

import '../services/bgm_player.dart'; // 💡 BgmPlayer 서비스 임포트

//백엔드 서버와 통신하기 위한 패키지
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter/foundation.dart';

import 'signup_profile_screen.dart';
import '../main.dart';

//수질검사
import 'pending_approval_screen.dart';
import 'secondary_signup_screen.dart';

//어드민
import 'admin_login_screen.dart';

// 사용자가 글씨를 입력하고 체크박스를 누를 때 화면이 변해야 하므로 StatefulWidget을 씁니다.
class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

//1. 애니메이션 컨트롤을 위해 TickerProviderStateMixin을 추가했습니다.
class _LoginScreenState extends State<LoginScreen> with TickerProviderStateMixin{ //여기 위드 추가

  // 🎬 [애니메이션 컨트롤러 및 각 단계별 애니메이션 선언]
  late AnimationController _animController;
  late Animation<Offset> _slide1;
  late Animation<double> _fade1;
  late Animation<Offset> _slide2;
  late Animation<double> _fade2;
  late Animation<Offset> _slide3;
  late Animation<double> _fade3;
  late Animation<Offset> _slide4;
  late Animation<double> _fade4;

  //🎨 [1] 디자인 테마 색상 정의하기
  final Color bgColor = const Color(0xFF12121A);
  final Color cardColor = const Color(0xFF22222E);
  final Color pinkAccent = const Color(0xFFFF4B93);
  final Color purpleAccent = const Color(0xFFB635F7);
  final Color textColor = Colors.white;
  final Color subTextColor = const Color(0xFFA0A0B0); //오타

  //[2] 상태 관리 변수들
  bool _stayLoggedIn = true; //로그인 상태 유지 체크박스 상태(기본값:체크됨)

  //사용자가 입력한 이메일과 비밀번호를 읽어오기 위한
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  //여기 애니메이션 때문에 추가
  @override
  void initState() {
    super.initState();
    
    // 💡 2. 애니메이션 초기화 (총 1.2초 동안 진행)
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    );

    const beginOffset = Offset(0, 0.25); // 아래에서 살짝 올라옴
    const endOffset = Offset.zero;

    // 1단계: 로고 (0.0 ~ 0.4 구간)
    _slide1 = Tween<Offset>(begin: beginOffset, end: endOffset).animate(CurvedAnimation(parent: _animController, curve: const Interval(0.0, 0.4, curve: Curves.easeOutCubic)));
    _fade1 = Tween<double>(begin: 0, end: 1).animate(CurvedAnimation(parent: _animController, curve: const Interval(0.0, 0.4)));

    // 2단계: 타이틀 (0.15 ~ 0.55 구간)
    _slide2 = Tween<Offset>(begin: beginOffset, end: endOffset).animate(CurvedAnimation(parent: _animController, curve: const Interval(0.15, 0.55, curve: Curves.easeOutCubic)));
    _fade2 = Tween<double>(begin: 0, end: 1).animate(CurvedAnimation(parent: _animController, curve: const Interval(0.15, 0.55)));

    // 3단계: 이메일, 비밀번호, 옵션 (0.3 ~ 0.7 구간)
    _slide3 = Tween<Offset>(begin: beginOffset, end: endOffset).animate(CurvedAnimation(parent: _animController, curve: const Interval(0.3, 0.7, curve: Curves.easeOutCubic)));
    _fade3 = Tween<double>(begin: 0, end: 1).animate(CurvedAnimation(parent: _animController, curve: const Interval(0.3, 0.7)));

    // 4단계: 로그인 버튼, 소셜 버튼, 회원가입 링크 (0.45 ~ 1.0 구간)
    _slide4 = Tween<Offset>(begin: beginOffset, end: endOffset).animate(CurvedAnimation(parent: _animController, curve: const Interval(0.45, 1.0, curve: Curves.easeOutCubic)));
    _fade4 = Tween<double>(begin: 0, end: 1).animate(CurvedAnimation(parent: _animController, curve: const Interval(0.45, 1.0)));

    // 화면이 렌더링된 직후 애니메이션 자동 실행
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _animController.forward();
    });
  }

  //추가
  @override
  void dispose() {
    _animController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }
  
  //접속 기기에 맞취 로그인 API 주소 자동세팅
  String get _apiUrl {
    if (kIsWeb) {
      return 'http://localhost:3000/api/login';
    } else if (defaultTargetPlatform == TargetPlatform.android) {
      return 'http://10.0.2.2:3000/api/login';
    } else {
      return 'http://localhost:3000/api/login';
    }
  }

//추가 서버로 로그인 요청을 보내고 상태(승인대기, 정지 등)를 
//판별하는 핵심 함수
Future<void> _loginToBackend() async {
  final email = _emailController.text.trim();
  final password = _passwordController.text.trim();

  //플루터에 특성상 스낵바가 나옴
  if(email.isEmpty || password.isEmpty) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('이메일과 비밀번호를 모두 입력해주세요.')),
    );
    return;
  } try{
    final response = await http.post(
      Uri.parse(_apiUrl),
      headers: {'Content-Type':'application/json'},
      body:jsonEncode({'email':email, 'password':password}),
    );
    final data = jsonDecode(response.body);
//로그인 성공 시 (상태가 ACTIVE)
if(response.statusCode == 200 && data['success'] == true){
  //if nest
  if (mounted) {
    final user = data['user'];
      if (user['phone_number'] == null || user['occupation'] == null){
            Navigator.pushReplacement(
              context, 
              MaterialPageRoute(builder: (context) => SecondarySignupScreen(userId: user['id'])),
            );
        }else{
          Navigator.pushReplacement(
            context, MaterialPageRoute(builder: (context) => const RootScreen()),
          );
        }
       }
  //403 에러 (관리자 승인 대기 또는 영구정지)
}else if(response.statusCode == 403) {
//백엔드에서 보낸 메시지에 '수질 검사'가 포함되어 있다면 
//애니메이션 화면으로 이동!
if (data['message'] != null && data['message'].contains('수질 검사')){
  if(mounted) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const PendingApprovalScreen()),      
    );
  }
}else{
  //노쇼 3번으로 영구 정지(BANNED)된 경우 등은 빨간색 에러창 출력
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text(data['message'] ?? '접근할수 없는 계정 입니다'),
      backgroundColor: Colors.redAccent,
      duration: const Duration(seconds: 3),
    ),
  );
}
}else{//401(비밀번호 틀림) 등 기타 실패 
ScaffoldMessenger.of(context).showSnackBar(
SnackBar(content:Text(data['message'] ?? '이메일이나 비밀번호가 틀렸습니다')),
);
}
}catch (e) {
  print('로그인 통신 에러: $e');
  ScaffoldMessenger.of(context).showSnackBar(
const SnackBar(content: Text('서버와 연결할 수 없습니다. 백엔드 상태를 확인해주세요.'))
  );
}
}
  
  
  //[3] 화면을 그리는 메인 함수
  @override
  Widget build(BuildContext context) {
    //키보드가 올라왔을 때 밖을 누르면 키보드가 내려가도록 GestureDetector로 감싸줍니다.
    return Container(
      color:Colors.black,
       child: Center(
         child: ConstrainedBox(
          constraints:const BoxConstraints(maxWidth:480),
           child: GestureDetector(
            onTap: () {
              FocusScope.of(context).unfocus();
              BgmPlayer().playBgm(); // 💡 화면 터치 시 키보드 내리면서 BGM 재생
            },
            child: Scaffold(
              backgroundColor: bgColor,
              body: Stack(
                //배경 그라데이션 위에 내용물들을 겹쳐서 올리기 위해 Stack을 씁니다.
                children: [
                  _buildBackgroundGlow(), //밑에 정의 되지 않음
                  // 화면 우측 상단의 은은한 빛 효과
                  SafeArea(
                    child: SingleChildScrollView(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 24.0,
                        vertical: 40.0,
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start, //왼쪽정렬
                        children: [ //애니메이션을 적용하므로 여기부터 바뀜이 .. 
                          /* 이전코드_buildLogo(),
                          const SizedBox(height: 32),
                          _buildHeader(),
                          const SizedBox(height: 48),
                          _buildEmailField(),
                          const SizedBox(height: 24),
                          _buildPasswordField(),
                          const SizedBox(height: 16),
                          _buildOptionsRow(),
                          const SizedBox(height: 32),
                          _buildLoginButton(),
                          const SizedBox(height: 32),
                          _buildDivider(),
                          const SizedBox(height: 32),
                          _buildKakaoButton(),
                          const SizedBox(height: 16),
                          _buildAppleButton(),
                          const SizedBox(height: 48),
                          _buildSignupLink(),*/
                          // 1단계: 로고 애니메이션 적용
                          FadeTransition(
                            opacity: _fade1,
                            child: SlideTransition(
                              position: _slide1,
                              child: _buildLogo(),
                            ),
                          ),
                          const SizedBox(height: 32),

                          // 2단계: 타이틀 애니메이션 적용
                          FadeTransition(
                            opacity: _fade2,
                            child: SlideTransition(
                              position: _slide2,
                              child: _buildHeader(),
                            ),
                          ),
                          const SizedBox(height: 48),

                          // 3단계: 이메일, 비밀번호, 옵션 줄 애니메이션 적용
                          FadeTransition(
                            opacity: _fade3,
                            child: SlideTransition(
                              position: _slide3,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  _buildEmailField(),
                                  const SizedBox(height: 24),
                                  _buildPasswordField(),
                                  const SizedBox(height: 16),
                                  _buildOptionsRow(),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 32),

                          // 4단계: 로그인 버튼, 소셜 버튼, 회원가입 링크 애니메이션 적용
                          FadeTransition(
                            opacity: _fade4,
                            child: SlideTransition(
                              position: _slide4,
                              child: Column(
                                children: [
                                  _buildLoginButton(),
                                  const SizedBox(height: 32),
                                  _buildDivider(),
                                  const SizedBox(height: 32),
                                  _buildKakaoButton(),
                                  const SizedBox(height: 16),
                                  _buildAppleButton(),
                                  const SizedBox(height: 48),
                                  _buildSignupLink(),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
         ),
       ),
    );
  }

  Widget _buildBackgroundGlow() {
    return Positioned(
      top: -100,
      right: -50,
      child: Container(
        width: 300,
        height: 300,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          gradient: RadialGradient(
            colors: [purpleAccent.withValues(alpha: 0.3), bgColor.withValues(alpha: 0.0)],
            stops: const [0.2, 1.0],
          ),
        ),
      ),
    );
  }

  Widget _buildLogo() {
    return Center(
    child : GestureDetector(
      onLongPress: (){
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const AdminLoginScreen()),
          );
      },
      child: Row(
        mainAxisSize: MainAxisSize.min, // 💡 로고 크기만큼만 공간을 차지하게 하여 정중앙에 오도록 함
        children: [
          Icon(Icons.auto_awesome, color: pinkAccent, size: 24),
          const SizedBox(width: 8),
          Text(
            'SPARK',
            style: TextStyle(
              color: pinkAccent,
              fontSize: 20,
              fontWeight: FontWeight.w900,
              letterSpacing: 1.2,
            ),
          ),
        ],
      ),
    ),
    );
  }

//인사말 타이틀 (가운데 정렬 완벽 적용)
  Widget _buildHeader() {
    return SizedBox(
      width: double.infinity, // 가로 폭을 화면 가득 채워야 중앙 정렬 기준점이 잡힙니다!
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center, // 💡 가로축 기준 가운데 정렬
        children: [
          const Text(
            '다시 만나서 반가워요',
            style: TextStyle(
              color: Colors.white,
              fontSize: 32,
              fontWeight: FontWeight.bold,
              height: 1.3,
            ),
            textAlign: TextAlign.center, // 💡 텍스트 자체도 가운데 정렬
          ),
          const SizedBox(height: 12),
          Text(
            '로그인하고 새로운 인연을 만나보세요',
            style: TextStyle(color: subTextColor, fontSize: 16),
            textAlign: TextAlign.center, // 💡 텍스트 자체도 가운데 정렬
          ),
        ],
      ),
    );
  }

  /*Widget _buildEmailField() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          '이메일',
          style: TextStyle(
            color: Colors.white,
            fontSize: 14,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        _buildTextField(
          controller: _emailController,
          hint: '이메일을 입력하세요',
          icon: Icons.mail_outline,
          keyboardType: TextInputType.emailAddress,
        ),
      ],
    );
  }*/
  Widget _buildEmailField() {
    return _buildTextField(
      controller: _emailController,
      label: '이메일', // 💡 포커스 시 위로 올라갈 라벨 텍스트
      hint: '이메일을 입력하세요',
      icon: Icons.mail_outline,
      keyboardType: TextInputType.emailAddress,
    );
  }

  //여기도 추가
  Widget _buildPasswordField() {
    return _buildTextField(
      controller: _passwordController,
      label: '비밀번호', // 💡 포커스 시 위로 올라갈 라벨 텍스트
      hint: '비밀번호를 입력하세요',
      icon: Icons.lock_outline,
      isPassword: true,
    );
  }
  /*Widget _buildPasswordField() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          '비밀번호',
          style: TextStyle(
            color: Colors.white,
            fontSize: 14,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        _buildTextField(
          controller: _passwordController,
          hint: '비밀번호를 입력하세요',
          icon: Icons.lock_outline,
          isPassword: true,
        ),
      ],
    );
  }*/

  //체크박스와 비밀번호 찾기 줄
  Widget _buildOptionsRow() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        //체크박스 부분 (클릭 가능하도록 묶어줌)
        GestureDetector(
          onTap: () {
            setState(() => _stayLoggedIn = !_stayLoggedIn);
          },
          child: Row(
            children: [
              Container(
                width: 20,
                height: 20,
                decoration: BoxDecoration(
                  color: _stayLoggedIn ? pinkAccent : Colors.transparent,
                  // 체크되면 핑크, 아니면 투명
                  borderRadius: BorderRadius.circular(6),
                  border: Border.all(
                    color: _stayLoggedIn ? pinkAccent : subTextColor,
                  ),
                ),
                child: _stayLoggedIn
                    ? const Icon(Icons.check, size: 14, color: Colors.white)
                    : null,
              ),
              const SizedBox(width: 8),
              Text(
                '로그인 상태 유지',
                style: TextStyle(color: subTextColor, fontSize: 14),
              ),
            ],
          ),
        ),
        //비밀번호 찾기 버튼
        TextButton(
          onPressed: () {
            print("비밀번호 찾기 클릭됨");
          },
          child: Text(
            '비밀번호 찾기',
            style: TextStyle(color: pinkAccent, fontSize: 14),
          ),
        ),
      ],
    );
  }

//핑크색 메인 로그인 버튼
  Widget _buildLoginButton() {
    return Container(
      width: double.infinity, //가로 꽉 차게
      height: 56,
      decoration: BoxDecoration(
        gradient: LinearGradient(colors: [pinkAccent, purpleAccent]),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: pinkAccent.withValues(alpha: 0.3),
            blurRadius: 15,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(16),
          onTap: _loginToBackend,
          child: const Center(
            child: Text(
              '로그인',
              style: TextStyle(
                color: Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDivider() {
    return Row(
      children: [
        Expanded(child: Divider(color: cardColor, thickness: 1.5)),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Text(
            '또는',
            style: TextStyle(color: subTextColor, fontSize: 14),
          ),
        ),
        Expanded(child: Divider(color: cardColor, thickness: 1.5)),
      ],
    );
  }

  //카카오 로그인 버튼
  Widget _buildKakaoButton() {
    return _buildSocialButton(
      text: '카카오로 로그인',
      color: const Color(0xFFFEE500),
      textColor: Colors.black87,
      icon: Icons.chat_bubble,
    );
  }

  //애플 로그인 버튼
  Widget _buildAppleButton() {
    return _buildSocialButton(
      text: 'Apple로 로그인',
      color: cardColor,
      textColor: Colors.white,
      icon: Icons.apple,
    );
  }

  //소셜 로그인 버튼 팩토리
  Widget _buildSocialButton({
    required String text,
    required Color color,
    required Color textColor,
    required IconData icon,
  }) {
    return Container(
      width: double.infinity,
      height: 56,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(16),
          onTap: () {
            print("$text 클릭됨");
          },
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, color: textColor, size: 20),
              const SizedBox(width: 8),
              Text(
                text,
                style: TextStyle(
                  color: textColor,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  //하단 회원가입 링크 텍스트
  Widget _buildSignupLink() {
    return Center(
      child: GestureDetector(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const SignupProfileScreen(),
            ),
          );
        },
        child: RichText(
          text: TextSpan(
            text: '계정이 없으신가요?',
            style: TextStyle(color: subTextColor, fontSize: 14),
            children: [
              TextSpan(
                text: ' 회원가입 ',
                style: TextStyle(
                  color: pinkAccent,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  /*Widget _buildTextField({ 기존 플레이스 홀더와  겹처서 보기가 안좋음
    required TextEditingController controller,
    required String hint,
    required IconData icon,
    bool isPassword = false,
    TextInputType keyboardType = TextInputType.text,
  }) {
    return TextField(
      controller: controller,
      obscureText: isPassword,
      keyboardType: keyboardType,
      style: TextStyle(color: textColor, fontSize: 16),
      decoration: InputDecoration(

// 💡 포커스가 가거나 글을 쓰면 hint가 위로 작아지며 올라가는 플로팅 효과 적용
        floatingLabelBehavior: FloatingLabelBehavior.auto,
        labelText: hint, // 힌트 텍스트가 포커스 시 상단 라벨로 변환됩니다
        labelStyle: TextStyle(color: subTextColor, fontSize: 15),
        floatingLabelStyle: TextStyle(color: pinkAccent, fontSize: 13, fontWeight: FontWeight.bold),

        // 평소에 보일 힌트 (포커스 없을 때)
        hintText: hint,
        hintStyle: TextStyle(color: subTextColor.withValues(alpha: 0.5)),//여기 속성 추가
        prefixIcon: Icon(icon, color: subTextColor, size: 20),
        filled: true,
        fillColor: cardColor,
        contentPadding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),//여기도 추가
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: pinkAccent, width: 1.5),
        ),
      ),
    );
  }
}*/

/*Widget _buildTextField({
    required TextEditingController controller,
    required String hint,
    required IconData icon,
    bool isPassword = false,
    TextInputType keyboardType = TextInputType.text,
  }) {
    return TextField(
      controller: controller,
      obscureText: isPassword,
      keyboardType: keyboardType,
      style: TextStyle(color: textColor, fontSize: 16),
      decoration: InputDecoration(
        // 💡 둥둥 뜨는 labelText를 없애고 깔끔하게 hintText만 사용하여 
        // 포커스하거나 글을 입력하면 힌트가 자연스럽게 사라지도록 처리합니다.
        hintText: hint,
        hintStyle: TextStyle(color: subTextColor.withValues(alpha: 0.5)),
        
        prefixIcon: Icon(icon, color: subTextColor, size: 20),
        filled: true,
        fillColor: cardColor,
        contentPadding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: pinkAccent, width: 1.5),
        ),
      ),
    );
  }
}*/

Widget _buildTextField({
    required TextEditingController controller,
    required String label, // 💡 label 인자 추가
    required String hint,
    required IconData icon,
    bool isPassword = false,
    TextInputType keyboardType = TextInputType.text,
  }) {
    return TextFormField( // 💡 TextField 대신 플로팅 라벨을 지원하는 TextFormField 사용
      controller: controller,
      obscureText: isPassword,
      keyboardType: keyboardType,
      style: TextStyle(color: textColor, fontSize: 16),
      decoration: InputDecoration(
        // 💡 평소에는 안에 힌트로 있다가, 터치/포커스 시 상단으로 슬라이드 업 됩니다!
        labelText: label,
        hintText: hint,
        hintStyle: TextStyle(color: subTextColor.withValues(alpha: 0.3)),
        
        // 평소 라벨 색상 및 포커스되었을 때 상단 핑크색 포인트
        labelStyle: TextStyle(color: subTextColor, fontSize: 15),
        floatingLabelStyle: TextStyle(color: pinkAccent, fontSize: 13, fontWeight: FontWeight.bold),
        
        prefixIcon: Icon(icon, color: subTextColor, size: 20),
        filled: true,
        fillColor: cardColor,
        contentPadding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: pinkAccent, width: 1.5),
        ),
      ),
    );
  }
}
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter/foundation.dart';

// 관리자 대시보드 화면이 있다고 가정 (나중에 생성 필요)
import 'admin_dashboard_screen.dart';

class AdminLoginScreen extends StatefulWidget {
  const AdminLoginScreen({super.key});

  @override
  State<AdminLoginScreen> createState() => _AdminLoginScreenState();
}

class _AdminLoginScreenState extends State<AdminLoginScreen> {
  // 사용자가 입력할 이메일과 비밀번호 컨트롤러[cite: 1]
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  
  // Remember Me 체크박스 상태[cite: 1]
  bool _rememberMe = false;

  // 접속 기기에 맞춘 관리자 로그인 API 주소 (3000포트 사용)
  String get _apiUrl {
    if (kIsWeb) return 'http://localhost:3000/api/admin/login';
    if (defaultTargetPlatform == TargetPlatform.android) return 'http://10.0.2.2:3000/api/admin/login';
    return 'http://localhost:3000/api/admin/login';
  }

  // 로그인 버튼을 누를 때 실행되는 함수[cite: 1]
  Future<void> _handleLogin() async {
    final email = _emailController.text.trim();
    final password = _passwordController.text.trim();

    if (email.isEmpty || password.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('이메일과 비밀번호를 모두 입력해 주세요')),
      );
      return;
    }

    try {
      final response = await http.post(
        Uri.parse(_apiUrl),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );

      final data = jsonDecode(response.body);

      if (response.statusCode == 200 && data['success'] == true) {
        // 로그인 성공 알림창 (React의 alert 대체)[cite: 1]
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('${data['name']}님, ${data['message']}'),
            backgroundColor: Colors.green,
          ),
        );

        // 플러터 웹/앱 환경의 로컬 저장소에 이름 저장 필요 시 SharedPreferences 사용 권장
        // 일단은 바로 어드민 대시보드 화면으로 이동시킵니다 (React의 router.push 대체)[cite: 1]
       
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const AdminDashboardScreen()),
        );
      
      } else {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(data['message'] ?? '로그인 중 오류가 발생했습니다'),
            backgroundColor: Colors.redAccent,
          ),
        );
      }
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('서버 통신 에러가 발생했습니다.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    // React Bootstrap 스타일의 흰색 카드 UI를 플러터로 구현[cite: 1]
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FC), // Bootstrap 배경색 느낌
      body: Center(
        child: SingleChildScrollView(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 450), // 화면을 웹/모바일 중간 사이즈로 고정
            child: Card(
              elevation: 8, // shadow-lg[cite: 1]
              shadowColor: Colors.black26,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              margin: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
              child: Padding(
                padding: const EdgeInsets.all(32.0),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Text(
                      'Welcome Back!',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF3A3B45), // text-gray-900[cite: 1]
                      ),
                    ),
                    const SizedBox(height: 32),

                    // 이메일 입력칸
                    TextField(
                      controller: _emailController,
                      keyboardType: TextInputType.emailAddress,
                      decoration: InputDecoration(
                        hintText: 'Enter Email Address...',
                        filled: true,
                        fillColor: Colors.white,
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30), // form-control-user 둥근 테두리[cite: 1]
                          borderSide: const BorderSide(color: Color(0xFFD1D3E2)),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30),
                          borderSide: const BorderSide(color: Color(0xFFD1D3E2)),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),

                    // 비밀번호 입력칸
                    TextField(
                      controller: _passwordController,
                      obscureText: true,
                      decoration: InputDecoration(
                        hintText: 'Password',
                        filled: true,
                        fillColor: Colors.white,
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30),
                          borderSide: const BorderSide(color: Color(0xFFD1D3E2)),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(30),
                          borderSide: const BorderSide(color: Color(0xFFD1D3E2)),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),

                    // Remember Me 체크박스[cite: 1]
                    Row(
                      children: [
                        Checkbox(
                          value: _rememberMe,
                          onChanged: (value) {
                            setState(() {
                              _rememberMe = value ?? false;
                            });
                          },
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
                          activeColor: const Color(0xFF4E73DF),
                        ),
                        const Text(
                          'Remember Me',
                          style: TextStyle(color: Color(0xFF858796), fontSize: 14),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),

                    // 로그인 버튼[cite: 1]
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: ElevatedButton(
                        onPressed: _handleLogin,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF4E73DF), // btn-primary[cite: 1]
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
                          ),
                          elevation: 0,
                        ),
                        child: const Text(
                          'Login',
                          style: TextStyle(fontSize: 16, color: Colors.white),
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    const Divider(color: Color(0xFFE3E6F0), thickness: 1),
                    const SizedBox(height: 24),

                    // Google 로그인 버튼[cite: 1]
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: ElevatedButton.icon(
                        onPressed: () {},
                        icon: const Icon(Icons.g_mobiledata, color: Colors.white, size: 28),
                        label: const Text('Login with Google', style: TextStyle(color: Colors.white)),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFFEA4335), // btn-google[cite: 1]
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                          elevation: 0,
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),

                    // Facebook 로그인 버튼[cite: 1]
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: ElevatedButton.icon(
                        onPressed: () {},
                        icon: const Icon(Icons.facebook, color: Colors.white),
                        label: const Text('Login with Facebook', style: TextStyle(color: Colors.white)),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF3B5998), // btn-facebook[cite: 1]
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                          elevation: 0,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
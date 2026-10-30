import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'dart:ui'; // Glassmorphism(ImageFilter) 패키지

// 관리자 대시보드 화면이 있다고 가정
import 'admin_dashboard_screen.dart';

class AdminLoginScreen extends StatefulWidget {
  const AdminLoginScreen({super.key});

  @override
  State<AdminLoginScreen> createState() => _AdminLoginScreenState();
}

class _AdminLoginScreenState extends State<AdminLoginScreen>
    with SingleTickerProviderStateMixin {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  
  bool _rememberMe = false;

  // 🚀 순차적 슬라이드 다운 애니메이션을 위한 컨트롤러
  late final AnimationController _animController;
  late final Animation<double> _step1SlideAnim; 
  late final Animation<double> _step1FadeAnim;  
  late final Animation<double> _step2SlideAnim; 
  late final Animation<double> _step2FadeAnim;  

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    );

    _step1SlideAnim = Tween<double>(begin: -40.0, end: 0.0).animate(
      CurvedAnimation(
        parent: _animController,
        curve: const Interval(0.0, 0.6, curve: Curves.easeOut),
      ),
    );
    _step1FadeAnim = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _animController,
        curve: const Interval(0.0, 0.6, curve: Curves.easeOut),
      ),
    );

    _step2SlideAnim = Tween<double>(begin: -40.0, end: 0.0).animate(
      CurvedAnimation(
        parent: _animController,
        curve: const Interval(0.4, 1.0, curve: Curves.easeOut),
      ),
    );
    _step2FadeAnim = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _animController,
        curve: const Interval(0.4, 1.0, curve: Curves.easeOut),
      ),
    );

    _animController.forward();
  }

  @override
  void dispose() {
    _animController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  String get _apiUrl {
    if (kIsWeb) return 'http://localhost:3000/api/admin/login';
    if (defaultTargetPlatform == TargetPlatform.android) return 'http://10.0.2.2:3000/api/admin/login';
    return 'http://localhost:3000/api/admin/login';
  }

  // ✨ 상단 글래스룩 토스트 호출 함수 (BuildContext context 명시)
  void _showTopGlassToast(BuildContext context, String message, {bool isError = false}) {
    late OverlayEntry overlayEntry;

    overlayEntry = OverlayEntry(
      builder: (ctx) => TopSlidingToast(
        message: message,
        isError: isError,
        onDismiss: () {
          overlayEntry.remove();
        },
      ),
    );

    Overlay.of(context).insert(overlayEntry);
  }

  Future<void> _handleLogin() async {
    final email = _emailController.text.trim();
    final password = _passwordController.text.trim();

    if (email.isEmpty || password.isEmpty) {
      _showTopGlassToast(context, '이메일과 비밀번호를 모두 입력해 주세요', isError: true);
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
        if (!mounted) return;
        _showTopGlassToast(context, '${data['name']}님, ${data['message']}', isError: false);

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const AdminDashboardScreen()),
        );
      
      } else {
        if (!mounted) return;
        _showTopGlassToast(context, data['message'] ?? '로그인 중 오류가 발생했습니다', isError: true);
      }
    } catch (e) {
      if (!mounted) return;
      _showTopGlassToast(context, '서버 통신 에러가 발생했습니다.', isError: true);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF12121A),
      body: Stack(
        children: [
          Positioned(
            top: -80,
            left: -60,
            child: Container(
              width: 350,
              height: 350,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFFFF4B93).withValues(alpha: 0.35),
              ),
            ),
          ),
          Positioned(
            top: MediaQuery.of(context).size.height * 0.35,
            right: -100,
            child: Container(
              width: 400,
              height: 400,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFFB635F7).withValues(alpha: 0.32),
              ),
            ),
          ),
          Positioned(
            bottom: -80,
            left: MediaQuery.of(context).size.width * 0.15,
            child: Container(
              width: 380,
              height: 380,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFF00C6FF).withValues(alpha: 0.25),
              ),
            ),
          ),

          BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 60, sigmaY: 60),
            child: Container(color: Colors.transparent),
          ),

          Center(
            child: SingleChildScrollView(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 450),
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24.0),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(24),
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
                      child: Container(
                        padding: const EdgeInsets.all(32.0),
                        decoration: BoxDecoration(
                          color: const Color(0xFF22222E).withValues(alpha: 0.6),
                          borderRadius: BorderRadius.circular(24),
                          border: Border.all(
                            color: Colors.white.withValues(alpha: 0.15),
                            width: 1.5,
                          ),
                        ),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Center(
                              child: Text(
                                'Welcome Back!',
                                style: TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                            const SizedBox(height: 32),

                            // 1단계 슬라이드
                            AnimatedBuilder(
                              animation: _animController,
                              builder: (context, child) {
                                return Transform.translate(
                                  offset: Offset(0, _step1SlideAnim.value),
                                  child: Opacity(
                                    opacity: _step1FadeAnim.value,
                                    child: child,
                                  ),
                                );
                              },
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  _buildCustomAnimatedTextField(
                                    controller: _emailController,
                                    label: '이메일',
                                    hint: 'example@test.com',
                                    keyboardType: TextInputType.emailAddress,
                                  ),
                                  const SizedBox(height: 24),
                                  _buildCustomAnimatedTextField(
                                    controller: _passwordController,
                                    label: '비밀번호',
                                    hint: '비밀번호 입력',
                                    obscureText: true,
                                  ),
                                  const SizedBox(height: 16),

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
                                        activeColor: const Color(0xFFFF4B93),
                                        checkColor: Colors.white,
                                      ),
                                      const Text(
                                        'Remember Me',
                                        style: TextStyle(color: Color(0xFFA0A0B0), fontSize: 14),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(height: 24),

                            // 2단계 슬라이드
                            AnimatedBuilder(
                              animation: _animController,
                              builder: (context, child) {
                                return Transform.translate(
                                  offset: Offset(0, _step2SlideAnim.value),
                                  child: Opacity(
                                    opacity: _step2FadeAnim.value,
                                    child: child,
                                  ),
                                );
                              },
                              child: Column(
                                children: [
                                  SizedBox(
                                    width: double.infinity,
                                    height: 48,
                                    child: ElevatedButton(
                                      onPressed: _handleLogin,
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: const Color(0xFFFF4B93),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(30),
                                        ),
                                        elevation: 0,
                                      ),
                                      child: const Text(
                                        'Login',
                                        style: TextStyle(fontSize: 16, color: Colors.white, fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 24),
                                  Divider(color: Colors.white.withValues(alpha: 0.1), thickness: 1),
                                  const SizedBox(height: 24),

                                  SizedBox(
                                    width: double.infinity,
                                    height: 48,
                                    child: ElevatedButton.icon(
                                      onPressed: () {},
                                      icon: const Icon(Icons.g_mobiledata, color: Colors.white, size: 28),
                                      label: const Text('Login with Google', style: TextStyle(color: Colors.white)),
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: const Color(0xFFEA4335),
                                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                                        elevation: 0,
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 12),

                                  SizedBox(
                                    width: double.infinity,
                                    height: 48,
                                    child: ElevatedButton.icon(
                                      onPressed: () {},
                                      icon: const Icon(Icons.facebook, color: Colors.white),
                                      label: const Text('Login with Facebook', style: TextStyle(color: Colors.white)),
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: const Color(0xFF3B5998),
                                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                                        elevation: 0,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: const TextStyle(
        color: Colors.white,
        fontSize: 15,
        fontWeight: FontWeight.bold,
      ),
    );
  }

  Widget _buildCustomAnimatedTextField({
    required TextEditingController controller,
    required String label,
    required String hint,
    int maxLines = 1,
    TextInputType keyboardType = TextInputType.text,
    bool obscureText = false,
  }) {
    return StatefulBuilder(
      builder: (context, setStateSB) {
        controller.addListener(() {
          if (mounted) setStateSB(() {});
        });

        return Focus(
          onFocusChange: (hasFocus) {
            setStateSB(() {});
          },
          child: Builder(
            builder: (ctx) {
              final bool isFocused = Focus.of(ctx).hasFocus;
              final bool hasText = controller.text.isNotEmpty;
              final bool isActive = isFocused || hasText;

              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  AnimatedOpacity(
                    opacity: isActive ? 0.0 : 1.0,
                    duration: const Duration(milliseconds: 200),
                    child: _buildSectionTitle(label),
                  ),
                  SizedBox(height: isActive ? 0 : 8),
                  Stack(
                    clipBehavior: Clip.none,
                    children: [
                      TextField(
                        controller: controller,
                        maxLines: maxLines,
                        obscureText: obscureText,
                        keyboardType: keyboardType,
                        style: const TextStyle(color: Colors.white, fontSize: 15),
                        decoration: InputDecoration(
                          hintText: isActive ? hint : '',
                          hintStyle: TextStyle(color: const Color(0xFFA0A0B0).withValues(alpha: 0.5)),
                          filled: true,
                          fillColor: const Color(0xFF12121A).withValues(alpha: 0.6),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(30),
                            borderSide: BorderSide.none,
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(30),
                            borderSide: const BorderSide(color: Color(0xFF38384A), width: 1),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(30),
                            borderSide: const BorderSide(color: Color(0xFFFF4B93), width: 1.5),
                          ),
                        ),
                      ),
                      AnimatedPositioned(
                        duration: const Duration(milliseconds: 200),
                        curve: Curves.easeInOut,
                        left: 20,
                        top: isActive ? -10 : 16,
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          padding: const EdgeInsets.symmetric(horizontal: 4),
                          color: isActive ? const Color(0xFF22222E) : Colors.transparent,
                          child: Text(
                            label,
                            style: TextStyle(
                              color: isActive ? const Color(0xFFFF4B93) : Colors.transparent,
                              fontSize: isActive ? 12 : 0,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              );
            },
          ),
        );
      },
    );
  }
}

// ✨ 상단 슬라이드 다운 글래스룩 토스트 위젯
class TopSlidingToast extends StatefulWidget {
  final String message;
  final bool isError;
  final VoidCallback onDismiss;

  const TopSlidingToast({
    super.key,
    required this.message,
    required this.isError,
    required this.onDismiss,
  });

  @override
  State<TopSlidingToast> createState() => _TopSlidingToastState();
}

class _TopSlidingToastState extends State<TopSlidingToast>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _slideAnimation;
  late final Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 400),
    );

    _slideAnimation = Tween<double>(begin: -100.0, end: 0.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutBack),
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeIn),
    );

    _controller.forward();

    Future.delayed(const Duration(milliseconds: 2500), () async {
      if (mounted) {
        await _controller.reverse();
        widget.onDismiss();
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: MediaQuery.of(context).padding.top + 16,
      left: 24,
      right: 24,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 450),
          child: AnimatedBuilder(
            animation: _controller,
            builder: (context, child) {
              return Transform.translate(
                offset: Offset(0, _slideAnimation.value),
                child: Opacity(
                  opacity: _fadeAnimation.value,
                  child: child,
                ),
              );
            },
            child: ClipRRect(
              borderRadius: BorderRadius.circular(16),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
                  decoration: BoxDecoration(
                    color: const Color(0xFF22222E).withValues(alpha: 0.85),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(
                      color: widget.isError
                          ? Colors.redAccent.withValues(alpha: 0.5)
                          : const Color(0xFFFF4B93).withValues(alpha: 0.5),
                      width: 1.5,
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.3),
                        blurRadius: 12,
                        offset: const Offset(0, 6),
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        widget.isError ? Icons.error_outline : Icons.check_circle_outline,
                        color: widget.isError ? Colors.redAccent : const Color(0xFFFF4B93),
                        size: 20,
                      ),
                      const SizedBox(width: 12),
                      Flexible(
                        child: Text(
                          widget.message,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            decoration: TextDecoration.none,
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
      ),
    );
  }
}
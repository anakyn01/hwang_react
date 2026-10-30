import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'dart:ui'; // Glassmorphism(ImageFilter) 패키지

import 'package:kpostal/kpostal.dart';
import '../main.dart';

class SecondarySignupScreen extends StatefulWidget {
  final int userId;
  const SecondarySignupScreen({super.key, required this.userId});
  @override
  State<SecondarySignupScreen> createState() => _SecondarySignupScreenState();
}

class _SecondarySignupScreenState extends State<SecondarySignupScreen>
    with SingleTickerProviderStateMixin {
  final Color bgColor = const Color(0xFF12121A);
  final Color cardColor = const Color(0xFF22222E);
  final Color pinkAccent = const Color(0xFFFF4B93);
  final Color purpleAccent = const Color(0xFFB635F7);
  final Color textColor = Colors.white;
  final Color subTextColor = const Color(0xFFA0A0B0);

  // 🚀 순차적 슬라이드 다운 애니메이션을 위한 컨트롤러
  late final AnimationController _animController;
  late final Animation<double> _step1SlideAnim;
  late final Animation<double> _step1FadeAnim;
  late final Animation<double> _step2SlideAnim;
  late final Animation<double> _step2FadeAnim;

  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _jobController = TextEditingController();
  final TextEditingController _addressController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    );

    // 1단계 (휴대폰 번호, 직업 영역)
    _step1SlideAnim = Tween<double>(begin: -30.0, end: 0.0).animate(
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

    // 2단계 (주소 영역)
    _step2SlideAnim = Tween<double>(begin: -30.0, end: 0.0).animate(
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
    _phoneController.dispose();
    _jobController.dispose();
    _addressController.dispose();
    super.dispose();
  }

  String get _apiUrl {
    if (kIsWeb) return 'http://localhost:3000';
    if (defaultTargetPlatform == TargetPlatform.android) return 'http://10.0.2.2:3000';
    return 'http://localhost:3000';
  }

  // ✨ 상단 글래스룩 토스트 호출 함수
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

  // 주소 검색 함수
  Future<void> _searchAddress() async {
    try {
      Kpostal? result = await Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => KpostalView(
            useLocalServer: false,
          ),
        ),
      );

      if (result != null) {
        setState(() {
          _addressController.text = result.address;
        });
      }
    } catch (e) {
      print('주소 검색창 호출 에러: $e');
    }
  }

  Future<void> _submitData() async {
    if (_phoneController.text.isEmpty ||
        _jobController.text.isEmpty ||
        _addressController.text.isEmpty) {
      _showTopGlassToast(context, '모든 정보를 입력해 주세요.', isError: true);
      return;
    }
    try {
      final response = await http.patch(
        Uri.parse('$_apiUrl/api/users/${widget.userId}/secondary-signup'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'phone_number': _phoneController.text.trim(),
          'occupation': _jobController.text.trim(),
          'address': _addressController.text.trim(),
        }),
      );

      final data = jsonDecode(response.body);
      if (response.statusCode == 200 && data['success'] == true) {
        if (!mounted) return;
        _showTopGlassToast(context, data['message'] ?? '추가 정보 입력 완료!', isError: false);
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const RootScreen()),
        );
      } else {
        if (!mounted) return;
        _showTopGlassToast(context, data['message'] ?? '저장 실패', isError: true);
      }
    } catch (e) {
      _showTopGlassToast(context, '서버 통신 에러가 발생했습니다.', isError: true);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Text('추가 정보 입력', style: TextStyle(color: textColor, fontWeight: FontWeight.bold)),
        centerTitle: true,
      ),
      // 하단 고정 버튼 영역
      bottomNavigationBar: Container(
        padding: const EdgeInsets.all(24.0),
        color: bgColor,
        child: SafeArea(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 480),
            child: SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: _submitData,
                style: ElevatedButton.styleFrom(
                  backgroundColor: pinkAccent,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  elevation: 5,
                  shadowColor: pinkAccent.withOpacity(0.5),
                ),
                child: const Text('입력 완료하고 시작하기', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
              ),
            ),
          ),
        ),
      ),
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 480),
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 12.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  '관리자 승인이 완료되었습니다!\n원활한 매칭을 위해 추가 정보를 입력해주세요.',
                  style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold, height: 1.5),
                ),
                const SizedBox(height: 30), // 👉 안내 문구 아래에 정확히 30px 여백을 주어 정보를 아래로 내림

                // 🚀 [1단계] 슬라이드 다운 영역 (휴대폰 번호, 직업)
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
                        controller: _phoneController,
                        label: '휴대폰 번호',
                        hint: '- 없이 숫자만 입력',
                        icon: Icons.phone_android,
                        isNumber: true,
                      ),
                      const SizedBox(height: 20),
                      _buildCustomAnimatedTextField(
                        controller: _jobController,
                        label: '직업',
                        hint: '예) 디자이너, 학생, 회사원',
                        icon: Icons.work_outline,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                // 🚀 [2단계] 슬라이드 다운 영역 (주소 검색)
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
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Expanded(
                        child: _buildCustomAnimatedTextField(
                          controller: _addressController,
                          label: '거주지 (주소)',
                          hint: '주소 검색을 눌러주세요',
                          icon: Icons.map_outlined,
                          isReadOnly: true,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Container(
                        height: 58,
                        child: ElevatedButton(
                          onPressed: _searchAddress,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: cardColor,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                              side: BorderSide(color: pinkAccent, width: 1.5),
                            ),
                            elevation: 0,
                          ),
                          child: Text('검색', style: TextStyle(color: pinkAccent, fontWeight: FontWeight.bold, fontSize: 16)),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: TextStyle(color: textColor, fontSize: 14, fontWeight: FontWeight.bold),
    );
  }

  // ✨ 플레이스홀더 및 상단 라벨 애니메이션이 적용된 커스텀 텍스트 필드
  Widget _buildCustomAnimatedTextField({
    required TextEditingController controller,
    required String label,
    required String hint,
    required IconData icon,
    bool isNumber = false,
    bool isReadOnly = false,
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
                        readOnly: isReadOnly,
                        keyboardType: isNumber ? TextInputType.number : TextInputType.text,
                        style: TextStyle(color: textColor, fontSize: 16),
                        decoration: InputDecoration(
                          hintText: isActive ? hint : '',
                          hintStyle: TextStyle(color: subTextColor.withOpacity(0.5)),
                          prefixIcon: Icon(icon, color: Colors.white54, size: 20),
                          filled: true,
                          fillColor: cardColor,
                          contentPadding: const EdgeInsets.symmetric(vertical: 18),
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(16),
                            borderSide: const BorderSide(color: Color(0xFF38384A), width: 1),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(16),
                            borderSide: BorderSide(color: pinkAccent, width: 1.5),
                          ),
                        ),
                      ),
                      AnimatedPositioned(
                        duration: const Duration(milliseconds: 200),
                        curve: Curves.easeInOut,
                        left: 48,
                        top: isActive ? -10 : 18,
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          padding: const EdgeInsets.symmetric(horizontal: 4),
                          color: isActive ? bgColor : Colors.transparent,
                          child: Text(
                            label,
                            style: TextStyle(
                              color: isActive ? pinkAccent : Colors.transparent,
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
          constraints: const BoxConstraints(maxWidth: 480),
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
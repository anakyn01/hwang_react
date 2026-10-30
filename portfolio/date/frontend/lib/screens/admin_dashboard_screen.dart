import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'dart:ui'; // Glassmorphism(ImageFilter) 패키지
import 'admin_login_screen.dart';

class AdminDashboardScreen extends StatefulWidget {
  const AdminDashboardScreen({super.key});

  @override
  State<AdminDashboardScreen> createState() => _AdminDashboardScreenState();
}

class _AdminDashboardScreenState extends State<AdminDashboardScreen> {
  final Color bgColor = const Color(0xFF12121A);
  final Color cardColor = const Color(0xFF22222E);
  final Color pinkAccent = const Color(0xFFFF4B93);
  
  List<dynamic> _users = [];
  bool _isLoading = true;

  String get _baseUrl {
    if (kIsWeb) return 'http://localhost:3000';
    if (defaultTargetPlatform == TargetPlatform.android) return 'http://10.0.2.2:3000';
    return 'http://localhost:3000';
  }

  @override
  void initState() {
    super.initState();
    _fetchUsers();
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

  Future<void> _fetchUsers() async {
    setState(() => _isLoading = true);
    try {
      final response = await http.get(Uri.parse('$_baseUrl/api/admin/users'));
      final data = jsonDecode(response.body);
      
      if (response.statusCode == 200 && data['success'] == true) {
        setState(() {
          _users = data['users'];
          _isLoading = false;
        });
      } else {
        throw Exception(data['message'] ?? '데이터 로딩 실패');
      }
    } catch (e) {
      print('서버 통신 오류: $e');
      setState(() => _isLoading = false);
      if (mounted) {
        _showTopGlassToast(context, '통신 오류: $e', isError: true);
      }
    }
  }

  Future<void> _approveUser(int userId, String nickname) async {
    try {
      final response = await http.patch(Uri.parse('$_baseUrl/api/admin/users/$userId/approve'));
      if (response.statusCode == 200) {
        _showTopGlassToast(context, '$nickname 님 수질 검사 통과(승인) 완료!', isError: false);
        _fetchUsers(); 
      }
    } catch (e) {
      _showTopGlassToast(context, '승인 처리 중 통신 에러가 발생했습니다.', isError: true);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
        title: const Text('회원 가입 심사', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
        backgroundColor: cardColor,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh, color: Colors.white), 
            onPressed: _fetchUsers,
            tooltip: '새로고침',
          ),
          IconButton(
            icon: const Icon(Icons.logout, color: Colors.white),
            onPressed: () => Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => const AdminLoginScreen())),
            tooltip: '로그아웃',
          )
        ],
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator(color: pinkAccent))
          : _users.isEmpty
              ? const Center(child: Text('가입한 회원이 없습니다.', style: TextStyle(color: Colors.white)))
              : Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 800),
                    child: ListView.builder(
                      padding: const EdgeInsets.all(16),
                      itemCount: _users.length,
                      itemBuilder: (context, index) {
                        final user = _users[index];
                        final isPending = user['status'] == 'PENDING';

                        return Card(
                          color: cardColor,
                          margin: const EdgeInsets.only(bottom: 16),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          child: ExpansionTile(
                            iconColor: Colors.white,
                            collapsedIconColor: Colors.white70,
                            title: Row(
                              children: [
                                CircleAvatar(
                                  radius: 24,
                                  backgroundColor: Colors.grey[800],
                                  backgroundImage: user['profile_image_main'] != null 
                                      ? NetworkImage('$_baseUrl${user['profile_image_main']}') 
                                      : null,
                                  child: user['profile_image_main'] == null 
                                      ? const Icon(Icons.person, color: Colors.white) 
                                      : null,
                                ),
                                const SizedBox(width: 16),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        '${user['nickname']} (${user['age']}세)', 
                                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                      const SizedBox(height: 4),
                                      Text(
                                        user['email'], 
                                        style: const TextStyle(color: Colors.white70, fontSize: 13),
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            trailing: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                              decoration: BoxDecoration(
                                color: isPending ? pinkAccent.withValues(alpha: 0.15) : Colors.green.withValues(alpha: 0.15),
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(color: isPending ? pinkAccent : Colors.greenAccent, width: 1),
                              ),
                              child: Text(
                                user['status'], 
                                style: TextStyle(color: isPending ? pinkAccent : Colors.greenAccent, fontWeight: FontWeight.bold, fontSize: 12),
                              ),
                            ),
                            children: [
                              Padding(
                                padding: const EdgeInsets.all(20.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Text('📝 자기소개', style: TextStyle(color: Colors.white70, fontSize: 14, fontWeight: FontWeight.bold)),
                                    const SizedBox(height: 8),
                                    Container(
                                      width: double.infinity,
                                      padding: const EdgeInsets.all(12),
                                      decoration: BoxDecoration(
                                        color: bgColor,
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: Text(
                                        user['bio'] ?? '작성된 자기소개가 없습니다.', 
                                        style: const TextStyle(color: Colors.white, fontSize: 14, height: 1.5),
                                      ),
                                    ),
                                    const SizedBox(height: 24),
                                    const Text('📸 등록된 사진', style: TextStyle(color: Colors.white70, fontSize: 14, fontWeight: FontWeight.bold)),
                                    const SizedBox(height: 12),
                                    
                                    Row(
                                      children: [
                                        _buildResponsiveImageBox(user['profile_image_main']),
                                        const SizedBox(width: 8),
                                        _buildResponsiveImageBox(user['profile_image_sub1']),
                                        const SizedBox(width: 8),
                                        _buildResponsiveImageBox(user['profile_image_sub2']),
                                      ],
                                    ),
                                    const SizedBox(height: 24),
                                    
                                    if (isPending)
                                      SizedBox(
                                        width: double.infinity,
                                        height: 52,
                                        child: ElevatedButton(
                                          onPressed: () => _approveUser(user['id'], user['nickname']),
                                          style: ElevatedButton.styleFrom(
                                            backgroundColor: pinkAccent, 
                                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                            elevation: 4,
                                          ),
                                          child: const Text('수질 검사 통과 (승인하기)', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                                        ),
                                      ),
                                  ],
                                ),
                              )
                            ],
                          ),
                        );
                      },
                    ),
                  ),
                ),
    );
  }

  Widget _buildResponsiveImageBox(dynamic imagePath) {
    final bool hasImage = imagePath != null && 
                          imagePath.toString().trim().isNotEmpty && 
                          imagePath.toString() != 'null';

    return Expanded(
      child: AspectRatio(
        aspectRatio: 1,
        child: Container(
          decoration: BoxDecoration(
            color: const Color(0xFF1A1A24),
            borderRadius: BorderRadius.circular(12),
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: hasImage
                ? Image.network(
                    '$_baseUrl$imagePath',
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      return const Center(
                        child: Icon(Icons.broken_image, color: Colors.white24, size: 32),
                      );
                    },
                  )
                : const Center(
                    child: Icon(Icons.image_not_supported, color: Colors.white24, size: 32),
                  ),
          ),
        ),
      ),
    );
  }
}

// ✨ 상단 슬라이드 다운 글래스룩 토스트 위젯 (파일 내 포함)
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
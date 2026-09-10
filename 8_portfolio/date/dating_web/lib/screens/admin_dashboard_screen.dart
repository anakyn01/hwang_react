import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'admin_login_screen.dart'; // 로그아웃 시 돌아갈 화면

class AdminDashboardScreen extends StatefulWidget {
  const AdminDashboardScreen({super.key});

  @override
  State<AdminDashboardScreen> createState() => _AdminDashboardScreenState();
}

class _AdminDashboardScreenState extends State<AdminDashboardScreen> {
  final Color bgColor = const Color(0xFF12121A);
  final Color cardColor = const Color(0xFF22222E);
  final Color pinkAccent = const Color(0xFFFF4B93);
  final Color purpleAccent = const Color(0xFFB635F7);
  
  List<dynamic> _users = [];
  bool _isLoading = true;

  // 통신용 기본 서버 주소
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

  // 1. 서버에서 유저 리스트 가져오기
  Future<void> _fetchUsers() async {
    try {
      final response = await http.get(Uri.parse('$_baseUrl/api/admin/users'));
      final data = jsonDecode(response.body);

      if (response.statusCode == 200 && data['success'] == true) {
        setState(() {
          _users = data['users'];
          _isLoading = false;
        });
      }
    } catch (e) {
      print('유저 목록 로딩 에러: $e');
      setState(() => _isLoading = false);
    }
  }

  // 2. 승인 버튼 누를 때 실행되는 함수
  Future<void> _approveUser(int userId, String nickname) async {
    try {
      final response = await http.patch(Uri.parse('$_baseUrl/api/admin/users/$userId/approve'));
      final data = jsonDecode(response.body);

      if (response.statusCode == 200 && data['success'] == true) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('$nickname 님의 가입이 승인되었습니다.'), backgroundColor: Colors.green),
        );
        _fetchUsers(); // 승인 후 리스트 새로고침
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(data['message'] ?? '승인 실패'), backgroundColor: Colors.redAccent),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('서버 통신 에러가 발생했습니다.')),
      );
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
            onPressed: _fetchUsers, // 새로고침 버튼
          ),
          IconButton(
            icon: const Icon(Icons.logout, color: Colors.white),
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => const AdminLoginScreen()),
              );
            },
          )
        ],
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator(color: pinkAccent))
          : _users.isEmpty
              ? const Center(child: Text('가입한 회원이 없습니다.', style: TextStyle(color: Colors.white)))
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: _users.length,
                  itemBuilder: (context, index) {
                    final user = _users[index];
                    final isPending = user['status'] == 'PENDING';

                    return Card(
                      color: cardColor,
                      margin: const EdgeInsets.only(bottom: 16),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      // 클릭 시 아래로 쫙 펼쳐지는 타일 위젯
                      child: ExpansionTile(
                        iconColor: Colors.white,
                        collapsedIconColor: Colors.white70,
                        title: Row(
                          children: [
                            CircleAvatar(
                              backgroundColor: Colors.grey[800],
                              backgroundImage: user['profile_image_main'] != null
                                  ? NetworkImage('$_baseUrl${user['profile_image_main']}')
                                  : null,
                              child: user['profile_image_main'] == null ? const Icon(Icons.person, color: Colors.white) : null,
                            ),
                            const SizedBox(width: 16),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  '${user['nickname']} (${user['age']}, ${user['gender'] == 'M' ? '남' : '여'})',
                                  style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  user['email'],
                                  style: const TextStyle(color: Colors.white70, fontSize: 12),
                                ),
                              ],
                            ),
                          ],
                        ),
                        // 현재 상태 배지 (PENDING 이면 분홍색, ACTIVE 면 초록색)
                        trailing: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          decoration: BoxDecoration(
                            color: isPending ? pinkAccent.withValues(alpha: 0.2) : Colors.green.withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            user['status'],
                            style: TextStyle(
                              color: isPending ? pinkAccent : Colors.greenAccent,
                              fontWeight: FontWeight.bold,
                              fontSize: 12,
                            ),
                          ),
                        ),
                        // 펼쳤을 때 나오는 숨겨진 정보들 (사진들, 자기소개, 승인 버튼)
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(16.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('자기소개', style: TextStyle(color: Colors.white70, fontSize: 12)),
                                const SizedBox(height: 8),
                                Text(user['bio'] ?? '입력된 자기소개가 없습니다.', style: const TextStyle(color: Colors.white, fontSize: 14)),
                                const SizedBox(height: 16),
                                const Text('등록된 사진', style: TextStyle(color: Colors.white70, fontSize: 12)),
                                const SizedBox(height: 8),
                                Row(
                                  children: [
                                    _buildImageBox(user['profile_image_main']),
                                    const SizedBox(width: 8),
                                    _buildImageBox(user['profile_image_sub1']),
                                    const SizedBox(width: 8),
                                    _buildImageBox(user['profile_image_sub2']),
                                  ],
                                ),
                                const SizedBox(height: 24),
                                // 승인 대기 중일 때만 핑크색 승인 버튼 표시
                                if (isPending)
                                  SizedBox(
                                    width: double.infinity,
                                    height: 48,
                                    child: ElevatedButton(
                                      onPressed: () => _approveUser(user['id'], user['nickname']),
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: pinkAccent,
                                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                      ),
                                      child: const Text('수질 검사 승인하기', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
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
    );
  }

  // 등록된 사진들을 네모난 박스로 예쁘게 보여주는 도구
  Widget _buildImageBox(String? imagePath) {
    if (imagePath == null) {
      return Expanded(
        child: Container(
          height: 100,
          decoration: BoxDecoration(color: Colors.grey[850], borderRadius: BorderRadius.circular(8)),
          child: const Icon(Icons.image_not_supported, color: Colors.white30),
        ),
      );
    }
    return Expanded(
      child: Container(
        height: 100,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8),
          image: DecorationImage(
            image: NetworkImage('$_baseUrl$imagePath'),
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}
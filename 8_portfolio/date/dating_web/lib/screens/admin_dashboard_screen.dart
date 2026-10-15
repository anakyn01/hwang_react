import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter/foundation.dart';
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
    return 'http://localhost:3000'; // iOS 에뮬레이터도 localhost 사용
  }

  @override
  void initState() {
    super.initState();
    _fetchUsers();
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
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('통신 오류: $e'), backgroundColor: Colors.redAccent),
        );
      }
    }
  }

  Future<void> _approveUser(int userId, String nickname) async {
    try {
      final response = await http.patch(Uri.parse('$_baseUrl/api/admin/users/$userId/approve'));
      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('$nickname 님 승인 완료!'), backgroundColor: Colors.green),
        );
        _fetchUsers(); // 승인 후 즉시 새로고침
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('승인 처리 중 통신 에러가 발생했습니다.')),
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
                  // 👉 [반응형 핵심] 태블릿과 PC에서 리스트가 가로로 무한정 늘어나지 않게 최대 800px로 고정
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
                                    
                                    // 👉 [반응형 핵심] 사진들이 찌그러지지 않게 GridView와 유사한 고정 비율 레이아웃 적용
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

  // 👉 [수정됨] 에러 처리(errorBuilder)와 null 완벽 대응이 추가된 이미지 박스
  Widget _buildResponsiveImageBox(dynamic imagePath) {
    // DB에서 null, 글자 "null", 빈 문자열("") 중 어떻게 넘어오더라도 다 걸러냅니다.
    final bool hasImage = imagePath != null && 
                          imagePath.toString().trim().isNotEmpty && 
                          imagePath.toString() != 'null';

    return Expanded(
      child: AspectRatio(
        aspectRatio: 1, // 완벽한 정사각형 비율 유지
        child: Container(
          decoration: BoxDecoration(
            color: const Color(0xFF1A1A24),
            borderRadius: BorderRadius.circular(12),
          ),
          // ClipRRect를 사용해 이미지가 네모 박스 밖으로 삐져나가지 않게 둥글게 자릅니다.
          child: ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: hasImage
                ? Image.network(
                    '$_baseUrl$imagePath',
                    fit: BoxFit.cover,
                    // 👉 [핵심] 서버 통신은 됐으나 파일이 지워졌거나 깨졌을 때 빈칸 대신 '깨진 이미지 아이콘' 출력
                    errorBuilder: (context, error, stackTrace) {
                      print('이미지 로드 실패: $_baseUrl$imagePath'); // 디버그 콘솔에서 원인 확인용
                      return const Center(
                        child: Icon(Icons.broken_image, color: Colors.white24, size: 32),
                      );
                    },
                  )
                : const Center(
                    // 처음부터 등록된 사진이 없을 때 보여줄 아이콘
                    child: Icon(Icons.image_not_supported, color: Colors.white24, size: 32),
                  ),
          ),
        ),
      ),
    );
  }
}
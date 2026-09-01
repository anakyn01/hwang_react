import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_card_swiper/flutter_card_swiper.dart';

// 📂 쪼개놓은 스크린 파일들 불러오기
import 'screens/splash_screen.dart'; // (현재 오타난 파일명 기준)
import 'screens/my_page_screen.dart';

void main() {
  runApp(const DatingApp());
}

class DatingApp extends StatelessWidget {
  const DatingApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SPARK Dating Web',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF12121A),
      ),
      // 🚀 앱이 켜지면 가장 먼저 스플래시 화면으로 갑니다.
      home: const SplashScreen(),
    );
  }
}

// ============================================================================
// 🏗️ [공통 뼈대 화면] 하단바(푸터)를 고정해두고 알맹이만 갈아끼우는 RootScreen
// ============================================================================
class RootScreen extends StatefulWidget {
  final int initialIndex;
  const RootScreen({super.key, this.initialIndex = 0});

  @override
  State<RootScreen> createState() => _RootScreenState();
}

class _RootScreenState extends State<RootScreen> {
  final Color pinkAccent = const Color(0xFFFF4B93);
  late int _selectedIndex;

  // 💡 하단 탭을 눌렀을 때 교체될 알맹이 화면들 (순서 중요!)
  final List<Widget> _pages = [
    const DatingHomeScreen(), // 0: 매칭 (홈 화면)
    const Center(child: Text('커뮤니티 화면 (준비중)')), // 1: 커뮤니티
    const Center(child: Text('일기 화면 (준비중)')), // 2: 일기
    const Center(child: Text('채팅 화면 (준비중)')), // 3: 채팅
    const MyPageScreen(), // 4: 마이페이지
  ];

  @override
  void initState() {
    super.initState();
    _selectedIndex = widget.initialIndex;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // 선택된 인덱스에 맞춰 body 부분만 스르륵 교체됩니다.
      body: _pages[_selectedIndex],
      
      // 하단바는 이 RootScreen에 딱 한 번만 정의합니다.
      bottomNavigationBar: Theme(
        data: Theme.of(context).copyWith(
          splashColor: Colors.transparent,
          highlightColor: Colors.transparent,
        ),
        child: BottomNavigationBar(
          backgroundColor: const Color(0xFF1A1A24),
          type: BottomNavigationBarType.fixed,
          currentIndex: _selectedIndex,
          selectedItemColor: pinkAccent,
          unselectedItemColor: Colors.grey,
          selectedFontSize: 12,
          unselectedFontSize: 12,
          onTap: (index) {
            setState(() {
              _selectedIndex = index;
            });
          },
          items: [
            _buildBottomNavItem('매칭', Icons.local_fire_department, 0),
            _buildBottomNavItem('커뮤니티', Icons.language, 1),
            _buildBottomNavItem('일기', Icons.menu_book, 2),
            _buildBottomNavItem('채팅', Icons.chat_bubble_outline, 3),
            _buildBottomNavItem('MY', Icons.person_outline, 4),
          ],
        ),
      ),
    );
  }

  BottomNavigationBarItem _buildBottomNavItem(String label, IconData icon, int index) {
    bool isSelected = _selectedIndex == index;
    return BottomNavigationBarItem(
      icon: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: isSelected ? pinkAccent.withOpacity(0.15) : Colors.transparent,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Icon(icon),
      ),
      label: label,
    );
  }
}

// ============================================================================
// 🔥 매칭 홈 화면 (알맹이 1번) - 하단바 코드를 모두 제거했습니다!
// ============================================================================
//프로필 데이터를 담아둘 모델
class Profile {
  final int id;
  final String nickname;
  final int age;
  final String bio;
  final String? photoUrl;

  Profile({
    required this.id,
    required this.nickname,
    required this.age,
    required this.bio,
    this.photoUrl,
  });

  factory Profile.fromJson(Map<String, dynamic> json) {
    return Profile(
      id: json['id'],
      nickname: json['nickname'],
      age: json['age'] ?? 20,
      bio: json['bio'] ?? '',
      photoUrl: json['photo_url'],
    );
  }
}

class DatingHomeScreen extends StatefulWidget {
  const DatingHomeScreen({super.key});

  @override
  State<DatingHomeScreen> createState() => _DatingHomeScreenState();
}

class _DatingHomeScreenState extends State<DatingHomeScreen> {
  final CardSwiperController controller = CardSwiperController();
  List<Profile> profiles = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchProfiles();
  }

  Future<void> fetchProfiles() async {
    try {
      final response = await http.get(Uri.parse('http://localhost:3000/api/profiles'));
      if (response.statusCode == 200) {
        final body = json.decode(response.body);
        final List<dynamic> data = body['data'];
        setState(() {
          profiles = data.map((json) => Profile.fromJson(json)).toList();
          isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        profiles = [
          Profile(id: 1, nickname: '테스터1', age: 25, bio: '안녕! 프론트엔드 테스트 중이야', photoUrl: 'https://picsum.photos/400/600'),
          Profile(id: 2, nickname: '테스터2', age: 28, bio: '왼쪽 오른쪽 스와이프 해봐!', photoUrl: 'https://picsum.photos/400/601'),
        ];
        isLoading = false;
      });
    }
  }

  Future<void> handleSwipe(int targetUserId, String action) async {
    try {
      await http.post(
        Uri.parse('http://localhost:3000/api/swipe'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'sender_id': 1, 'receiver_id': targetUserId, 'action': action}),
      );
    } catch (e) {
      print('서버 통신 실패 (프론트 UI만 동작 중입니다)');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Row(
          children: [
            Icon(Icons.auto_awesome, color: Color(0xFFFF4B93), size: 24),
            SizedBox(width: 4),
            Text('SPARK', style: TextStyle(color: Color(0xFFFF4B93), fontSize: 22, fontWeight: FontWeight.w900, letterSpacing: 1.2)),
          ],
        ),
        actions: [
          _buildTopIcon(Icons.notifications_none),
          const SizedBox(width: 8),
          _buildTopIcon(Icons.tune),
          const SizedBox(width: 16),
        ],
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator(color: Color(0xFFFF4B93)))
          : profiles.isEmpty 
              ? const Center(child: Text('더 이상 추천할 프로필이 없습니다.'))
              : SafeArea(
                  child: Padding(
                    padding: const EdgeInsets.all(20.0), 
                    child: CardSwiper(
                      controller: controller,
                      cardsCount: profiles.length,
                      onSwipe: (previousIndex, currentIndex, direction) {
                        final swipedProfile = profiles[previousIndex];
                        final action = direction == CardSwiperDirection.right ? 'LIKE' : 'DISLIKE';
                        handleSwipe(swipedProfile.id, action);
                        return true;
                      },
                      cardBuilder: (context, index, percentX, percentY) {
                        return _buildSparkCard(profiles[index]);
                      },
                    ),
                  ),
                ),
      // 💡 [핵심] 기존에 있던 bottomNavigationBar 코드는 모두 지웠습니다! RootScreen이 대신 해줍니다.
    );
  }

  Widget _buildTopIcon(IconData icon) {
    return Container(
      width: 40, height: 40,
      decoration: BoxDecoration(color: const Color(0xFF22222E), borderRadius: BorderRadius.circular(12)),
      child: Icon(icon, color: Colors.white, size: 22),
    );
  }

  Widget _buildSparkCard(Profile profile) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        boxShadow: const [BoxShadow(color: Colors.black45, blurRadius: 10, offset: Offset(0, 5))],
      ),
      clipBehavior: Clip.antiAlias,
      child: Stack(
        fit: StackFit.expand,
        children: [
          profile.photoUrl != null
              ? Image.network(profile.photoUrl!, fit: BoxFit.cover)
              : Container(
                  decoration: const BoxDecoration(gradient: LinearGradient(colors: [Color(0xFF4AC2F5), Color(0xFF00C6B8)], begin: Alignment.topCenter, end: Alignment.bottomCenter)),
                  child: const Center(child: Icon(Icons.person, size: 120, color: Colors.black12)),
                ),
          Positioned(
            bottom: 0, left: 0, right: 0, height: 250,
            child: Container(
              decoration: BoxDecoration(gradient: LinearGradient(colors: [Colors.transparent, Colors.black.withOpacity(0.9)], begin: Alignment.topCenter, end: Alignment.bottomCenter)),
            ),
          ),
          Positioned(
            bottom: 24, left: 24, right: 24,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text('${profile.nickname} ${profile.age}', style: const TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold)),
                    const SizedBox(width: 8),
                    const Icon(Icons.verified, color: Colors.lightBlueAccent, size: 24),
                  ],
                ),
                const SizedBox(height: 8),
                const Row(
                  children: [
                    Icon(Icons.coffee, color: Colors.white70, size: 16),
                    SizedBox(width: 6),
                    Text('바리스타 · 서울 노원구', style: TextStyle(color: Colors.white70, fontSize: 14)),
                  ],
                ),
                const SizedBox(height: 12),
                Text(profile.bio, style: const TextStyle(color: Colors.white, fontSize: 15), maxLines: 2, overflow: TextOverflow.ellipsis),
                const SizedBox(height: 16),
                Row(
                  children: [
                    _buildInterestChip('☕ 카페'),
                    const SizedBox(width: 8),
                    _buildInterestChip('🎬 영화'),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInterestChip(String text) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(20)),
      child: Text(text, style: const TextStyle(color: Colors.white, fontSize: 13)),
    );
  }
}
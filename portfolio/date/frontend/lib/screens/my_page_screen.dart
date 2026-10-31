import 'package:flutter/material.dart';

import 'dart:convert';

import 'package:http/http.dart' as http;

// 앱 전체에서 공통으로 쓸 테마 색상들
const Color bgColor = Color(0xFF12121A);
const Color cardColor = Color(0xFF22222E);
const Color pinkAccent = Color(0xFFFF4B93);
const Color purpleAccent = Color(0xFFB635F7);
const Color subTextColor = Color(0xFFA0A0B0);
const Color goldColor = Color(0xFFFFD700);

// ==========================================
// 1. 프로필 편집 화면
// ==========================================
class ProfileEditScreen extends StatefulWidget {
  final Map<String, dynamic>? userData;
  const ProfileEditScreen({super.key, this.userData});

  @override
  State<ProfileEditScreen> createState() => _ProfileEditScreenState();
}

class _ProfileEditScreenState extends State<ProfileEditScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _animController;
  late final Animation<double> _slideAnim;
  late final Animation<double> _fadeAnim;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    );
    _slideAnim = Tween<double>(
      begin: -30.0,
      end: 0.0,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeOut));
    _fadeAnim = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeIn));
    _animController.forward();
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
        backgroundColor: bgColor,
        title: const Text('프로필 편집', style: TextStyle(color: Colors.white)),
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: AnimatedBuilder(
        animation: _animController,
        builder: (context, child) {
          return Transform.translate(
            offset: Offset(0, _slideAnim.value),
            child: Opacity(opacity: _fadeAnim.value, child: child),
          );
        },
        child: Center(
          child: Text(
            '${widget.userData?['nickname'] ?? '유저'}님의 프로필을 수정합니다',
            style: const TextStyle(color: Colors.white, fontSize: 16),
          ),
        ),
      ),
    );
  }
}

// ==========================================
// 2. 사진 관리 화면
// ==========================================
class PhotoManagementScreen extends StatefulWidget {
  const PhotoManagementScreen({super.key});

  @override
  State<PhotoManagementScreen> createState() => _PhotoManagementScreenState();
}

class _PhotoManagementScreenState extends State<PhotoManagementScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _animController;
  late final Animation<double> _slideAnim;
  late final Animation<double> _fadeAnim;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    );
    _slideAnim = Tween<double>(
      begin: -30.0,
      end: 0.0,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeOut));
    _fadeAnim = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeIn));
    _animController.forward();
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
        backgroundColor: bgColor,
        title: const Text('사진 관리', style: TextStyle(color: Colors.white)),
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: AnimatedBuilder(
        animation: _animController,
        builder: (context, child) {
          return Transform.translate(
            offset: Offset(0, _slideAnim.value),
            child: Opacity(opacity: _fadeAnim.value, child: child),
          );
        },
        child: GridView.builder(
          padding: const EdgeInsets.all(16),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            crossAxisSpacing: 10,
            mainAxisSpacing: 10,
          ),
          itemCount: 6,
          itemBuilder: (context, index) {
            return Container(
              decoration: BoxDecoration(
                color: cardColor,
                borderRadius: BorderRadius.circular(12),
              ),
              child: index == 0
                  ? const Icon(Icons.add_a_photo, color: pinkAccent, size: 40)
                  : const Icon(Icons.person, color: subTextColor, size: 40),
            );
          },
        ),
      ),
    );
  }
}

// ==========================================
// 3. 매칭 설정 화면
// ==========================================
class MatchingSettingsScreen extends StatefulWidget {
  const MatchingSettingsScreen({super.key});

  @override
  State<MatchingSettingsScreen> createState() => _MatchingSettingsScreenState();
}

class _MatchingSettingsScreenState extends State<MatchingSettingsScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _animController;
  late final Animation<double> _slideAnim;
  late final Animation<double> _fadeAnim;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    );
    _slideAnim = Tween<double>(
      begin: -30.0,
      end: 0.0,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeOut));
    _fadeAnim = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeIn));
    _animController.forward();
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
        backgroundColor: bgColor,
        title: const Text('매칭 설정', style: TextStyle(color: Colors.white)),
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: AnimatedBuilder(
        animation: _animController,
        builder: (context, child) => Transform.translate(
          offset: Offset(0, _slideAnim.value),
          child: Opacity(opacity: _fadeAnim.value, child: child),
        ),
        child: const Center(
          child: Text(
            '매칭 조건(나이, 거리 등)을 설정하는 화면입니다.',
            style: TextStyle(color: Colors.white),
          ),
        ),
      ),
    );
  }
}

// ==========================================
// 4. 매칭 내역 화면
// ==========================================
class MatchingHistoryScreen extends StatefulWidget {
  const MatchingHistoryScreen({super.key});

  @override
  State<MatchingHistoryScreen> createState() => _MatchingHistoryScreenState();
}

class _MatchingHistoryScreenState extends State<MatchingHistoryScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _animController;
  late final Animation<double> _slideAnim;
  late final Animation<double> _fadeAnim;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    );
    _slideAnim = Tween<double>(
      begin: -30.0,
      end: 0.0,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeOut));
    _fadeAnim = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeIn));
    _animController.forward();
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
        backgroundColor: bgColor,
        title: const Text('매칭 내역', style: TextStyle(color: Colors.white)),
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: AnimatedBuilder(
        animation: _animController,
        builder: (context, child) => Transform.translate(
          offset: Offset(0, _slideAnim.value),
          child: Opacity(opacity: _fadeAnim.value, child: child),
        ),
        child: ListView.separated(
          padding: const EdgeInsets.all(16),
          itemCount: 3,
          separatorBuilder: (_, __) => const Divider(color: cardColor),
          itemBuilder: (context, index) => ListTile(
            leading: const CircleAvatar(
              backgroundColor: pinkAccent,
              child: Icon(Icons.favorite, color: Colors.white, size: 16),
            ),
            title: const Text(
              '수연님과 매칭 성사',
              style: TextStyle(color: Colors.white),
            ),
            subtitle: Text(
              '2026.09.1${4 + index}',
              style: const TextStyle(color: subTextColor),
            ),
          ),
        ),
      ),
    );
  }
}

// ==========================================
// 5. 일기 내역 화면
// ==========================================
class DiaryHistoryScreen extends StatefulWidget {
  const DiaryHistoryScreen({super.key});

  @override
  State<DiaryHistoryScreen> createState() => _DiaryHistoryScreenState();
}

class _DiaryHistoryScreenState extends State<DiaryHistoryScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _animController;
  late final Animation<double> _slideAnim;
  late final Animation<double> _fadeAnim;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    );
    _slideAnim = Tween<double>(
      begin: -30.0,
      end: 0.0,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeOut));
    _fadeAnim = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeIn));
    _animController.forward();
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
        backgroundColor: bgColor,
        title: const Text('나의 일기', style: TextStyle(color: Colors.white)),
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: AnimatedBuilder(
        animation: _animController,
        builder: (context, child) => Transform.translate(
          offset: Offset(0, _slideAnim.value),
          child: Opacity(opacity: _fadeAnim.value, child: child),
        ),
        child: ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: 4,
          itemBuilder: (context, index) => Card(
            color: cardColor,
            child: ListTile(
              title: const Text(
                '오늘 한강 산책 좋았다',
                style: TextStyle(color: Colors.white),
              ),
              subtitle: Text(
                '2026.09.10',
                style: const TextStyle(color: subTextColor),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

// ==========================================
// 6. 프라이버시 설정 화면
// ==========================================
class PrivacyScreen extends StatefulWidget {
  const PrivacyScreen({super.key});
  @override
  State<PrivacyScreen> createState() => _PrivacyScreenState();
}

class _PrivacyScreenState extends State<PrivacyScreen>
    with SingleTickerProviderStateMixin {
  bool _isLocationEnabled = true;
  late final AnimationController _animController;
  late final Animation<double> _slideAnim;
  late final Animation<double> _fadeAnim;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    );
    _slideAnim = Tween<double>(
      begin: -30.0,
      end: 0.0,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeOut));
    _fadeAnim = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeIn));
    _animController.forward();
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
        backgroundColor: bgColor,
        title: const Text('프라이버시 설정', style: TextStyle(color: Colors.white)),
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: AnimatedBuilder(
        animation: _animController,
        builder: (context, child) => Transform.translate(
          offset: Offset(0, _slideAnim.value),
          child: Opacity(opacity: _fadeAnim.value, child: child),
        ),
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            SwitchListTile(
              title: const Text(
                '위치 기반 서비스 켜기',
                style: TextStyle(color: Colors.white),
              ),
              subtitle: const Text(
                '끄면 주변 사람들에게 내 위치가 노출되지 않습니다.',
                style: TextStyle(color: subTextColor, fontSize: 12),
              ),
              activeColor: pinkAccent,
              value: _isLocationEnabled,
              onChanged: (bool value) {
                setState(() => _isLocationEnabled = value);
              },
            ),
          ],
        ),
      ),
    );
  }
}

// ==========================================
// 7. 결제 내역 화면
// ==========================================
class PaymentHistoryScreen extends StatefulWidget {
  const PaymentHistoryScreen({super.key});

  @override
  State<PaymentHistoryScreen> createState() => _PaymentHistoryScreenState();
}

class _PaymentHistoryScreenState extends State<PaymentHistoryScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _animController;
  late final Animation<double> _slideAnim;
  late final Animation<double> _fadeAnim;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    );
    _slideAnim = Tween<double>(
      begin: -30.0,
      end: 0.0,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeOut));
    _fadeAnim = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeIn));
    _animController.forward();
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
        backgroundColor: bgColor,
        title: const Text('결제 내역', style: TextStyle(color: Colors.white)),
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: AnimatedBuilder(
        animation: _animController,
        builder: (context, child) => Transform.translate(
          offset: Offset(0, _slideAnim.value),
          child: Opacity(opacity: _fadeAnim.value, child: child),
        ),
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: const [
            ListTile(
              title: Text(
                '포인트 10,000 충전',
                style: TextStyle(color: Colors.white),
              ),
              subtitle: Text(
                '2026.09.12',
                style: TextStyle(color: subTextColor),
              ),
              trailing: Text(
                '+10,000 P',
                style: TextStyle(color: goldColor, fontWeight: FontWeight.bold),
              ),
            ),
            Divider(color: cardColor),
            ListTile(
              title: Text('매칭 수락 차감', style: TextStyle(color: Colors.white)),
              subtitle: Text(
                '2026.09.13',
                style: TextStyle(color: subTextColor),
              ),
              trailing: Text(
                '-500 P',
                style: TextStyle(
                  color: pinkAccent,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ==========================================
// 메인 마이페이지 화면
// ==========================================
class MyPageScreen extends StatefulWidget {
  const MyPageScreen({super.key});

  @override
  State<MyPageScreen> createState() => _MyPageScreenState();
}

class _MyPageScreenState extends State<MyPageScreen>
    with SingleTickerProviderStateMixin {
  Map<String, dynamic>? userData;
  bool isLoading = true;
  String errorMessage = '';

  // 메인 마이페이지 슬라이드 다운 애니메이션 제어
  late final AnimationController _animController;
  late final Animation<double> _slideAnim;
  late final Animation<double> _fadeAnim;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    );
    _slideAnim = Tween<double>(
      begin: -30.0,
      end: 0.0,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeOut));
    _fadeAnim = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeIn));
    _animController.forward();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _askLocationPermission();
    });
    _fetchMyPageData();
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  Future<void> _fetchMyPageData() async {
    try {
      final response = await http.get(
        Uri.parse('http://localhost:3000/api/mypage/1'),
      );
      if (response.statusCode == 200) {
        setState(() {
          userData = jsonDecode(response.body);
          isLoading = false;
        });
      } else {
        setState(() {
          errorMessage = '데이터를 불러오는데 실패했습니다.(상태코드:${response.statusCode})';
          isLoading = false;
        });
      }
    } catch (e) {
      print("서버 통신 실패: $e");
      setState(() {
        userData = {
          'nickname': '지은(오프라인)',
          'age': 24,
          'address': '서울 노원구',
          'bio': '서버가 꺼져있어 임시 데이터를 보여줍니다.',
          'points': 5000,
          'status': 'ACTIVE',
        };
        isLoading = false;
      });
    }
  }

  void _askLocationPermission() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: cardColor,
        title: const Text(
          '위치권한 허용',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        content: const Text(
          '위치 정보가 필요합니다. 위치기반 설정을 켜시겠습니까?',
          style: TextStyle(color: subTextColor),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('나중에', style: TextStyle(color: subTextColor)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: pinkAccent),
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text('설정하기', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  void _showPasswordCheckDialog() {
    TextEditingController pwController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: cardColor,
        title: const Text('비밀번호 확인', style: TextStyle(color: Colors.white)),
        content: TextField(
          controller: pwController,
          obscureText: true,
          style: const TextStyle(color: Colors.white),
          decoration: InputDecoration(
            hintText: '비밀번호를 입력하세요',
            hintStyle: const TextStyle(color: subTextColor),
            enabledBorder: const UnderlineInputBorder(
              borderSide: BorderSide(color: subTextColor),
            ),
            focusedBorder: const UnderlineInputBorder(
              borderSide: BorderSide(color: pinkAccent),
            ),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('취소', style: TextStyle(color: subTextColor)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: pinkAccent),
            onPressed: () {
              Navigator.pop(context);
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ProfileEditScreen(userData: userData),
                ),
              );
            },
            child: const Text('확인', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  void _showUpgradeDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: cardColor,
        title: const Text(
          '프리미엄 업그레이드 👑',
          style: TextStyle(color: goldColor, fontWeight: FontWeight.bold),
        ),
        content: const Text(
          '무제한 혜택을 누리시겠습니까?\n매월 50,000원이 정기 결제됩니다.',
          style: TextStyle(color: Colors.white),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('취소', style: TextStyle(color: subTextColor)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: goldColor),
            onPressed: () {
              print("5만원 결제 승인 요청");
              Navigator.pop(context);
            },
            child: const Text(
              '결제하기',
              style: TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showPointChargeDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: cardColor,
        title: const Text(
          '포인트 충전 💎',
          style: TextStyle(color: goldColor, fontWeight: FontWeight.bold),
        ),
        content: const Text(
          '매칭을 수락하려면 포인트가 필요합니다.\n10,000 P 를 충전하시겠습니까?',
          style: TextStyle(color: Colors.white),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('취소', style: TextStyle(color: subTextColor)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: pinkAccent),
            onPressed: () {
              print("포인트 충전 결제 요청");
              Navigator.pop(context);
            },
            child: const Text('충전하기', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 480),
          child: Scaffold(
            backgroundColor: bgColor,
            appBar: AppBar(
              backgroundColor: bgColor,
              elevation: 0,
              title: const Text(
                '마이페이지',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
            body: AnimatedBuilder(
              animation: _animController,
              builder: (context, child) {
                return Transform.translate(
                  offset: Offset(0, _slideAnim.value),
                  child: Opacity(opacity: _fadeAnim.value, child: child),
                );
              },
              child: isLoading
                  ? const Center(
                      child: CircularProgressIndicator(color: pinkAccent),
                    )
                  : errorMessage.isNotEmpty
                  ? Center(
                      child: Text(
                        errorMessage,
                        style: const TextStyle(color: Colors.redAccent),
                      ),
                    )
                  : SingleChildScrollView(
                      padding: const EdgeInsets.all(20.0),
                      child: Column(
                        children: [
                          _buildProfileCard(),
                          const SizedBox(height: 24),
                          _buildPremiumBanner(),
                          const SizedBox(height: 24),
                          _buildMenuList(),
                          const SizedBox(height: 40),
                        ],
                      ),
                    ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildProfileCard() {
    return Container(
      decoration: BoxDecoration(
        color: cardColor,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.2),
            blurRadius: 10,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: Column(
        children: [
          Stack(
            alignment: Alignment.bottomCenter,
            children: [
              Container(
                height: 100,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [purpleAccent.withValues(alpha: .4), cardColor],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                  borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(24),
                    topRight: Radius.circular(24),
                  ),
                ),
              ),
              Positioned(
                bottom: 0,
                child: Stack(
                  children: [
                    GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const PhotoManagementScreen(),
                          ),
                        );
                      },
                      child: Container(
                        width: 80,
                        height: 80,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: pinkAccent, width: 2),
                          color: Colors.pink[100],
                        ),
                        child: const Center(
                          child: Text('🌸', style: TextStyle(fontSize: 40)),
                        ),
                      ),
                    ),
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: Container(
                        width: 20,
                        height: 20,
                        decoration: BoxDecoration(
                          color: Colors.greenAccent,
                          shape: BoxShape.circle,
                          border: Border.all(color: cardColor, width: 3),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                '${userData?['nickname'] ?? '이름없음'}',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(width: 6),
              const Icon(
                Icons.verified,
                color: Colors.lightBlueAccent,
                size: 20,
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            '${userData?['age'] ?? 0}세 ${userData?['address'] ?? '위치 미설정'}',
            style: TextStyle(color: subTextColor, fontSize: 14),
          ),
          const SizedBox(height: 12),
          Text(
            '${userData?['bio'] ?? '자기소개를 입력해 주세요'}',
            style: TextStyle(color: subTextColor, fontSize: 13),
          ),
          const SizedBox(height: 24),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildStatItem(
                '${userData?['points'] ?? 0} P',
                '보유 포인트',
                isPoint: true,
                onTap: _showPointChargeDialog,
              ),
              _buildVerticalDivider(),
              _buildStatItem(
                '매칭 내역',
                '이동하기',
                isPoint: false,
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const MatchingHistoryScreen(),
                    ),
                  );
                },
              ),
            ],
          ),
          const SizedBox(height: 24),
          OutlinedButton(
            style: OutlinedButton.styleFrom(
              side: BorderSide(color: subTextColor.withValues(alpha: .3)),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 12),
            ),
            onPressed: _showPasswordCheckDialog,
            child: const Text(
              '프로필 편집',
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _buildPremiumBanner() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: cardColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: goldColor.withValues(alpha: .3), width: 1),
      ),
      child: Row(
        children: [
          const Text('👑', style: TextStyle(fontSize: 32)),
          const SizedBox(width: 16),
          const Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'SPARK Premium',
                  style: TextStyle(
                    color: goldColor,
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 4),
                Text(
                  '무제한 좋아요 슈퍼 좋아요 확인',
                  style: TextStyle(color: subTextColor, fontSize: 12),
                ),
              ],
            ),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: goldColor,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
            ),
            onPressed: _showUpgradeDialog,
            child: const Text(
              '업그레이드',
              style: TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMenuList() {
    return Container(
      decoration: BoxDecoration(
        color: cardColor,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          _buildMenuTile(
            icon: '📸',
            title: '사진 관리',
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const PhotoManagementScreen(),
              ),
            ),
          ),
          _buildMenuDivider(),
          _buildMenuTile(
            icon: '📝',
            title: '나의 일기',
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const DiaryHistoryScreen(),
              ),
            ),
          ),
          _buildMenuDivider(),
          _buildMenuTile(
            icon: '⚙️',
            title: '매칭 설정',
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const MatchingSettingsScreen(),
              ),
            ),
          ),
          _buildMenuDivider(),
          _buildMenuTile(
            icon: '🔒',
            title: '개인정보 보호',
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const PrivacyScreen()),
            ),
          ),
          _buildMenuDivider(),
          _buildMenuTile(
            icon: '💳',
            title: '결제 내역',
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => const PaymentHistoryScreen(),
              ),
            ),
          ),
          _buildMenuDivider(),
          ListTile(
            leading: const Text('🚪', style: TextStyle(fontSize: 20)),
            title: const Text(
              '로그아웃',
              style: TextStyle(
                color: Colors.redAccent,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            trailing: const Icon(Icons.chevron_right, color: Colors.white24),
            onTap: () {
              print("로그아웃 처리");
            },
          ),
        ],
      ),
    );
  }

  Widget _buildStatItem(
    String number,
    String label, {
    bool isPoint = false,
    VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        color: Colors.transparent,
        child: Column(
          children: [
            Text(
              number,
              style: TextStyle(
                color: isPoint ? goldColor : Colors.white,
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: const TextStyle(color: subTextColor, fontSize: 12),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildVerticalDivider() {
    return Container(
      height: 30,
      width: 1,
      color: subTextColor.withValues(alpha: 0.2),
    );
  }

  Widget _buildMenuTile({
    required String icon,
    required String title,
    required VoidCallback onTap,
  }) {
    return ListTile(
      leading: Text(icon, style: const TextStyle(fontSize: 20)),
      title: Text(
        title,
        style: const TextStyle(color: Colors.white, fontSize: 16),
      ),
      trailing: const Icon(Icons.chevron_right, color: Colors.white24),
      onTap: onTap,
    );
  }

  Widget _buildMenuDivider() {
    return const Divider(color: bgColor, thickness: 2, height: 2);
  }
}

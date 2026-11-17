import 'package:flutter/material.dart';

class PendingApprovalScreen extends StatefulWidget {
  const PendingApprovalScreen({super.key});

  @override
  State<PendingApprovalScreen> createState() => _PendingApprovalScreenState();
}

class _PendingApprovalScreenState extends State<PendingApprovalScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _slideAnimation;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    // 2초마다 물방울 애니메이션 무한 반복
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(); 

    // 물방울이 아래(100)에서 위(-100)로 올라가는 움직임
    _slideAnimation = Tween<double>(begin: 100.0, end: -100.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );

    // 위로 올라갈수록 투명해지며 사라지는 효과 (0.5 ~ 1.0 구간)
    _fadeAnimation = Tween<double>(begin: 1.0, end: 0.0).animate(
      CurvedAnimation(parent: _controller, curve: const Interval(0.5, 1.0)), 
    );
  }

  @override
  void dispose() {
    _controller.dispose(); // 화면이 꺼질 때 애니메이션도 정리
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black, // PC 환경 좌우 배경색
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 480),
          child: Scaffold(
            backgroundColor: const Color(0xFF12121A),
            body: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // 💧 물방울 애니메이션 영역
                  SizedBox(
                    height: 150,
                    child: AnimatedBuilder(
                      animation: _controller,
                      builder: (context, child) {
                        return Stack(
                          alignment: Alignment.center,
                          children: [
                            // 첫 번째 큰 물방울
                            Transform.translate(
                              offset: Offset(-20, _slideAnimation.value),
                              child: Opacity(
                                opacity: _fadeAnimation.value,
                                child: const Icon(
                                  Icons.water_drop,
                                  color: Color(0xFF00C6FF),
                                  size: 48,
                                ),
                              ),
                            ),
                            // 두 번째 작은 물방울 (조금 다르게 움직이게 오프셋 조정)
                            Transform.translate(
                              offset: Offset(30, _slideAnimation.value + 40),
                              child: Opacity(
                                opacity: _fadeAnimation.value,
                                child: const Icon(
                                  Icons.water_drop,
                                  color: Color(0xFF0072FF),
                                  size: 28,
                                ),
                              ),
                            ),
                          ],
                        );
                      },
                    ),
                  ),
                  const SizedBox(height: 32),
                  const Text(
                    '수질 검사 진행 중 🫧',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 26,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    '꼼꼼하게 프로필을 심사하고 있습니다.\n가입 승인까지 조금만 기다려주세요!',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Color(0xFFA0A0B0),
                      fontSize: 15,
                      height: 1.6,
                    ),
                  ),
                  const SizedBox(height: 48),
                  // 첫 화면으로 돌아가기 버튼
                  OutlinedButton(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    style: OutlinedButton.styleFrom(
                      foregroundColor: const Color(0xFFFF4B93),
                      side: const BorderSide(color: Color(0xFFFF4B93), width: 1.5),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                      padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                    ),
                    child: const Text(
                      '로그인 화면으로 돌아가기',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
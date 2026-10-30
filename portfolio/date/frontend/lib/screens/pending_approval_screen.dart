import 'package:flutter/material.dart';
import 'dart:math' as math;

class PendingApprovalScreen extends StatefulWidget {
  const PendingApprovalScreen({super.key});

  @override
  State<PendingApprovalScreen> createState() => _PendingApprovalScreenState();
}

class _PendingApprovalScreenState extends State<PendingApprovalScreen>
    with TickerProviderStateMixin {
  late AnimationController _controller;
  late AnimationController _waveController;

  // 꺾쇠 충돌 방지를 위해 타입 추론 활용
  final _bubbles = [];

  // 테마 핑크톤 컬러 정의
  final Color pinkAccent = const Color(0xFFFF4B93);
  final Color purpleAccent = const Color(0xFFB635F7);
  final Color subTextColor = const Color(0xFFFF99C8);

  @override
  void initState() {
    super.initState();
    // 1) 물방울 애니메이션 컨트롤러 (무한 반복)
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 4),
    )..repeat();

    // 2) 바텀 물결 출렁임 애니메이션 컨트롤러 (무한 반복)
    _waveController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
    )..repeat();

    // 3) 배경에 떠다닐 물방울 데이터 생성 (25개)
    final random = math.Random();
    for (int i = 0; i < 25; i++) {
      _bubbles.add({
        'x': random.nextDouble(),
        'startY': random.nextDouble(),
        'size': random.nextDouble() * 14 + 6,
        'speed': random.nextDouble() * 0.6 + 0.4,
      });
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    _waveController.dispose();
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
            body: Stack(
              children: [
                // 🫧 배경 물방울(거품) 애니메이션
                AnimatedBuilder(
                  animation: _controller,
                  builder: (context, child) {
                    return Stack(
                      children: _bubbles.map((bubble) {
                        double progress = (_controller.value * bubble['speed']! + bubble['startY']!) % 1.0;
                        double yPos = MediaQuery.of(context).size.height * (1.0 - progress);
                        double xPos = bubble['x']! * MediaQuery.of(context).size.width;

                        double opacity = math.sin(progress * math.pi);

                        return Positioned(
                          top: yPos,
                          left: xPos,
                          child: Opacity(
                            opacity: opacity.clamp(0.0, 0.7),
                            child: Container(
                              width: bubble['size'],
                              height: bubble['size'],
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                gradient: RadialGradient(
                                  colors: [
                                    Colors.white.withOpacity(0.9),
                                    pinkAccent.withOpacity(0.5),
                                  ],
                                  center: const Alignment(-0.3, -0.3),
                                ),
                                boxShadow: [
                                  BoxShadow(
                                    color: pinkAccent.withOpacity(0.4),
                                    blurRadius: 6,
                                    spreadRadius: 1,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        );
                      }).toList(),
                    );
                  },
                ),

                // 📱 메인 콘텐츠 영역
                Center(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 24.0),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.water_drop,
                          color: pinkAccent,
                          size: 56,
                        ),
                        const SizedBox(height: 16),
                        ShaderMask(
                          shaderCallback: (bounds) => LinearGradient(
                            colors: [pinkAccent, purpleAccent],
                          ).createShader(bounds),
                          child: const Text(
                            '수질 검사 진행 중 🫧',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 26,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),
                        Text(
                          '꼼꼼하게 프로필을 심사하고 있습니다.\n가입 승인까지 조금만 기다려주세요!',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: subTextColor,
                            fontSize: 15,
                            height: 1.6,
                          ),
                        ),
                        const SizedBox(height: 48),
                        OutlinedButton(
                          onPressed: () {
                            Navigator.pop(context);
                          },
                          style: OutlinedButton.styleFrom(
                            foregroundColor: pinkAccent,
                            side: BorderSide(color: pinkAccent, width: 1.5),
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

                // 🌊 바텀 영역 물결치는 효과
                Positioned(
                  bottom: 0,
                  left: 0,
                  right: 0,
                  child: AnimatedBuilder(
                    animation: _waveController,
                    builder: (context, child) {
                      return ClipPath(
                        clipper: WaveClipper(_waveController.value),
                        child: Container(
                          height: 90,
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              begin: Alignment.topCenter,
                              end: Alignment.bottomCenter,
                              colors: [
                                pinkAccent.withOpacity(0.05),
                                pinkAccent.withOpacity(0.2),
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// 🌊 물결 모양을 그려주는 커스텀 Clipper (getClip 메서드 적용 완료)
class WaveClipper extends CustomClipper<Path> {
  final double progress;
  WaveClipper(this.progress);

  @override
  Path getClip(Size size) {
    var path = Path();
    path.lineTo(0, 25);

    for (double i = 0; i <= size.width; i++) {
      double y = math.sin((i / size.width * 2 * math.pi) + (progress * 2 * math.pi)) * 10 + 25;
      path.lineTo(i, y);
    }

    path.lineTo(size.width, size.height);
    path.lineTo(0, size.height);
    path.close();
    return path;
  }

  @override
  bool shouldReclip(covariant WaveClipper oldClipper) {
    return oldClipper.progress != progress;
  }
}
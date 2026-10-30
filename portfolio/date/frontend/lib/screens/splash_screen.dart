import 'package:flutter/material.dart';
import 'dart:async';
// Future.delayed (타이머) 기능을 쓰기 위해 불러옵니다.

//로딩이 끝나면 넘어갈 로그인 화면을 ..
import 'login_screen.dart';

// 💡 분리한 로고 컴포넌트 임포트
import '../widgets/spark_logo.dart';

// 💡 BgmPlayer 임포트
import '../services/bgm_player.dart';

// 화면에 로딩 바가 차오르는 '애니메이션(상태 변화)'이 있으므로 
//StatefulWidget을 사용합니다.
class SplashScreen extends StatefulWidget{
  const SplashScreen({super.key});
  @override
  State<SplashScreen> createState() => _SplashScreenState();

}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin{ //여기도 물방울..대문에 기존에 with 이하 추가
  // 🎨 [1] 디자인 테마 색상 정의하기
final Color bgColor = const Color(0xFF12121A);
final Color pinkAccent = const Color(0xFFFF4B93);
final Color purpleAccent = const Color(0xFFB635F7);
final Color subTextColor = const Color(0xFFA0A0B0);



  // ⏳ [2] 로딩 바 애니메이션을 위한 상태 변수
  double _loadingProgress = 0.0;
  // 처음에는 로딩 바가 0% (비어있음)

  //추가. 💡 한 글자씩 나타나는 타이핑 애니메이션용 변수
  final String _fullLogoText = "SPARK";
  String _typedLogoText = "";
  int _charIndex = 0;
  Timer? _typingTimer;

  // 💡 [추가] 배경 물방울 상승 애니메이션을 위한 컨트롤러
  late AnimationController _bubbleController;

  @override
  void initState(){
  super.initState();

  BgmPlayer().playBgm();

    //추가
  _typingTimer = Timer.periodic(const Duration(milliseconds: 150), (timer) {
      if (_charIndex < _fullLogoText.length) {
        setState(() {
          _typedLogoText += _fullLogoText[_charIndex];
          _charIndex++;
        });
      } else {
        timer.cancel();
      }
    });

    // 💡 [추가] 물방울이 위로 올라가는 애니메이션 컨트롤러 (3초 무한 반복)
    _bubbleController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
    )..repeat();

    Future.delayed(const Duration(milliseconds:100),(){
      if(mounted){
        setState((){
          _loadingProgress = 1.0;
        });
      }
    });

    // 2. 2.5초 동안 멋진 스플래시 화면을 보여준 뒤, 
    ///로그인 화면으로 자동으로 넘어갑니다.
    Future.delayed(const Duration(milliseconds:2500),(){
      if(mounted){
        /* Navigator.pushReplacement를 쓰면 뒤로가기를 눌러도
        다시 스플래시화면으로 돌아오지 않습니다
        */
        Navigator.pushReplacement(context,
          // 부드럽게 화면이 밝아지며 넘어가는 
          //페이드(Fade) 애니메이션 효과를 줍니다.
          PageRouteBuilder(
            pageBuilder:(context, animation, secondaryAnimation) => const LoginScreen(),
            transitionsBuilder:(context, animation, secondaryAnimation, child){
              return FadeTransition(
                opacity: animation,
                child: child
              );
            },
            transitionDuration: const Duration(milliseconds:800),
            //0.8초 동안 부드럽게 전환
          ),
        );
      }
    });
  }

  //추가
  @override
  void dispose() {
    _typingTimer?.cancel();
    super.dispose();
  }

  //화면을 그리는 메인함수
  @override
  Widget build(BuildContext context){
    return Scaffold(
      backgroundColor:bgColor,
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth:480),
            child:Stack(
            fit: StackFit.expand,//오타
            children:[
              _buildBackgroundGlow(),
              SafeArea(
                child:Column(
           mainAxisAlignment: MainAxisAlignment.center,  
           children:[
            _buildIconBox(), const SizedBox(height: 24),
            _buildLogoText(), const SizedBox(height: 16),
            _buildSubtext(), const SizedBox(height: 48),//오타
            _buildProgressBar(),//오타
           ],           
            ),
          ),
          ],
          ),
        ),
      ),
      ),
);
}

// 🧱 부품: 배경 정중앙에 퍼지는 은은한 빛 효과
Widget _buildBackgroundGlow(){
  return Stack(//
    fit: StackFit.expand,
    children:[
      //기존 배경 및 효과
      Center(
    child:Container(
      width:MediaQuery.of(context).size.width,
      height:MediaQuery.of(context).size.width,
      decoration:BoxDecoration(
        shape: BoxShape.circle,
        gradient: RadialGradient(
          colors:[
            purpleAccent.withValues(alpha: 0.15),
            // 중앙은 보라색 빛 (투명도 15%)
            bgColor.withValues(alpha: 0.0),
          ],
          stops:const [0.2, 1.0],
          // 빛이 퍼지는 영역 설정
        ),
      ),
    ),
  ), 
  //💡 [추가] 아래에서 위로 올라가는 물방울들 (투명도 조절 적용)
  AnimatedBuilder(
          animation: _bubbleController,
          builder: (context, child) {
            return Stack(
              children: [
                _buildBubble(left: 60, size: 12, delay: 0.0),
                _buildBubble(left: 150, size: 8, delay: 0.3),
                _buildBubble(left: 280, size: 16, delay: 0.6),
                _buildBubble(left: 360, size: 10, delay: 0.2),
                _buildBubble(left: 210, size: 14, delay: 0.7),
              ],
            );
          },
  ),
    ],
  );
}

// 🧱 부품: 네모난 박스 배경과 테두리를 완전히 제거하고 번개 아이콘만 깔끔하게 출력
  Widget _buildIconBox(){
    return Center(
      child: ShaderMask(
        shaderCallback: (bounds) => LinearGradient(
          colors: [pinkAccent, purpleAccent],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ).createShader(bounds),
        child: const Icon(
          Icons.bolt,
          size: 56, // 박스가 사라지면서 크기가 작아 보일 수 있어 크기를 살짝 키웠습니다 (원하시면 조절 가능합니다!)
          color: Colors.white,
        ),
      ),
    );
  }


  // 🧱 부품: 반사광과 글래스 느낌이 나는 4배 크기의 파스텔 블루 물방울 위젯
  Widget _buildBubble({required double left, required double size, required double delay}) {
    double progress = (_bubbleController.value + delay) % 1.0;
    double bottomPos = progress * 750; 
    
    double opacity = 0.0;
    if (progress < 0.2) {
      opacity = progress * 5; 
    } else if (progress > 0.7) {
      opacity = (1.0 - progress) * 3.3; 
    } else {
      opacity = 1.0; 
    }

    double scale = 1.0 + 3.0 * (1.0 - (progress - 0.5).abs() * 2.0); 
    double currentSize = size * scale;

    return Positioned(
      left: left,
      bottom: bottomPos,
      child: Opacity(
        opacity: opacity.clamp(0.0, 1.0),
        child: Container(
          width: currentSize,
          height: currentSize,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            // 💡 글래스 느낌을 극대화한 투명 파스텔 블루톤과 입체 광채 효과
            gradient: RadialGradient(
              center: const Alignment(-0.3, -0.3), // 빛이 위쪽에서 비치는 듯한 효과
              colors: [
                const Color(0xFFE1F5FE).withValues(alpha: 0.35), // 물방울 하이라이트 광채
                const Color(0xFF81D4FA).withValues(alpha: 0.12), // 연한 파스텔 하늘색
                const Color(0xFF0288D1).withValues(alpha: 0.05), // 가장자리 어두운 투명감
              ],
              stops: const [0.0, 0.5, 1.0],
            ),
            border: Border.all(
              color: Colors.white.withValues(alpha: 0.35), // 유리 테두리 같은 흰색 반사선
              width: 1.2,
            ),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFF29B6F6).withValues(alpha: 0.2),
                blurRadius: 12,
                spreadRadius: 2,
              ),
            ],
          ),
          // 💡 [추가] 물방울 내부의 영롱한 반사광(하이라이트 점) 구현
          child: Stack(
            children: [
              Positioned(
                top: currentSize * 0.22,
                left: currentSize * 0.25,
                child: Container(
                  width: currentSize * 0.25,
                  height: currentSize * 0.25,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.white.withValues(alpha: 0.65), // 반사광 포인트
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }


// 🧱 부품: SPARK 그라데이션 로고 텍스트
Widget _buildLogoText(){
  return ShaderMask(
    shaderCallback:(bounds) => LinearGradient(
      colors:[pinkAccent, purpleAccent],
      begin:Alignment.centerLeft,
      end:Alignment.centerRight,
    ).createShader(bounds),
    child:Text(
      /*'SPARK',*/
      _typedLogoText, // 💡 한 글자씩 누적되어 출력되는 텍스트
      style:const TextStyle(
        color:Colors.white,
        fontSize:48,
        fontWeight:FontWeight.w900,
        letterSpacing:2.0,
      ),
    ),
  );
}

// 🧱 부품: 로고 밑의 안내 문구
Widget _buildSubtext(){
  return Text(
    '당신의 특별한 인연을 찾아드립니다',
    style:TextStyle(
      color:subTextColor,
      fontSize:15,
      fontWeight:FontWeight.w500,
      letterSpacing:0.5,
    ),
  );
}

// 🧱 부품: 스르륵 차오르는 로딩 바 애니메이션
Widget _buildProgressBar(){
  return Container(
    width:200, height:4,
    decoration:BoxDecoration(
      color:Colors.white.withValues(alpha: 0.1),
      borderRadius:BorderRadius.circular(2),
    ),
    child:Align(
      alignment:Alignment.centerLeft,
      child:AnimatedContainer(
        duration:const Duration(milliseconds:2000),
        width:200 * _loadingProgress,
        decoration:BoxDecoration(
          gradient:LinearGradient(
            colors:[pinkAccent, purpleAccent],
          ),
          borderRadius:BorderRadius.circular(2),
          boxShadow:[
            BoxShadow(
              color:pinkAccent.withValues(alpha: 0.5),
              blurRadius:6,
              offset:const Offset(0,0),
            ),
          ],
        ),
      ),
    ),
  );
}


}//end
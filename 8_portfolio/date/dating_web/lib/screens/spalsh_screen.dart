import 'package:flutter/material.dart';
import 'dart:async';
// Future.delayed (타이머) 기능을 쓰기 위해 불러옵니다.

//로딩이 끝나면 넘어갈 로그인 화면을 ..
import 'login_screen.dart';

// 화면에 로딩 바가 차오르는 '애니메이션(상태 변화)'이 있으므로 
//StatefulWidget을 사용합니다.
class SplashScreen extends Statefulwidget{
  const SplashScreen({super.key});
  @override
  Stste<SplashScreen> createState() => _SplashScreenState();

}

class _SplashScreenState extends State<SplashScreen>{
  // 🎨 [1] 디자인 테마 색상 정의하기
final Color bgColor = const Color(0xFF12121A);
final Color pinkAccent = const Color(0xFFFF4B93);
final Color purpleAccent = const Color(0xFFB635F7);
final Color subTextColor = const Color(0xFFA0A0B0);

  // ⏳ [2] 로딩 바 애니메이션을 위한 상태 변수
  double _loadingProgress = 0.0;
  // 처음에는 로딩 바가 0% (비어있음)

  @override
  void initState(){
super.initState();

    Future.delayed(const Duration(milliseconds:100),(){
      if(mounted){
        setState((){
          _loadingProgress = 1.0;
        })
      }
    });

    // 2. 2.5초 동안 멋진 스플래시 화면을 보여준 뒤, 
    ///로그인 화면으로 자동으로 넘어갑니다.
    Future.delayed(const Duration(milliseconds:2500),(){
      if(mounted){
        /* Navigator.pushReplacement를 쓰면 뒤로가기를 눌러도
        다시 스플래시화면으로 돌아오지 않습니다
        */
        Navigator.pushReplacement(
context,
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

  //화면을 그리는 메인함수
  @override
  Widget build(BuildContext context){
    return Scaffold(
      backgroundColor:bgColor,
      body: Stack(
        fit: Stackfit.expand,
        children:[
          _buildBackgroundGlow(),
          SafeArea(
            child:Column(
 mainAxisAlignment: MainAxisAlignment.center,  
 children:[
  _buildIconBox(), const SizedBox(height: 24),
  _buildLogoText(), const SizedBox(height: 16),
  _buildSubtext(), const Sizedbox(height: 48),
  _buildLoadingBar(),
 ],           
  ),
),
],
),
);
}

// 🧱 부품: 배경 정중앙에 퍼지는 은은한 빛 효과
Widget _buildBackgroundGlow(){
  return Center(
    child:Container(
      width:MediaQuery.of(context).size.width,
      height:MediaQuery.of(context).size.width,
      decoration:BoxDecoration(
        shape: BoxShape.circle,
        gradient: RadialGradient(
          colors:[
            purpleAccent.withOpacity(0.15),
            // 중앙은 보라색 빛 (투명도 15%)
            bgColor.withOpacity(0.0),
          ],
          stops:const [0.2, 1.0],
          // 빛이 퍼지는 영역 설정
        ),
      ),
    ),
  );
}

// 🧱 부품: 유리 느낌(Glassmorphism)의 네모 박스와 물방울 아이콘
Widget _buildIconBox(){
  return Container(
    width:90, height:90,
    decoration:BoxDecoration(
      color:Colors.white.withOpacity(0.03),
      borderRadius:BorderRadius.circular(28),
      border:Border.all(color:Colors.withOpacity(0.08),width:1.5),
    ),
    child:Center(
      // 아이콘에 그라데이션 색상을 입히기 위해 ShaderMask
      child: ShaderMask(
        shaderCallback:(bounds) => LinearGradient(
          colors:[pinkAccent, purpleAccent],
          begin:Alignment.topCenter,
          end:Alignment.bottomCenter,
        ).createShader(bounds),
        child: const Icon(
          Icons.water_drop,
          size:40,
          color:Colors.white,
        )
      )
    )
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
    child:const Text(
      'SPARK',
      style:TextStyle(
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
  return Text();
}

// 🧱 부품: 스르륵 차오르는 로딩 바 애니메이션
Widget _buildProgressBar(){
  return Container();
}


}//end
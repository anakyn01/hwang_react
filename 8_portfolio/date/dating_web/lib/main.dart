import 'package:flutter/material.dart';
//플러터 기본 UI 도구 모음
import 'package:http/http.dart' as http;
//백엔드 통신을 위한 http 패키지 가져오기
import 'dart:convert';
//JSON 데이터를 다루기 위한 변환 도구 가져오기
import 'package:flutter_card_swiper/flutter_card_swiper.dart';

// 앱이 처음 시작될 때 실행되는 메인 함수
void main(){
  runApp(const DatingApp());
  // DatingApp 위젯을 화면에 그림
}

//상태가 변하지 않는 기본 껍데기 위젯
class DatingApp extends StatelessWidget{
// 생성자 (고유 키 지정)
const DatingApp({super.key});

@override
Widget build(BuildContext context){//UI를 그리는 함수
return MaterialApp(//구글의 머티리얼 디자인 기준 앱 시작
title:'Dating Web',
debugShowCheckedModeBanner: false,// 오른쪽 위 'DEBUG' 띠 숨기기
theme:ThemeData(//앱 전체의 기본 디자인(테마) 설정
primarySwatch: Color.pink,
scaffoldBackgroundColor: const Color(0xFFF5F5F7),
),
home:const DatingHomeScreen(),
);
}
}

//프로필 데이터를 담아둘 모델
class Profile {
  final int id;
  final String nickname;
  final int age;
  final String bio;
  final String? photoUrl;

  Profile({//클래스 생성자 (필수 값과 선택 값 지정)
    required this.id,
    required this.nickname,
    required this.age,
    required this.bio,
    this.photoUrl,
  });

  factory Profile.formJson(Map<String, dynamic> json){
    return Profile(
      id: id, nickname: nickname, age: age, bio: bio)
  }
}

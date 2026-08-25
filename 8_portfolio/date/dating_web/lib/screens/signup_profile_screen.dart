import 'package:flutter/material.dart';

// 화면에 글씨를 치거나 버튼을 눌렀을 때 '모양이 변하는'
// 화면을 만들기 위해 StatefulWidget을 사용합니다. (👈 주석 기호 // 추가)
class SignupProfileScreen extends StatefulWidget {
  const SignupProfileScreen({super.key}); // (👈 Key 대문자를 key 소문자로 수정)
  @override
  State<SignupProfileScreen> createState() => _SignupProfileScreenState();
}

// 실제로 화면의 모양을 그리고 상태(데이터)를 저장하는 핵심 공간입니다.
class _SignupProfileScreenState extends State<SignupProfileScreen> {
  /* 디자인 테마 색상 정의하기
    0xFF는 투명도 100%를 의미하고, 뒤의 6자리는 헥스(HEX) 16진수 표기법 색상 코드
    */
  final Color bgColor = const Color(0xFF12121A);
  final Color cardColor = const Color(0xFF22222E);
  final Color borderColor = const Color(0xFF38384A);
  final Color pinkAccent = const Color(0xFFFF4B93);
  final Color purpleAccent = const Color(0xFFB635F7);
  final Color textColor = Colors.white;
  final Color subTextColor = const Color(0xFFA0A0B0);

  // 선택한 데이터를 기억하는 변수들 (상태관리)
  String _selectedGender = '여성';
  final List<String> _selectedInterests = ['카페', '영화', '독서'];

  // 📋 [3] 화면에 뿌려줄 관심사 버튼 데이터 목록
  final List<Map<String, String>> _interestsData = [
    {'icon': '☕', 'label': '카페'},
    {'icon': '🎬', 'label': '영화'},
    {'icon': '🎵', 'label': '음악'},
    {'icon': '📚', 'label': '독서'},
    {'icon': '🏃', 'label': '운동'},
    {'icon': '✈️', 'label': '여행'},
    {'icon': '🍳', 'label': '요리'},
    {'icon': '🎮', 'label': '게임'},
  ];

  //// 📱 [4] 실제로 화면을 그리는 build 함수
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      body: SafeArea(
        // 핸드폰의 노치(카메라 파인 부분)나 하단 바에 UI가 가려지지 않게 보호해줍니다.
        child: Column(
          // 위에서 아래로 위젯(화면 조각)들을 차곡차곡 쌓습니다
          children: [
            _buildTopBar(), // 맨 위에 뒤로가기 버튼과 분홍색 진행률 바를 그립니다.
            Expanded(
              // 남은 화면 공간을 꽉 채우라는 뜻입니다.
              child: SingleChildScrollView(
                // 내용이 길어지면 화면을 위아래로 스크롤(드래그)할 수 있게 해줍니다.
                padding: const EdgeInsets.symmetric(
                  horizontal: 24.0,
                  vertical: 16.0,
                ),
                // 양옆과 위아래에 여백을 줍니다.
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  // 글씨나 박스들을 화면 왼쪽으로 정렬합니다.
                  children: [
                    _buildHeader(),
                    const SizedBox(height: 32),
                    _buildPhotoSection(),
                    const SizedBox(height: 24),
                    _buildNicknameSection(),
                    const SizedBox(height: 24),
                    _buildAgeAndGenderSection(),
                    const SizedBox(height: 24),
                    _buildBioSection(),
                    const SizedBox(height: 24),
                    _buildInterestsSection(),
                    const SizedBox(height: 40),
                    _buildNextButton(),
                    const SizedBox(height: 20),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    ); // (👈 }; 로 잘못 닫혀있던 Scaffold 괄호를 ); 로 수정)
  }

  //// 🧱 부품 1: 상단 앱바 (뒤로가기, 프로그레스 바)
  Widget _buildTopBar() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 16.0),
      child: Row(
        children: [
          // 뒤로가기 동그란 버튼 만들기
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(color: cardColor, shape: BoxShape.circle),
            child: IconButton(
              icon: Icon(Icons.arrow_back, color: textColor, size: 20),
              onPressed: () => Navigator.pop(context),
            ),
          ),
          const SizedBox(width: 16),
          // 진행 상태 표시바
          Expanded(
            child: Stack(
              children: [
                Container(
                  height: 4,
                  decoration: BoxDecoration(
                    color: cardColor,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
                // 그 위에 덮이는 핑크/퍼플 그라데이션 선
                FractionallySizedBox(
                  widthFactor: 0.6,
                  child: Container(
                    height: 4,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [pinkAccent, purpleAccent],
                      ),
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 16),
          // (👈 fontWeight: 파라미터명 누락 수정)
          Text(
            '3 / 5',
            style: TextStyle(
              color: subTextColor,
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  // 🧱 부품 2: 헤더 타이틀 ('나를 소개해요 ✨')
  Widget _buildHeader() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '나를 소개해요',
          style: TextStyle(
            color: textColor,
            fontSize: 26,
            fontWeight: FontWeight.w800,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          '프로필 사진과 기본 정보를 입력해주세요',
          style: TextStyle(color: subTextColor, fontSize: 14),
        ),
      ],
    );
  }

  // 🧱 부품 3: 프로필 사진 3장 등록하는 곳
  Widget _buildPhotoSection() {
    return SizedBox(
      height: 150,
      child: Row(
        children: [
          Expanded(flex: 2, child: _buildMainPhotoBox()),
          // 가장 큰 메인 사진 칸 (비율 2)
          const SizedBox(width: 12),
          Expanded(flex: 1, child: _buildSubPhotoBox()),
          // 서브 사진 칸 1 (비율 1)
          const SizedBox(width: 12),
          Expanded(flex: 1, child: _buildSubPhotoBox()),
          // 서브 사진 칸 2 (비율 1)
        ],
      ),
    );
  }

  // 메인 사진 등록 박스 디자인
  Widget _buildMainPhotoBox() {
    return Container(
      decoration: BoxDecoration(
        color: cardColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: borderColor, width: 1.5),
      ),
      child: Stack(
        alignment: Alignment.center,
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.camera_alt, color: subTextColor, size: 32),
              const SizedBox(height: 8),
              Text(
                '대표 사진',
                style: TextStyle(color: subTextColor, fontSize: 12),
              ),
            ],
          ),
          Positioned(
            bottom: 12,
            left: 12,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                gradient: LinearGradient(colors: [pinkAccent, purpleAccent]),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Text(
                '메인',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ],
      ),
    ); // (👈 에러 방지용 임시 빈 칸)
  }

  //서브 사진 등록 박스 디자인 (간단한 + 모양)
  Widget _buildSubPhotoBox() {
    return Container(
      decoration: BoxDecoration(
        color: cardColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: borderColor, width: 1.5),
      ),
      child: Center(child: Icon(Icons.add, color: subTextColor, size: 28)),
    ); // (👈 에러 방지용 임시 빈 칸)
  }

  // 🧱 부품 4: 닉네임 입력 칸
  Widget _buildNicknameSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle('닉네임'),
        const SizedBox(height: 8),
        _buildTextField(hint: '별빛소나타'),
      ],
    );
  }

  // 🧱 부품 5: 나이와 성별 입력 칸 (한 줄에 나란히 배치)
  Widget _buildAgeAndGenderSection() {
    return Row(
      children: [
        //나이 입력창 (화면 비율 4 차지)
        Expanded(
          flex: 4,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildSectionTitle('나이'),
              const SizedBox(height: 8),
              _buildTextField(hint: '27', isNumber: true),
            ],
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          flex: 6,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildSectionTitle('성별'),
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(child: _buildGenderButton('여성')),
                  const SizedBox(width: 12),
                  Expanded(child: _buildGenderButton('남성')),
                ],
              ),
            ],
          ),
        ),
      ],
    ); // (👈 에러 방지용 임시 빈 칸)
  }

  // 성별 버튼 디자인 및 클릭 시 색상 변경 로직
  Widget _buildGenderButton(String gender) {
    bool isSelected = _selectedGender == gender;
    //현재 내가 선택한 성별인지 확인합니다.
    return GestureDetector(
      // 터치 이벤트를 감지하는 위젯입니다.
      onTap: () {
        setState(() => _selectedGender = gender);
      },
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          color: isSelected ? pinkAccent.withOpacity(0.1) : cardColor,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? pinkAccent : Colors.transparent,
            width: 1.5,
          ),
        ),
        alignment: Alignment.center,
        child: Text(
          gender,
          style: TextStyle(
            color: isSelected ? pinkAccent : subTextColor,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
            fontSize: 16,
          ),
        ),
      ),
    ); // (👈 에러 방지용 임시 빈 칸)
  }

  // 🧱 부품 6: 자기소개 입력 칸
  Widget _buildBioSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle('자기소개'),
        const SizedBox(height: 8),
        _buildTextField(hint: '커피 한 잔과 함께 영화 이야기 나눌 사람을 찾아요 ☕', maxLines: 3),
      ],
    ); // (👈 에러 방지용 임시 빈 칸)
  }

  // 🧱 부품 7: 관심사 선택 칸 (Wrap 사용)
  Widget _buildInterestsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle('관심사'),
        const SizedBox(height: 12),
        //제목과 관심사 버튼들 사이에 12만큼 빈 공간(여백)을 줍니다.
        Wrap(
          //rap은 가로로 버튼을 채우다가 화면 끝에 닿으면 알아서 다음 줄로 넘어가는(자동 줄바꿈)
          spacing: 10, // 가로로 나열될 버튼과 버튼 사이의 틈(간격)을 10으로 줍니다.
          runSpacing: 10, // 줄이 바뀌었을 때 윗줄과 아랫줄 사이의 세로 틈(간격)을 10으로 줍니다.
          children: _interestsData.map((interest) {
            //_interestsData(카페, 영화 등 8개 데이터)를 하나씩 꺼내서 아래 모양의 버튼으로 만듭니다
            bool isSelected = _selectedInterests.contains(interest['label']);
            //이 관심사가 현재 내가 선택한 목록(_selectedInterests) 안에 들어있는지 확인합니다. (선택됐으면 true)
            return GestureDetector(
              //터치(클릭)를 감지하는 투명한 버튼 역할
              onTap: () {
                //사용자가 이 관심사를 손가락으로 탭(터치)했을 때 실행됩니다.
                setState(() {
                  // 화면을 다시 그려달라고 플러터에게 요청
                  if (isSelected) {
                    _selectedInterests.remove(interest['label']);
                    //이미 선택된 걸 눌렀다면? 선택 목록에서 뺍니다.
                  } else {
                    _selectedInterests.add(interest['label']!);
                    //// 아직 선택 안 된 걸 눌렀다면? 선택 목록에 넣습니다
                  }
                });
              },
              child: Container(
                // 실제 눈에 보이는 알약 모양의 박스
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 10,
                ),
                //박스 안쪽으로 좌우 16, 상하 10만큼 쿠션(여백)을 줍니다.
                decoration: BoxDecoration(
                  // 박스의 배경색과 테두리를 꾸밉니다.
                  color: isSelected ? pinkAccent.withOpacity(0.15) : cardColor,
                  //선택됐다면 연한 핑크색 바탕, 아니면 원래 어두운색을 칠합니다.
                  border: Border.all(
                    color: isSelected ? pinkAccent : Colors.transparent,
                    width: 1.5,
                  ),
                  //// 선택됐다면 핑크색 선을 긋고, 아니면 테두리를 투명하게 숨깁니다.
                ),
                child: Row(
                  // 박스 안에서 아이콘과 글씨를 가로(Row)로 나란히 둡니다.
                  mainAxisSize: MainAxisSize.min,
                  // 박스 크기를 내용물(글씨 길이)에 딱 맞게 꽉 조여줍니다.
                  children: [
                    Text(
                      interest['icon']!,
                      style: const TextStyle(fontSize: 14),
                    ),
                    //데이터에서 아이콘(☕ 등)을 꺼내서 그립니다.
                    const SizedBox(width: 6),
                    //아이콘과 글씨 사이에 6만큼 아주 좁은 틈을 줍니다
                    Text(
                      interest['label']!,
                      style: TextStyle(
                        color: isSelected ? pinkAccent : subTextColor,
                        //선택됐으면 핑크색 글씨, 아니면 회색 글씨로 보여줍니다.
                        fontWeight: isSelected
                            ? FontWeight.bold
                            : FontWeight.normal,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  // 🧱 부품 8: 하단 '다음 단계' 버튼
  Widget _buildNextButton() {
    return const SizedBox(); // (👈 에러 방지용 임시 빈 칸)
  }

  //공용도구
  Widget _buildSectionTitle(String title) {
    return const SizedBox(); // (👈 에러 방지용 임시 빈 칸)
  }

  //공용도구2
  Widget _buildTextField() {
    return const SizedBox(); // (👈 에러 방지용 임시 빈 칸)
  }

  // (👈 중간에 닫혀있던 클래스 종료 괄호 `}` 를 맨 마지막으로 옮겼습니다.)
}

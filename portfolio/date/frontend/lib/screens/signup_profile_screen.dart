import 'package:flutter/material.dart';

// 서버 통신용 도구
import 'package:http/http.dart' as http;
// JSON 변환용 도구
import 'dart:convert';
// File 객체 사용
import 'dart:io';
// 이미지 피커
import 'package:image_picker/image_picker.dart';
// 웹(kIsWeb) 및 플랫폼 자동 감지 도구
import 'package:flutter/foundation.dart';
import 'dart:ui'; // Glassmorphism(ImageFilter) 패키지

class SignupProfileScreen extends StatefulWidget {
  const SignupProfileScreen({super.key});
  @override
  State<SignupProfileScreen> createState() => _SignupProfileScreenState();
}

class _SignupProfileScreenState extends State<SignupProfileScreen>
    with SingleTickerProviderStateMixin {
  // 디자인 테마 색상 정의
  final Color bgColor = const Color(0xFF12121A);
  final Color cardColor = const Color(0xFF22222E);
  final Color borderColor = const Color(0xFF38384A);
  final Color pinkAccent = const Color(0xFFFF4B93);
  final Color purpleAccent = const Color(0xFFB635F7);
  final Color textColor = Colors.white;
  final Color subTextColor = const Color(0xFFA0A0B0);

  // 🚀 현재 단계를 관리하는 변수 (1단계 / 2단계 / 3단계)
  int _currentStep = 1;

  // 순차적 슬라이드 다운 애니메이션을 위한 컨트롤러
  late final AnimationController _animController;
  late final Animation<double> _step1SlideAnim;
  late final Animation<double> _step1FadeAnim;
  late final Animation<double> _step2SlideAnim;
  late final Animation<double> _step2FadeAnim;

  // 입력 컨트롤러들
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _nicknameController = TextEditingController();
  final TextEditingController _ageController = TextEditingController();
  final TextEditingController _bioController = TextEditingController();

  // 선택한 데이터 상태관리
  String _selectedGender = '여성';
  final List<String> _selectedInterests = ['카페', '영화', '독서', '음악', '운동']; // 초기값 5개 이상 충족

  // 📸 선택한 사진을 담을 변수 (최대 3장)
  final List<XFile?> _selectedImages = [null, null, null];
  final ImagePicker _picker = ImagePicker();

  // 📋 3단계에서 사용할 풍성해진 관심사 목록 데이터
  final _interestsData = [
    {'icon': '☕', 'label': '카페'},
    {'icon': '🎬', 'label': '영화'},
    {'icon': '🎵', 'label': '음악'},
    {'icon': '📚', 'label': '독서'},
    {'icon': '🏃', 'label': '운동'},
    {'icon': '✈️', 'label': '여행'},
    {'icon': '🍳', 'label': '요리'},
    {'icon': '🎮', 'label': '게임'},
    {'icon': '🎨', 'label': '예술'},
    {'icon': '🐾', 'label': '반려동물'},
    {'icon': '🍜', 'label': '맛집탐방'},
    {'icon': '📷', 'label': '사진촬영'},
  ];

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    );

    _step1SlideAnim = Tween<double>(begin: -30.0, end: 0.0).animate(
      CurvedAnimation(
        parent: _animController,
        curve: const Interval(0.0, 0.6, curve: Curves.easeOut),
      ),
    );
    _step1FadeAnim = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _animController,
        curve: const Interval(0.0, 0.6, curve: Curves.easeOut),
      ),
    );

    _step2SlideAnim = Tween<double>(begin: -30.0, end: 0.0).animate(
      CurvedAnimation(
        parent: _animController,
        curve: const Interval(0.3, 1.0, curve: Curves.easeOut),
      ),
    );
    _step2FadeAnim = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _animController,
        curve: const Interval(0.3, 1.0, curve: Curves.easeOut),
      ),
    );

    _animController.forward();
  }

  @override
  void dispose() {
    _animController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _nicknameController.dispose();
    _ageController.dispose();
    _bioController.dispose();
    super.dispose();
  }

  // 단계가 바뀔 때마다 애니메이션을 부드럽게 재실행
  void _changeStep(int newStep) {
    setState(() {
      _currentStep = newStep;
    });
    _animController.reset();
    _animController.forward();
  }

  // 서버 주소 설정
  String get _apiUrl {
    if (kIsWeb) {
      return 'http://localhost:3000/api/signup';
    } else if (defaultTargetPlatform == TargetPlatform.android) {
      return 'http://10.0.2.2:3000/api/signup';
    } else {
      return 'http://localhost:3000/api/signup';
    }
  }

  // ✨ 상단 글래스룩 토스트 호출 함수
  void _showTopGlassToast(BuildContext context, String message, {bool isError = false}) {
    late OverlayEntry overlayEntry;

    overlayEntry = OverlayEntry(
      builder: (ctx) => TopSlidingToast(
        message: message,
        isError: isError,
        onDismiss: () {
          overlayEntry.remove();
        },
      ),
    );

    Overlay.of(context).insert(overlayEntry);
  }

  // 갤러리에서 사진 고르기
  Future<void> _pickImage(int index) async {
    final XFile? pickedFile = await _picker.pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() {
        _selectedImages[index] = pickedFile;
      });
    }
  }

  // 백엔드로 최종 회원가입 데이터 전송
  Future<void> _signUpToBackend() async {
    final email = _emailController.text;
    final password = _passwordController.text;
    final nickname = _nicknameController.text;
    final ageText = _ageController.text;
    final bio = _bioController.text;

    var request = http.MultipartRequest('POST', Uri.parse(_apiUrl));

    request.fields['email'] = email;
    request.fields['password'] = password;
    request.fields['nickname'] = nickname;
    request.fields['age'] = ageText;
    request.fields['gender'] = _selectedGender == '남성' ? 'M' : 'F';
    request.fields['bio'] = bio;
    request.fields['interests'] = jsonEncode(_selectedInterests);

    for (int i = 0; i < _selectedImages.length; i++) {
      if (_selectedImages[i] != null) {
        final bytes = await _selectedImages[i]!.readAsBytes();
        request.files.add(
          http.MultipartFile.fromBytes(
            'photos',
            bytes,
            filename: _selectedImages[i]!.name.isNotEmpty
                ? _selectedImages[i]!.name
                : 'photo_$i.jpg',
          ),
        );
      }
    }

    try {
      var streamedResponse = await request.send();
      var response = await http.Response.fromStream(streamedResponse);
      final data = jsonDecode(response.body);
      if (response.statusCode == 200 && data['success'] == true) {
        _showTopGlassToast(context, data['message'], isError: false);
      } else {
        _showTopGlassToast(context, data['message'] ?? '가입실패', isError: true);
      }
    } catch (e) {
      _showTopGlassToast(context, '서버 통신 에러', isError: true);
    }
  }

  // ⏭️ 다음 단계로 넘어갈 때 유효성 검사 로직
  void _handleNextStep() {
    if (_currentStep == 1) {
      if (_selectedImages[0] == null) {
        _showTopGlassToast(context, '대표 사진은 필수로 등록해야 합니다!', isError: true);
        return;
      }
      if (_emailController.text.isEmpty || _passwordController.text.isEmpty) {
        _showTopGlassToast(context, '이메일과 비밀번호를 모두 입력해 주세요.', isError: true);
        return;
      }
      _changeStep(2);
    } else if (_currentStep == 2) {
      if (_nicknameController.text.isEmpty || _ageController.text.isEmpty) {
        _showTopGlassToast(context, '닉네임과 나이를 모두 입력해 주세요.', isError: true);
        return;
      }
      _changeStep(3);
    } else if (_currentStep == 3) {
      if (_selectedInterests.length < 5) {
        _showTopGlassToast(context, '관심사를 5개 이상 선택해 주세요!', isError: true);
        return;
      }
      // 최종 가입 완료 서버 전송
      _signUpToBackend();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      // ✨ 하단 고정 플로팅 버튼 영역 배치
      bottomNavigationBar: Container(
        padding: const EdgeInsets.all(24.0),
        color: bgColor,
        child: SafeArea(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 480),
            child: _buildNextButton(),
          ),
        ),
      ),
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 480),
            child: Column(
              children: [
                _buildTopBar(),
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 24.0,
                      vertical: 16.0,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildHeader(),
                        const SizedBox(height: 32),
                        
                        // 🔄 단계별 화면 전환
                        if (_currentStep == 1) _buildStep1Content(),
                        if (_currentStep == 2) _buildStep2Content(),
                        if (_currentStep == 3) _buildStep3Content(),

                        const SizedBox(height: 20), // 하단 바와 겹치지 않게 여유 공간
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // 상단 바 (뒤로가기 및 단계별 프로그레스 바)
  Widget _buildTopBar() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 16.0),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(color: cardColor, shape: BoxShape.circle),
            child: IconButton(
              icon: Icon(Icons.arrow_back, color: textColor, size: 20),
              onPressed: () {
                if (_currentStep > 1) {
                  _changeStep(_currentStep - 1);
                } else {
                  Navigator.pop(context);
                }
              },
            ),
          ),
          const SizedBox(width: 16),
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
                FractionallySizedBox(
                  widthFactor: _currentStep / 3, // 단계에 따라 차오르는 바
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
          Text(
            '$_currentStep / 3',
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

  // 단계별 헤더 타이틀 변화
  Widget _buildHeader() {
    String title = '';
    String subtitle = '';

    if (_currentStep == 1) {
      title = '나를 소개해요 ✨';
      subtitle = '프로필 사진과 기본 계정 정보를 입력해주세요';
    } else if (_currentStep == 2) {
      title = '기본 정보를 알려주세요 📝';
      subtitle = '다른 회원들에게 보여질 프로필을 채워주세요';
    } else {
      title = '어떤 취향을 가지셨나요? 🎯';
      subtitle = '마음에 드는 관심사를 5개 이상 선택해주세요';
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(
            color: textColor,
            fontSize: 26,
            fontWeight: FontWeight.w800,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          subtitle,
          style: TextStyle(color: subTextColor, fontSize: 14),
        ),
      ],
    );
  }

  // 📌 1단계 화면 구성 (슬라이드 다운 적용)
  Widget _buildStep1Content() {
    return AnimatedBuilder(
      animation: _animController,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(0, _step1SlideAnim.value),
          child: Opacity(
            opacity: _step1FadeAnim.value,
            child: child,
          ),
        );
      },
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildPhotoSection(),
          const SizedBox(height: 32),
          _buildCustomAnimatedTextField(
            controller: _emailController,
            label: '이메일',
            hint: 'example@test.com',
          ),
          const SizedBox(height: 24),
          _buildCustomAnimatedTextField(
            controller: _passwordController,
            label: '비밀번호',
            hint: '비밀번호 입력',
            obscureText: true,
          ),
        ],
      ),
    );
  }

  // 📌 2단계 화면 구성 (슬라이드 다운 적용)
  Widget _buildStep2Content() {
    return AnimatedBuilder(
      animation: _animController,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(0, _step1SlideAnim.value),
          child: Opacity(
            opacity: _step1FadeAnim.value,
            child: child,
          ),
        );
      },
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildCustomAnimatedTextField(
            controller: _nicknameController,
            label: '닉네임',
            hint: '별빛소나타',
          ),
          const SizedBox(height: 24),
          _buildAgeAndGenderSection(),
          const SizedBox(height: 24),
          _buildCustomAnimatedTextField(
            controller: _bioController,
            label: '자기소개',
            hint: '커피 한 잔과 함께 영화 이야기 나눌 사람을 찾아요 ☕',
            maxLines: 3,
          ),
        ],
      ),
    );
  }

  // 📌 3단계 화면 구성 (슬라이드 다운 적용)
  Widget _buildStep3Content() {
    return AnimatedBuilder(
      animation: _animController,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(0, _step1SlideAnim.value),
          child: Opacity(
            opacity: _step1FadeAnim.value,
            child: child,
          ),
        );
      },
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildSectionTitle('관심사 선택'),
              Text(
                '${_selectedInterests.length}개 선택됨 (최소 5개)',
                style: TextStyle(
                  color: _selectedInterests.length >= 5 ? pinkAccent : subTextColor,
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: _interestsData.length,
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3, // 한 줄에 3개씩 배치
              crossAxisSpacing: 10,
              mainAxisSpacing: 10,
              childAspectRatio: 2.5,
            ),
            itemBuilder: (context, index) {
              final interest = _interestsData[index];
              bool isSelected = _selectedInterests.contains(interest['label']);
              return GestureDetector(
                onTap: () {
                  setState(() {
                    if (isSelected) {
                      _selectedInterests.remove(interest['label']);
                    } else {
                      _selectedInterests.add(interest['label']!);
                    }
                  });
                },
                child: Container(
                  decoration: BoxDecoration(
                    color: isSelected ? pinkAccent.withValues(alpha: 0.15) : cardColor,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: isSelected ? pinkAccent : Colors.transparent,
                      width: 1.5,
                    ),
                  ),
                  alignment: Alignment.center,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(interest['icon']!, style: const TextStyle(fontSize: 13)),
                      const SizedBox(width: 6),
                      Text(
                        interest['label']!,
                        style: TextStyle(
                          color: isSelected ? pinkAccent : subTextColor,
                          fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                          fontSize: 13,
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildPhotoSection() {
    return SizedBox(
      height: 150,
      child: Row(
        children: [
          Expanded(flex: 2, child: _buildPhotoBox(index: 0, isMain: true)),
          const SizedBox(width: 12),
          Expanded(flex: 1, child: _buildPhotoBox(index: 1, isMain: false)),
          const SizedBox(width: 12),
          Expanded(flex: 1, child: _buildPhotoBox(index: 2, isMain: false)),
        ],
      ),
    );
  }

  Widget _buildPhotoBox({required int index, required bool isMain}) {
    return GestureDetector(
      onTap: () => _pickImage(index),
      child: Container(
        decoration: BoxDecoration(
          color: cardColor,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: borderColor, width: 1.5),
          image: _selectedImages[index] != null
              ? DecorationImage(
                  image: kIsWeb
                      ? NetworkImage(_selectedImages[index]!.path) as ImageProvider
                      : FileImage(File(_selectedImages[index]!.path)),
                  fit: BoxFit.cover,
                )
              : null,
        ),
        child: _selectedImages[index] == null
            ? Center(
                child: isMain
                    ? Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.camera_alt, color: subTextColor, size: 32),
                          const SizedBox(height: 8),
                          Text('대표 사진', style: TextStyle(color: subTextColor, fontSize: 12)),
                        ],
                      )
                    : Icon(Icons.add, color: subTextColor, size: 28),
              )
            : null,
      ),
    );
  }

  Widget _buildAgeAndGenderSection() {
    return Row(
      children: [
        Expanded(
          flex: 4,
          child: _buildCustomAnimatedTextField(
            controller: _ageController,
            label: '나이',
            hint: '27',
            isNumber: true,
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
    );
  }

  Widget _buildGenderButton(String gender) {
    bool isSelected = _selectedGender == gender;
    return GestureDetector(
      onTap: () {
        setState(() => _selectedGender = gender);
      },
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          color: isSelected ? pinkAccent.withValues(alpha: 0.1) : cardColor,
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
    );
  }

  // 하단 플로팅 버튼 디자인 (2단계 슬라이드 다운 적용)
  Widget _buildNextButton() {
    return AnimatedBuilder(
      animation: _animController,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(0, _step2SlideAnim.value),
          child: Opacity(
            opacity: _step2FadeAnim.value,
            child: child,
          ),
        );
      },
      child: Container(
        width: double.infinity,
        height: 56,
        decoration: BoxDecoration(
          gradient: LinearGradient(colors: [pinkAccent, purpleAccent]),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            borderRadius: BorderRadius.circular(16),
            onTap: _handleNextStep,
            child: Center(
              child: Text(
                _currentStep == 3 ? '가입 완료' : '다음 단계',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: TextStyle(
        color: textColor,
        fontSize: 15,
        fontWeight: FontWeight.bold,
      ),
    );
  }

  // ✨ 플레이스홀더 및 상단 라벨 애니메이션이 적용된 텍스트 필드
  Widget _buildCustomAnimatedTextField({
    required TextEditingController controller,
    required String label,
    required String hint,
    int maxLines = 1,
    bool isNumber = false,
    bool obscureText = false,
  }) {
    return StatefulBuilder(
      builder: (context, setStateSB) {
        controller.addListener(() {
          if (mounted) setStateSB(() {});
        });

        return Focus(
          onFocusChange: (hasFocus) {
            setStateSB(() {});
          },
          child: Builder(
            builder: (ctx) {
              final bool isFocused = Focus.of(ctx).hasFocus;
              final bool hasText = controller.text.isNotEmpty;
              final bool isActive = isFocused || hasText;

              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  AnimatedOpacity(
                    opacity: isActive ? 0.0 : 1.0,
                    duration: const Duration(milliseconds: 200),
                    child: _buildSectionTitle(label),
                  ),
                  SizedBox(height: isActive ? 0 : 8),
                  Stack(
                    clipBehavior: Clip.none,
                    children: [
                      TextField(
                        controller: controller,
                        maxLines: maxLines,
                        obscureText: obscureText,
                        keyboardType: isNumber ? TextInputType.number : TextInputType.text,
                        style: TextStyle(color: textColor, fontSize: 15),
                        decoration: InputDecoration(
                          hintText: isActive ? hint : '',
                          hintStyle: TextStyle(color: subTextColor.withValues(alpha: 0.5)),
                          filled: true,
                          fillColor: cardColor,
                          contentPadding: const EdgeInsets.all(16),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: BorderSide.none,
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: BorderSide(color: borderColor, width: 1),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: BorderSide(color: pinkAccent, width: 1.5),
                          ),
                        ),
                      ),
                      AnimatedPositioned(
                        duration: const Duration(milliseconds: 200),
                        curve: Curves.easeInOut,
                        left: 16,
                        top: isActive ? -10 : 16,
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          padding: const EdgeInsets.symmetric(horizontal: 4),
                          color: isActive ? bgColor : Colors.transparent,
                          child: Text(
                            label,
                            style: TextStyle(
                              color: isActive ? pinkAccent : Colors.transparent,
                              fontSize: isActive ? 12 : 0,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              );
            },
          ),
        );
      },
    );
  }
}

// ✨ 상단 슬라이드 다운 글래스룩 토스트 위젯
class TopSlidingToast extends StatefulWidget {
  final String message;
  final bool isError;
  final VoidCallback onDismiss;

  const TopSlidingToast({
    super.key,
    required this.message,
    required this.isError,
    required this.onDismiss,
  });

  @override
  State<TopSlidingToast> createState() => _TopSlidingToastState();
}

class _TopSlidingToastState extends State<TopSlidingToast>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _slideAnimation;
  late final Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 400),
    );

    _slideAnimation = Tween<double>(begin: -100.0, end: 0.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutBack),
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeIn),
    );

    _controller.forward();

    Future.delayed(const Duration(milliseconds: 2500), () async {
      if (mounted) {
        await _controller.reverse();
        widget.onDismiss();
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: MediaQuery.of(context).padding.top + 16,
      left: 24,
      right: 24,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 450),
          child: AnimatedBuilder(
            animation: _controller,
            builder: (context, child) {
              return Transform.translate(
                offset: Offset(0, _slideAnimation.value),
                child: Opacity(
                  opacity: _fadeAnimation.value,
                  child: child,
                ),
              );
            },
            child: ClipRRect(
              borderRadius: BorderRadius.circular(16),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 16, sigmaY: 16),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
                  decoration: BoxDecoration(
                    color: const Color(0xFF22222E).withValues(alpha: 0.85),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(
                      color: widget.isError
                          ? Colors.redAccent.withValues(alpha: 0.5)
                          : const Color(0xFFFF4B93).withValues(alpha: 0.5),
                      width: 1.5,
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.3),
                        blurRadius: 12,
                        offset: const Offset(0, 6),
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        widget.isError ? Icons.error_outline : Icons.check_circle_outline,
                        color: widget.isError ? Colors.redAccent : const Color(0xFFFF4B93),
                        size: 20,
                      ),
                      const SizedBox(width: 12),
                      Flexible(
                        child: Text(
                          widget.message,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            decoration: TextDecoration.none,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
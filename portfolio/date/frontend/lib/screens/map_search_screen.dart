import 'package:flutter/material.dart';
// 💡 main.dart에 있는 DatingHomeScreen으로 넘어가기 위해 불러옵니다.
import '../main.dart'; 

// GPS 위치권한 패키지
import 'package:geolocator/geolocator.dart';
// 카카오 지도 웹뷰 패키지
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'dart:ui'; // Glassmorphism(ImageFilter) 패키지

class MapSearchScreen extends StatefulWidget {
  const MapSearchScreen({super.key});

  @override
  State<MapSearchScreen> createState() => _MapSearchScreenState();
}

class _MapSearchScreenState extends State<MapSearchScreen> {
  final Color bgColor = const Color(0xFF12121A);
  final Color cardColor = const Color(0xFF22222E);
  final Color pinkAccent = const Color(0xFFFF4B93);
  final Color subTextColor = const Color(0xFFA0A0B0);

  // 필터 상태 관리
  int _selectedCategoryIndex = 0;
  final List categories = ['동네 친구', '커피 한잔', '술 한잔', '영화/문화'];
  
  String _selectedRadius = '반경 1km';
  final List radiusOptions = ['반경 1km', '반경 3km', '반경 5km'];
  
  String _selectedAge = '20대 초중반';
  final List ageOptions = ['20대 초중반', '20대 후반', '30대 초반', '상관없음'];

  Position? _currentPosition;
  bool _isLoadingLocation = true;

  // 👥 거리별 가짜 회원 리스트 (꺾쇠 에러 방지형 선언)
  final List _allDummyUsers = [
    {'id':1, 'distanceValue': 0.3, 'distance': '300m', 'gender': '여', 'name': '지은', 'interest': '카페 탐방', 'status':'NONE'},
    {'id':2, 'distanceValue': 0.8, 'distance': '800m', 'gender': '남', 'name': '민준', 'interest': '한강 산책', 'status':'NONE'},
    {'id':3, 'distanceValue': 1.2, 'distance': '1.2km', 'gender': '여', 'name': '수연', 'interest': '영화 보기', 'status':'SENT'},
    {'id':4, 'distanceValue': 2.5, 'distance': '2.5km', 'gender': '남', 'name': '동현', 'interest': '술 한잔','status':'NONE'},
    {'id':5, 'distanceValue': 2.8, 'distance': '2.8km', 'gender': '여', 'name': '서연', 'interest': '맛집 탐방','status':'NONE'},
    {'id':6, 'distanceValue': 3.5, 'distance': '3.5km', 'gender': '남', 'name': '지훈', 'interest': '코딩 스터디','status':'RECEIVED'},
    {'id':7, 'distanceValue': 4.1, 'distance': '4.1km', 'gender': '여', 'name': '유진', 'interest': '드라이브','status':'SENT'},
    {'id':8, 'distanceValue': 4.9, 'distance': '4.9km', 'gender': '남', 'name': '현우', 'interest': '동네 산책','status':'SENT'},
    {'id':9, 'distanceValue': 6.5, 'distance': '6.5km', 'gender': '여', 'name': '보영', 'interest': '자전거 타기', 'status':'SENT'}, 
  ];

  List get _filteredUsers {
    double maxDistance = 1.0;
    if(_selectedRadius == '반경 3km') maxDistance = 3.0;
    if(_selectedRadius == '반경 5km') maxDistance = 5.0;
    return _allDummyUsers.where((user) => user['distanceValue'] <= maxDistance).toList();
  }

  // ✨ 상단 슬라이드 다운 글래스룩 토스트 호출 함수
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

  // 유저 상태 변경 및 상단 글래스 토스트 알림 함수
  void _updateUserStatus(int userId, String newStatus, String userName){
    setState(() {
      final userIndex = _allDummyUsers.indexWhere((u) => u['id'] == userId);
      if(userIndex != -1){
        _allDummyUsers[userIndex]['status'] = newStatus;
      }
    });

    String message = '';
    if (newStatus == 'SENT') message = '$userName님에게 매칭을 요청했습니다';
    if (newStatus == 'MATCHED') message = '$userName님과 매칭 성사';
    if (newStatus == 'NONE') message = '$userName님 요청을 거절했습니다';

    if(message.isNotEmpty && mounted) {
      _showTopGlassToast(context, message, isError: false);
    }
  }

  // 화면 진입 시 위치 권한 체크
  @override
  void initState(){
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_){
      _checkAndRequestPermission();
    });
  }

  Future<void> _checkAndRequestPermission() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      _setDefaultLocation();
      _showTopGlassToast(context, 'GPS가 꺼져 있어 기본 위치(서울)로 설정됩니다.', isError: true);
      return;
    }
    
    LocationPermission permission = await Geolocator.checkPermission();

    if(permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if(permission == LocationPermission.whileInUse || permission == LocationPermission.always){
        _getActualLocation();
      } else {
        _setDefaultLocation();
        _showTopGlassToast(context, '위치 권한이 거부되어 기본 위치로 설정됩니다.', isError: true);
      }
    } else if(permission == LocationPermission.deniedForever){
      _setDefaultLocation();
      _showTopGlassToast(context, '위치 권한이 차단되어 기본 위치로 설정됩니다.', isError: true);  
    } else {
      _getActualLocation();
    }
  }

  void _setDefaultLocation() {
    setState(() {
      _currentPosition = Position(
        latitude: 37.5666,
        longitude: 126.9784,
        timestamp: DateTime.now(),
        accuracy: 1.0,
        altitude: 0.0,
        heading: 0.0,
        speed: 0.0,
        speedAccuracy: 0.0,
        altitudeAccuracy: 0.0,
        headingAccuracy: 0.0,
      );
      _isLoadingLocation = false;
    });
  }

  Future<void> _getActualLocation() async {
    try {
      Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
        timeLimit: const Duration(seconds: 5),
      );
      setState((){
        _currentPosition = position;
        _isLoadingLocation = false;
      });
    } catch (e) {
      _setDefaultLocation();
      _showTopGlassToast(context, '현위치를 가져오지 못해 기본 위치로 지정합니다.', isError: false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final displayedUsers = _filteredUsers;
    return Container(
      color: Colors.black,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 480),
          child: Scaffold(
            backgroundColor: bgColor,
            extendBodyBehindAppBar: true,
            appBar: AppBar(
              backgroundColor: Colors.transparent,
              elevation: 0,
              title: Row(
                children: [
                  const Icon(Icons.location_on, color: Color(0xFFFF4B93), size: 24),
                  const SizedBox(width: 8),
                  Text(
                    _isLoadingLocation ? '위치 찾는 중...' : '내 위치 확인완료',            
                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)
                  ),
                ],
              ),
            ),
            body: Column(
              children: [
                Expanded(
                  flex: 4,
                  child: _buildKakaoMap(),
                ),
                Expanded(
                  flex: 6,
                  child: Container(
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: bgColor,
                      borderRadius: const BorderRadius.only(topLeft: Radius.circular(24), topRight: Radius.circular(24)),
                      boxShadow: [
                        BoxShadow(color: Colors.black.withValues(alpha: 0.5), blurRadius: 10, offset: const Offset(0, -5))
                      ],
                    ),
                    child: Column(
                      children: [
                        _buildCategoryTabs(),
                        const Divider(color: Color(0xFF22222E), thickness: 1),
                        Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: Column(
                            children: [
                              _buildDropdownRow('탐색 반경', _selectedRadius, radiusOptions, (val) {
                                setState(() => _selectedRadius = val!);
                              }),
                              const SizedBox(height: 24),
                              SizedBox(
                                width: double.infinity,
                                height: 56,
                                child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: pinkAccent,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                                  ),
                                  onPressed: () {
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(builder: (context) => DatingHomeScreen()), 
                                    );
                                  },
                                  child: const Text('주변 인연 찾기', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                                ),
                              ),
                            ],
                          ),
                        ),
                        Expanded(child: _buildNearbyUsersList(displayedUsers)),
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

  Widget _buildKakaoMap(){
    if (_isLoadingLocation || _currentPosition == null) {
      return const Center(child: CircularProgressIndicator(color: Color(0xFFFF4B93)));      
    }
    return InAppWebView(
      initialData: InAppWebViewInitialData(data: """
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>Kakao Map</title>
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=a0bf46b6f85adb1c911c864cba503e22"></script>
        <style>
        body, html{margin:0; padding:0; height:100%;}
        #map{ width:100%; height:100%;}
        </style>
        </head>
        <body>
        <div id="map"></div>
        <script>
        var container = document.getElementById('map');
        var myPosition = new kakao.maps.LatLng(${_currentPosition!.latitude}, ${_currentPosition!.longitude});
        var options = {
          center: myPosition,
          level: 3
        };
        var map = new kakao.maps.Map(container, options);
        var marker = new kakao.maps.Marker({
          position: myPosition
        });
        marker.setMap(map);
        </script>
        </body>
        </html>
      """),
    );
  }          

  Widget _buildCategoryTabs() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      child: Row(
        children: List.generate(categories.length, (index) {
          bool isSelected = _selectedCategoryIndex == index;
          return GestureDetector(
            onTap: () => setState(() => _selectedCategoryIndex = index),
            child: Container(
              margin: const EdgeInsets.only(right: 8),
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              decoration: BoxDecoration(
                color: isSelected ? pinkAccent : Colors.transparent,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                categories[index],
                style: TextStyle(
                  color: isSelected ? Colors.white : subTextColor,
                  fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                ),
              ),
            ),
          );
        }),
      ),
    );
  }

  Widget _buildDropdownRow(String title, String value, List items, ValueChanged<String?> onChanged) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(title, style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
        Container(
          height: 40,
          padding: const EdgeInsets.symmetric(horizontal: 12),
          decoration: BoxDecoration(
            color: cardColor,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: subTextColor.withOpacity(0.3)),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String>(
              value: value,
              dropdownColor: cardColor,
              icon: Icon(Icons.expand_more, color: subTextColor),
              style: const TextStyle(color: Colors.white, fontSize: 14),
              items: items.map((item) {
                return DropdownMenuItem<String>(
                  value: item,
                  child: Text(item),
                );
              }).toList(),
              onChanged: onChanged,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildStatusActionButtons(Map user) {
    final status = user['status'];
    final userId = user['id'];
    final userName = user['name'];

    if (status == 'NONE') {
      return SizedBox(
        height: 32,
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: pinkAccent,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            elevation: 0,
          ),
          onPressed: () => _updateUserStatus(userId, 'SENT', userName),
          child: const Text('요청', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
        ),
      );
    } else if (status == 'SENT') {
      return SizedBox(
        height: 32,
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: cardColor,
            foregroundColor: subTextColor,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
              side: BorderSide(color: subTextColor.withOpacity(0.3)),
            ),
            elevation: 0,
          ),
          onPressed: null, 
          child: const Text('요청됨', style: TextStyle(fontSize: 13)),
        ),
      );
    } else if (status == 'RECEIVED') {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            height: 32,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blueAccent,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 12),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                elevation: 0,
              ),
              onPressed: () => _updateUserStatus(userId, 'MATCHED', userName),
              child: const Text('수락', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
            ),
          ),
          const SizedBox(width: 6),
          SizedBox(
            height: 32,
            child: OutlinedButton(
              style: OutlinedButton.styleFrom(
                foregroundColor: subTextColor,
                padding: const EdgeInsets.symmetric(horizontal: 12),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                side: BorderSide(color: subTextColor.withOpacity(0.5)),
              ),
              onPressed: () => _updateUserStatus(userId, 'NONE', userName),
              child: const Text('거절', style: TextStyle(fontSize: 13)),
            ),
          ),
        ],
      );
    } else if (status == 'MATCHED') {
      return SizedBox(
        height: 32,
        child: ElevatedButton.icon(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.purpleAccent,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            elevation: 0,
          ),
          onPressed: () {},
          icon: const Icon(Icons.favorite, size: 14),
          label: const Text('매칭됨', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
        ),
      );
    }
    return const SizedBox.shrink();
  }

  Widget _buildNearbyUsersList(List users) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 20, right: 20, bottom: 8),
          child: Text(
            '근처 접속 중인 유저 $_selectedRadius(총 ${users.length}명)',
            style: TextStyle(color: subTextColor, fontSize: 13),
          ),
        ),
        Expanded(
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 0),
            itemCount: users.length,
            separatorBuilder: (context, index) => Divider(color: cardColor, thickness: 1),
            itemBuilder: (context, index) {
              final user = users[index];
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: Row(
                  children: [
                    SizedBox(
                      width: 50, 
                      child: Text(user['distance'], style: TextStyle(color: pinkAccent, fontWeight: FontWeight.bold, fontSize: 14))
                    ),
                    SizedBox(
                      width: 30, 
                      child: Text(user['gender'], style: const TextStyle(color: Colors.white, fontSize: 14))
                    ),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(user['name'], style: const TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold)),
                          Text(user['interest'], style: TextStyle(color: subTextColor, fontSize: 12)),
                        ],
                      ),
                    ),
                    _buildStatusActionButtons(user),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}

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
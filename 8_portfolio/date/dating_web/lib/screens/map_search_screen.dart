import 'package:flutter/material.dart';
// 💡 [경로 수정 완료] main.dart에 있는 DatingHomeScreen으로 넘어가기 위해 불러옵니다.
import '../main.dart'; 

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
  final List<String> categories = ['동네 친구', '커피 한잔', '술 한잔', '영화/문화'];
  
  String _selectedRadius = '반경 3km';
  final List<String> radiusOptions = ['반경 1km', '반경 3km', '반경 5km', '반경 10km'];
  
  String _selectedAge = '20대 초중반';
  final List<String> ageOptions = ['20대 초중반', '20대 후반', '30대 초반', '상관없음'];

  // 하단 대기 유저 더미 데이터
  final List<Map<String, dynamic>> nearbyUsers = [
    {'distance': '800m', 'gender': '여', 'name': '지은', 'interest': '카페 탐방'},
    {'distance': '1.2km', 'gender': '남', 'name': '민준', 'interest': '한강 산책'},
    {'distance': '2.5km', 'gender': '여', 'name': '수연', 'interest': '영화 보기'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      // 상단바를 투명하게 만들고 지도 위에 겹치게 합니다.
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Row(
          children: [
            Icon(Icons.location_on, color: Color(0xFFFF4B93), size: 24),
            SizedBox(width: 8),
            Text('서울 마포구 연남동', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
          ],
        ),
      ),
      body: Column(
        children: [
          // 🗺️ 상단 지도 영역 (유저 화면의 40% 차지)
          Expanded(
            flex: 4,
            child: _buildMapPlaceholder(),
          ),
          
          // 🎛️ 하단 필터 및 검색 영역 (유저 화면의 60% 차지)
          Expanded(
            flex: 6,
            child: Container(
              width: double.infinity,
              decoration: BoxDecoration(
                color: bgColor,
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(24),
                  topRight: Radius.circular(24),
                ),
                boxShadow: [
                  BoxShadow(color: Colors.black.withOpacity(0.5), blurRadius: 10, offset: const Offset(0, -5))
                ],
              ),
              child: Column(
                children: [
                  _buildCategoryTabs(),
                  const Divider(color: Color(0xFF22222E), thickness: 1),
                  
                  // 필터 드롭다운 영역
                  Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Column(
                      children: [
                        _buildDropdownRow('원하는 나이', _selectedAge, ageOptions, (val) => setState(() => _selectedAge = val!)),
                        const SizedBox(height: 16),
                        _buildDropdownRow('탐색 반경', _selectedRadius, radiusOptions, (val) => setState(() => _selectedRadius = val!)),
                        const SizedBox(height: 24),
                        
                        // 🚀 검색(매칭) 시작 버튼
                        SizedBox(
                          width: double.infinity,
                          height: 56,
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: pinkAccent,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                            ),
                            onPressed: () {
                              // 검색하기 누르면 기존의 '스와이프 매칭 화면(DatingHomeScreen)'으로 이동합니다.
                              Navigator.push(
                                context,
                                MaterialPageRoute(builder: (context) => const DatingHomeScreen()), 
                              );
                            },
                            child: const Text('주변 인연 찾기', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                          ),
                        ),
                      ],
                    ),
                  ),
                  
                  // 주변 대기 유저 리스트
                  Expanded(child: _buildNearbyUsersList()),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  // 🗺️ 가짜 지도 화면 (카카오/구글맵 연동 전)
  Widget _buildMapPlaceholder() {
    return Container(
      width: double.infinity,
      decoration: const BoxDecoration(
        color: Color(0xFF1E202C), // 지도가 없을 때 보여질 어두운 맵시 배경
        image: DecorationImage(
          // 실제 지도 API 연동 전 임시 이미지
          image: NetworkImage('https://maps.googleapis.com/maps/api/staticmap?center=Seoul&zoom=14&size=600x400&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0xffffffff&style=feature:all|element:labels.text.stroke|color:0x000000&style=feature:water|element:geometry|color:0x12121a&style=feature:landscape|element:geometry|color:0x22222e'),
          fit: BoxFit.cover,
        ),
      ),
      child: Stack(
        alignment: Alignment.center,
        children: [
          // 내 위치 펄스 애니메이션 느낌의 원
          Container(
            width: 150,
            height: 150,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: pinkAccent.withOpacity(0.2),
              border: Border.all(color: pinkAccent.withOpacity(0.5), width: 1),
            ),
          ),
          const Icon(Icons.my_location, color: Colors.white, size: 32),
          
          // 주변 유저 핑 (가짜 데이터)
          Positioned(top: 80, left: 100, child: _buildMapPing()),
          Positioned(bottom: 50, right: 80, child: _buildMapPing()),
          Positioned(top: 150, right: 120, child: _buildMapPing()),
        ],
      ),
    );
  }

  Widget _buildMapPing() {
    return Container(
      width: 16, height: 16,
      decoration: BoxDecoration(
        color: const Color(0xFF00E5FF),
        shape: BoxShape.circle,
        border: Border.all(color: Colors.white, width: 2),
      ),
    );
  }

  // 🏷️ 목적 탭 (동네친구, 커피한잔 등)
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

  // 🔻 드롭다운 필터 조립기
  Widget _buildDropdownRow(String title, String value, List<String> items, ValueChanged<String?> onChanged) {
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
              items: items.map((String item) {
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

  // 👥 주변 대기 유저 리스트
  Widget _buildNearbyUsersList() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 20, right: 20, bottom: 8),
          child: Text(
            '근처 접속 중인 유저 $_selectedRadius',
            style: TextStyle(color: subTextColor, fontSize: 13),
          ),
        ),
        Expanded(
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 0),
            itemCount: nearbyUsers.length,
            separatorBuilder: (context, index) => Divider(color: cardColor, thickness: 1),
            itemBuilder: (context, index) {
              final user = nearbyUsers[index];
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: Row(
                  children: [
                    // 💡 [수정 완료] SizedBox로 width를 주어 정렬이 안 틀어지게 고정했습니다.
                    SizedBox(
                      width: 60, 
                      child: Text(user['distance'], style: TextStyle(color: pinkAccent, fontWeight: FontWeight.bold, fontSize: 14))
                    ),
                    SizedBox(
                      width: 40, 
                      child: Text(user['gender'], style: const TextStyle(color: Colors.white, fontSize: 14))
                    ),
                    Expanded(
                      child: Text(user['name'], style: const TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold))
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(color: cardColor, borderRadius: BorderRadius.circular(8)),
                      child: Text(user['interest'], style: TextStyle(color: subTextColor, fontSize: 12)),
                    )
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
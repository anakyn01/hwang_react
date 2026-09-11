import 'package:flutter/material.dart';
// 💡 [경로 수정 완료] main.dart에 있는 DatingHomeScreen으로 넘어가기 위해 불러옵니다.
// GPS위치권한 패키지
import 'package:geolocator/geolocator.dart';//gps 위치권한
//카카오 지도웹뷰
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

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

  // 필터 상태 관리 추후 관리자 페이지에서 db로 받아와서 세팅되도록..바꿈
  int _selectedCategoryIndex = 0;
  final List<String> categories = 
  ['동네 친구', '커피 한잔', '술 한잔', '영화/문화'];
  
  //관리자에서 키로수를 변경하거나..할수 있게 개발
  String _selectedRadius = '반경 1km';
  final List<String> radiusOptions = 
  ['반경 1km', '반경 3km', '반경 5km'];
  
  String _selectedAge = '20대 초중반';
  final List<String> ageOptions = 
  ['20대 초중반', '20대 후반', '30대 초반', '상관없음'];

  Position? _currentPosition;
  bool _isLoadingLocation = true;

  //화면진입시  위치기반 권한 확인 및 가져오기
  @override
  void initState(){
    super.initState();
    _getCurrentLocation();
  }

//gps위치권한 요청및 현재 위치 가져오기
Future<void> _getCurrentLocation() async {
  bool serviceEnabled;
  LocationPermission permission;

  serviceEnabled = await Geolocator.isLocationServiceEnabled();
  if(!serviceEnabled) {
    return Future.error('위치 서비스가 비활성화되어 있습니다');
  }

  permission = await Geolocator.checkPermission();
  if (permission == LocationPermission.denied){
permission = await Geolocator.requestPermission();
return Future.error('위치 권한이 거부되었습니다');
  }

  if (permission == LocationPermission.deniedForever){
return Future.error('위치 권한이 영구적으로 거부되었습니다. 설정에서 변경해주세요.');  
  }
  Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
setState((){
  _currentPosition = position;
  _isLoadingLocation = false;
});
}

  //하단 대기 유저 더미 데이터
  final List<Map<String, dynamic>> nearbyUsers = [
    {'distance': '800m', 'gender': '여', 'name': '지은', 'interest': '카페 탐방'},
    {'distance': '1.2km', 'gender': '남', 'name': '민준', 'interest': '한강 산책'},
    {'distance': '2.5km', 'gender': '여', 'name': '수연', 'interest': '영화 보기'},
  ];
  

  @override
  Widget build(BuildContext context) {
    return Container(
      color:Colors.black,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 480),
          child: Scaffold(
            backgroundColor: bgColor,
            // 상단바를 투명하게 만들고 지도 위에 겹치게 합니다.
            extendBodyBehindAppBar: true,
            appBar: AppBar(
              backgroundColor: Colors.transparent,
              elevation: 0,
              title: Row(
                children: [
                  Icon(Icons.location_on, color: Color(0xFFFF4B93), size: 24),
                  SizedBox(width: 8),
                  Text(_isLoadingLocation ? '위치 찾는 중...' : '내 위치 확인완료',            
        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
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
                      boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.5), blurRadius: 10, offset: const Offset(0, -5))],
                    ),
                    child: Column(
                      children: [
                        _buildCategoryTabs(),
                        const Divider(color: Color(0xFF22222E), thickness: 1),
                        Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: Column(
                            children: [
                              _buildDropdownRow('탐색 반경', _selectedRadius, radiusOptions, (val) => setState(() => _selectedRadius = val!)),
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
                                    // 👉 백엔드로 내 위치와 반경을 보내어 근처 유저를 검색합니다.
                                  },
                                  child: const Text('주변 인연 찾기', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                                ),
                              ),
                            ],
                          ),
                        ),
                        Expanded(child: _buildNearbyUsersList()),
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

  //카카오 지도 렌더링 영역
  Widget _buildKakaoMap(){
    if (_isLoadingLocation) {
return const Center(child:CircularProgressIndicator(color:Color(0xFFFF4B93)));      
    }
    return Stack(
      children:[
        InAppWebView(
initialData:InAppWebViewInitialData(data: """
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>Kakao Map</title>
<script type="text/javascript"
src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=">
</script>
<style>
body, html{margin:0; padding:0; height:100%;}
#map{ width:100%; height:100%;}
</style>
</head>
<body>
<div id="map"></div>
<script>
var container = document.getElementById('map');
var options = {
center:new kakao.maps.LatLng(${_currentPosition!.latitude}, ${_currentPosition!.longitude}),
level:3
};
var map = new kakao.maps.Map(container, options);
</script>
</body>
</html>
"""),          
        ),
Center(
  child:Icon(Icons.location_history, color:pinkAccent, size:40), 
  ), 
],
    );
  }

 // 👉 [복구됨] 카테고리 가로 스크롤 탭
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

  // 👉 [복구됨] 드롭다운 행 조립기
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

  // 👉 [복구됨] 주변 대기 유저 리스트 UI
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
import 'package:flutter/material.dart';
// 💡 main.dart에 있는 DatingHomeScreen으로 넘어가기 위해 불러옵니다.
import '../main.dart'; 

// GPS 위치권한 패키지
import 'package:geolocator/geolocator.dart';
// 카카오 지도 웹뷰 패키지
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

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
  
  String _selectedRadius = '반경 1km';
  final List<String> radiusOptions = ['반경 1km', '반경 3km', '반경 5km'];
  
  String _selectedAge = '20대 초중반';
  final List<String> ageOptions = ['20대 초중반', '20대 후반', '30대 초반', '상관없음'];

  Position? _currentPosition;
  bool _isLoadingLocation = true;

  // 👥 [핵심 추가] 거리별 가짜 회원 리스트 (필터링을 위해 distanceValue 추가)
  final List<Map<String, dynamic>> _allDummyUsers = [
    {'distanceValue': 0.3, 'distance': '300m', 'gender': '여', 'name': '지은', 'interest': '카페 탐방', 'status':'NONE'},
    {'distanceValue': 0.8, 'distance': '800m', 'gender': '남', 'name': '민준', 'interest': '한강 산책', 'status':'NONE'},
    {'distanceValue': 1.2, 'distance': '1.2km', 'gender': '여', 'name': '수연', 'interest': '영화 보기', 'status':'SENT'},
    {'distanceValue': 2.5, 'distance': '2.5km', 'gender': '남', 'name': '동현', 'interest': '술 한잔','status':'NONE'},
    {'distanceValue': 2.8, 'distance': '2.8km', 'gender': '여', 'name': '서연', 'interest': '맛집 탐방','status':'NONE'},
    {'distanceValue': 3.5, 'distance': '3.5km', 'gender': '남', 'name': '지훈', 'interest': '코딩 스터디','status':'RECEIVED'},
    {'distanceValue': 4.1, 'distance': '4.1km', 'gender': '여', 'name': '유진', 'interest': '드라이브','status':'SENT'},
    {'distanceValue': 4.9, 'distance': '4.9km', 'gender': '남', 'name': '현우', 'interest': '동네 산책','status':'SENT'},
    // 반경 5km 밖의 유저 (필터링 테스트용 - 평소엔 안 보여야 함)
    {'distanceValue': 6.5, 'distance': '6.5km', 'gender': '여', 'name': '보영', 'interest': '자전거 타기', 'status':'SENT'}, 
  ];
  //반경에 맞춰 리스트를 걸러주는 함수..
  List<Map<String, dynamic>> get _filteredUsers{
    double maxDistance = 1.0;// 기본값 1km
    if(_selectedRadius == '반경 3km')maxDistance = 3.0;
    if(_selectedRadius == '반경 5km')maxDistance = 5.0;
    //distanceValue가 선택된 반경보다 작거나 같은 유저만 리스트로 반환
return _allDummyUsers.where((user) => user['distanceValue'] <= maxDistance).toList();
  }

  //유저 상태 변경 및 스낵바 알림 함수
  // 누구를(userId), 어떤 상태로(newStatus), 이름이 뭔지(userName) 전달받습니다.
void _updateUserStatus(int userId, String newStatus, String userName){
  //1️⃣ [데이터 변경 구역] setState를 써서 데이터가 바뀌면 화면도 다시 그리도록 합니다.
  setState(() {
//전체 유저리스트()안에서 방금 버튼을 누른 유저의 id와 똑같은 사람을 찾아 그 줄번호를 기억합니다
  final userIndex = _allDummyUsers.indexWhere((u) => u['id'] == userId);

  //만약 일치하는 유저를 찾앗다면 (-1은 못 찾앗다는 뜻)
  if(userIndex != -1){
    //해당 유저의 기존 상태('status)를 지우고 새로운 상태(sent, matched, none)로 덮어 싀웁니다
    _allDummyUsers[userIndex]['status']=newStatus;
  }
  });// 여기까지 실행되면 버튼 모양이 즉각적으로(요청됨, 수락 등) 바뀝니다!

  //2️⃣ [알림창 문구 준비 구역] 화면 아래 띄울 알림 메시지를 담을 빈 상자를 만듭니다.
  String message = '';
  //전달받은 상태값에 따라 알맞은 멘트를 상자에 채워 넣습니다.
  if (newStatus == 'SENT') message = '$userName님에게 매칭을 요청했습니다';
  if (newStatus == 'MATCHED') message = '$userName님과 매칭 성사';
  if (newStatus == 'NONE') message = '$userName님 요청을 거절했습니다';

  //메세지 상자가 비어있지 않고 화면이 정상적으로 켜져 잇다면(mounted)
  if(message.isNotEmpty && mounted) {
    //혹시 방금 전 띄운 알림창이 아직 안 사라졌다면 겹치지 않게 강제로 숨겨줍니다
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    //새로운 알림창 (스낵바)을 화면에 띄웁니다.
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
content: Text(message, style:const TextStyle(fontWeight:FontWeight.bold)),
// 배경색 설정: 매칭 성사(MATCHED)일 때만 파란색, 나머지는 전부 핑크색으로 설정
backgroundColor: newStatus == 'MATCHED' ? Colors.blueAccent : pinkAccent,        
//알림창이 바닥에 딱 붙지 않고 살짝 위로
behavior: SnackBarBehavior.floating,
//알림창이 딱 2초 동안만 보였다가 스르르 사라지도록 설정
duration: const Duration(seconds:2),
        )
    );
  }
}

  // 화면 진입 시 위치기반 권한 스낵바 띄우기
  @override
  void initState(){
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_){
      _checkAndRequestPermissionWithSnackbar();
    });
  }

  // 1단계: 스낵바를 먼저 띄워서 유저 설득
  Future<void> _checkAndRequestPermissionWithSnackbar() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      _showErrorSnackbar('휴대폰의 GPS(위치 서비스)가 꺼져 있습니다');
      return;
    }
    
    LocationPermission permission = await Geolocator.checkPermission();

    if(permission == LocationPermission.denied) {
      if(mounted){
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: const Text(
              '원활한 주변 인연 매칭을 위해 위치 권한이 필요해요 💘',
              style: TextStyle(fontWeight: FontWeight.bold)       
            ),
            backgroundColor: pinkAccent,
            duration: const Duration(days: 365),
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            margin: const EdgeInsets.all(16),
            action: SnackBarAction(
              label: '권한 허용하기',
              textColor: Colors.white,
              onPressed: () async {
                ScaffoldMessenger.of(context).hideCurrentSnackBar(); // 스낵바 닫기
                permission = await Geolocator.requestPermission();
                if(permission == LocationPermission.whileInUse || permission == LocationPermission.always){
                  _getActualLocation(); // 허용되면 위치 가져오기
                } else {
                  _showErrorSnackbar('위치 권한이 거부 되었습니다');
                }
              },  
            ),
          ),
        );
      }
    } else if(permission == LocationPermission.deniedForever){
      _showErrorSnackbar('위치 권한이 영구 차단되었습니다. 브라우저 설정에서 허용해 주세요');  
    } else {
      _getActualLocation();
    }
  }

  // 2단계: 실제 위치 가져오기
  Future<void> _getActualLocation() async {
    try {
      Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
      setState((){
        _currentPosition = position;
        _isLoadingLocation = false;
      });
    } catch (e) {
      _showErrorSnackbar('위치를 가져오는데 실패했습니다.');
    }
  }

  // 에러 스낵바
  void _showErrorSnackbar(String message){
    if(mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(message),
          backgroundColor: Colors.redAccent,
          behavior: SnackBarBehavior.floating,
        ),
       );
       setState(() => _isLoadingLocation = false); // 로딩 끄기
    }
  }

  // 하단 대기 유저 더미 데이터
  final List<Map<String, dynamic>> nearbyUsers = [
    {'distance': '800m', 'gender': '여', 'name': '지은', 'interest': '카페 탐방'},
    {'distance': '1.2km', 'gender': '남', 'name': '민준', 'interest': '한강 산책'},
    {'distance': '2.5km', 'gender': '여', 'name': '수연', 'interest': '영화 보기'},
  ];

  @override
  Widget build(BuildContext context) {
//추가
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
                                    // 기존 스와이프 매칭 화면으로 넘어가기
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

  // 카카오 지도 렌더링 영역
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

        // 핵심추가: 마커 렌더링
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

  // 카테고리 가로 스크롤 탭
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

  // 드롭다운 행 조립기
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

// 🚀 [새로 추가/변경인 부분] 기존 박스를 진짜 '버튼' 위젯들로 UI를 업그레이드한 구역입니다.
  Widget _buildStatusActionButtons(Map<String, dynamic> user) {
    final status = user['status'];
    final userId = user['id'];
    final userName = user['name'];

    if (status == 'NONE') {
      // 1. [아무 상태 아님 -> 요청 가능]
      return SizedBox(
        height: 32,
        // 👉 [추가됨] 단순 박스 대신 터치 효과가 있는 진짜 버튼(ElevatedButton)을 적용했습니다.
        child: ElevatedButton(
          // 👉 [추가됨] 버튼의 배경색(핑크), 글자색(흰색), 모서리 둥글기 등을 깔끔하게 세팅합니다.
          style: ElevatedButton.styleFrom(
            backgroundColor: pinkAccent,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            elevation: 0, // 👉 [추가됨] 그림자를 없애서 요즘 유행하는 깔끔한 플랫 디자인으로 만듭니다.
          ),
          onPressed: () => _updateUserStatus(userId, 'SENT', userName),
          child: const Text('요청', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
        ),
      );
    } else if (status == 'SENT') {
      // 2. [내가 이미 요청을 보낸 상태]
      return SizedBox(
        height: 32,
        // 👉 [추가됨] 이미 눌러서 비활성화된 느낌을 주기 위해 버튼 색을 어두운 회색(cardColor)으로 바꿨습니다.
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: cardColor,
            foregroundColor: subTextColor,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            // 👉 [추가됨] 얇은 테두리(BorderSide)를 줘서 어두운 배경에 묻히지 않고 버튼처럼 보이게 구분해줍니다.
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
              side: BorderSide(color: subTextColor.withOpacity(0.3)),
            ),
            elevation: 0,
          ),
          // 👉 [추가됨] onPressed에 기능을 아예 안 넣으면(null), 버튼이 회색으로 '비활성화'되어 안 눌리게 됩니다!
          onPressed: null, 
          child: const Text('요청됨', style: TextStyle(fontSize: 13)),
        ),
      );
    } else if (status == 'RECEIVED') {
      // 3. [상대방이 나에게 요청을 보낸 상태]
      // 👉 [추가됨] 수락과 거절 버튼 2개를 나란히 띄우기 위해 Row(가로 정렬 위젯)로 묶었습니다.
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            height: 32,
            // 👉 [추가됨] '수락'은 눈에 띄어야 하므로 파란색 바탕의 일반 버튼(ElevatedButton)으로 만들었습니다.
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
          const SizedBox(width: 6), // 👉 [추가됨] 수락 버튼과 거절 버튼 사이의 띄어쓰기 간격입니다.
          SizedBox(
            height: 32,
            // 👉 [추가됨] '거절'은 덜 강조하기 위해 배경색이 투명하고 테두리만 있는 버튼(OutlinedButton)을 썼습니다!
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
      // 4. [서로 매칭이 성사된 상태]
      return SizedBox(
        height: 32,
        // 👉 [추가됨] 글자 옆에 예쁜 하트나 전화기 모양의 '아이콘'을 넣을 수 있는 'ElevatedButton.icon'을 썼습니다.
        child: ElevatedButton.icon(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.purpleAccent,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            elevation: 0,
          ),
          onPressed: () {
            // 👉 [추가됨] 추후 여기에 백엔드 통화 기능이나 채팅창으로 이동하는 코드를 연결하면 됩니다.
          },
          // 👉 [추가됨] 버튼 왼쪽 위에 작은 하트 아이콘(Icons.favorite)을 띄워줍니다.
          icon: const Icon(Icons.favorite, size: 14),
          label: const Text('매칭됨', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
        ),
      );
    }
    
    return const SizedBox.shrink();
  }



  // 주변 대기 유저 리스트 UI
  Widget _buildNearbyUsersList(List<Map<String, dynamic>> users) {
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
              final user = users[index];//변경
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
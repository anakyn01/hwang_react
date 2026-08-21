import 'package:flutter/material.dart';
//플러터 기본 UI 도구 모음
import 'package:http/http.dart' as http;
//백엔드 통신을 위한 http 패키지 가져오기
import 'dart:convert';
//JSON 데이터를 다루기 위한 변환 도구 가져오기
import 'package:flutter_card_swiper/flutter_card_swiper.dart';

//추가 앞으로 여기에 업뎃
import 'screens/signup_profile_screen.dart';

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
title:'SPARK Dating Web',
debugShowCheckedModeBanner: false,// 오른쪽 위 'DEBUG' 띠 숨기기
theme:ThemeData(//앱 전체의 기본 디자인(테마) 설정
//primarySwatch: Colors.pink,
brightness:Brightness.dark,
scaffoldBackgroundColor: const Color(0xFF12121A),// 배경색 (다크 네이비)
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
// 백엔드에서 받은 JSON 데이터를 Profile 객체로 변환해주는 도구
  factory Profile.fromJson(Map<String, dynamic> json){
    return Profile(
      id: json['id'], 
      //SON의 'id' 값을 모델의 id에 넣음
      nickname: json['nickname'], 
      // JSON의 'nickname' 값을 넣음
      age: json['age']?? 20, 
      //// 나이 값이 없으면 기본값 20으로 설정
      bio: json['bio']?? '',
      //자기소개가 없으면 빈 칸으로 설정
      photoUrl:json['photo_url'],
      //사진 주소 넣음
      );
  }
}
// 화면 내용이 계속 변할 수 있는(상태를 가지는) 홈 화면 위젯
class DatingHomeScreen extends StatefulWidget{
  const DatingHomeScreen({super.key});

//// 상태 관리 객체 생성
  @override
  State<DatingHomeScreen> createState() => _DatingHomeScreenState();
}

//실제 화면이 변하는 모습을 관리하는 '조종석'
class _DatingHomeScreenState extends State<DatingHomeScreen>{
  //스와이프 동작을 제어하는 컨트롤러
  //카드를 왼쪽, 오른쪽으로 휙휙 넘기는 동작을 제어하는 리모컨입니다.
  final CardSwiperController controller = CardSwiperController();
  /*
화면에 보여줄 여러 명의 유저 정보를 
차곡차곡 담아둘 빈 바구니(리스트)를 준비합니다.
   */
  List<Profile> profiles =[];
  //지금 서버에서 데이터를 '가져오는 중'인지 표시하는
  bool isLoading= true;

  //add
  int _selectedIndex = 0;

  @override
  //이 화면이 사용자에게 딱 처음 보여지기 직전에 단 한 번만 실행되는 준비 운동 같은 함수
  void initState(){
super.initState();
fetchProfiles();
// 화면이 뜨기 전에 서버에 "유저 목록 좀 줘!"라고 요청하는 함수
  }
  /*백엔드 서버에 접속해서 유저 데이터를 가져오는 함수
  (시간이 걸리니까 비동기인 async를 씁니다)
  */
  Future<void> fetchProfiles() async{
try{
 /*내 컴퓨터(localhost)의 3000번 주소에 있는 백엔드에게 데이터를 달라고 똑똑 
 완료될 때까지 기다립니다(await).
 */
final response = await http.get(Uri.parse('http://localhost:3000/api/profiles'));
if(response.statusCode == 200) {
  //서버가 "응, 여기 있어!" 하고 정상(200)적으로 대답했다면
  final body = json.decode(response.body);
  //서버가 "응, 여기 있어!" 하고 정상(200)적으로 대답했다면
  final List<dynamic> data = body['data'];
  //푼 데이터 중에서 진짜 유저 목록이 들어있는 'data' 부분만 쏙 빼냅니다
  setState(() {
    //플러터에게 "데이터 가져왔으니까 화면 새로고침해서 다시 그려줘!"라고 명령
    profiles = data.map((json) => Profile.fromJson(json)).toList();
    //서버 데이터를 아까 만든 Profile 바구니 하나씩 담습니다
    isLoading = false;
  });
}
} catch (e) {
  // 만약 서버가 꺼져있거나 에러가 났을 때 작동하는 비상 대책입니다.
  setState(() {
    profiles = [// 백엔드가 없어도 화면이 잘 나오는지 테스트하기 위해
Profile(id: 1, nickname: '테스터1', age: 25, bio: '안녕! 프론트엔드 테스트 중이야', photoUrl: 'https://picsum.photos/400/600'),
Profile(id: 2, nickname: '테스터2', age: 28, bio: '왼쪽 오른쪽 스와이프 해봐!', photoUrl: 'https://picsum.photos/400/601'),
    ];
    isLoading = false;
  });
}
  }
// 사용자가 카드를 좋아요(오른쪽) 또는 싫어요(왼쪽)로 넘겼을 때, 그 결과를 백엔드 서버로 알려주는 함수입니다.
Future<void> handleSwipe(int targetUserId, String action) async {
  try{//// 이번엔 데이터를 달라고 하는 게(get) 아니라, 우리의 선택 결과를 서버로 보냅니다(post).
    await http.post(
Uri.parse('http://localhost:3000/api/swipe'),
headers: {'Content-Type':'application/json'},
body:json.encode({
  'sender_id':1, 'receiver_id':targetUserId, 'action':action,
}),
    );
  } catch (e) {
    print('서버 통신 실패 (프론트 UI만 동작 중입니다)');
  }
}

//여기서부터 진짜 눈에 보이는 화면(UI)을 그리기 시작
@override
Widget build(BuildContext context){
  return Scaffold(//앱의 뼈대(지붕, 바닥, 몸통)를 만들어주는 위젯
appBar: AppBar(//화면 맨 위에 달리는 상단바
//add
backgroundColor:Colors.transparent,
elevation:0,
title: const Row(
  children:[
Icon(Icons.auto_awesome, color:Color(0xFFFF4B93), size:24),
SizedBox(width:4),
Text('SPARK',
style:TextStyle(color:Color(0xFFFF4B93), fontSize:22,
fontWeight:FontWeight.w900, letterSpacing:1.2),
),   
],
),
actions:[
// 알림 아이콘
_buildTopIcon(Icons.notifications_none),
const SizedBox(width:8),
/*[기능 추가] 설정 아이콘 누르면 프로필
(회원가입) 화면으로 이동!*/
GestureDetector(
  onTap:(){
Navigator.push(context, MaterialPageRoute(
  builder: (context) => const SignupProfileScreen()));    
  },
  child: _buildTopIcon(Icons.settings_outlined),
),
const SizedBox(width: 16),
],
),
body:isLoading
? const Center(child: CircularProgressIndicator())
//// (예) 로딩 중이면, 화면 정중앙(Center)에 뱅글뱅글 
///도는 로딩 아이콘을 보여줍니다.
: profiles.isEmpty //(아니오) 로딩이 끝났습니다. 그럼 또 질문합니다
? const Center(child: Text('더 이상 추천할 프로필이 없습니다.'))
: Center(
  child: SizedBox(
    width:400, height:600,
    child: CardSwiper(
      controller: controller,
      cardsCount:profiles.length,
      onSwipe:(previousIndex, currentIndex, direction){
        //사용자가 손가락이나 마우스로 카드를 넘기는 순간 실행됩니다.
        final swipedProfile = profiles[previousIndex];
        //방금 화면 밖으로 날아간 사람이 누구인지 확인합니다.
        // 방향(direction)이 오른쪽(right)이면 'LIKE', 
        //다른 쪽이면 'DISLIKE'라고 결정합니다.
final action = direction == CardSwiperDirection.right ? 'LIKE' : 'DISLIKE';
handleSwipe(swipedProfile.id, action);
// 결정된 좋아요/싫어요 결과를 서버로 전송하는 함수를 부릅니다.
return true;
      },// 한 장 한 장의 카드 모양을 직접 예쁘게 꾸미는 공장입니다.
cardBuilder: (context, index, percentX, percentY){
  // 지금 그리고 있는 카드의 주인이 누구인지 데이터를 꺼냅니다.
  final profile = profiles[index];
  return Card(//// 둥근 모서리와 그림자가 있는 예쁜 흰색 종이 깔아줍니다
  elevation: 6,//종이가 바닥에서 얼마나 떠있는지(그림자 깊이)를 6만큼 줍니다. 숫자가 클수록 입체적입니다.
shape:RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
//사진이 종이 밖으로 튀어나오면 깔끔하게 가위로 잘라냅니다.
clipBehavior: Clip.antiAlias,
child:Stack(//종이 위에 사진, 글씨 등을 햄버거처럼 층층이 겹쳐서 쌓을 수 있게 해주는 도구입니다.
fit:StackFit.expand,
//겹쳐진 내용물들이 종이 크기에 꽉 차게 늘립니다.
children: [//이제 1층(사진), 2층(글씨) 순서대로 쌓아 올립니다.
profile.photoUrl != null
//이 사람의 사진 주소가 혹시 비어있지 않고 잘 있나요?
? Image.network(profile.photoUrl!, fit:BoxFit.cover)
//사진을 가져와서 카드에 빈틈없이 꽉 채워(cover) 그립니다
: Container(color:Colors.grey[300], child: const Icon(Icons.person, size:100)),
Positioned(
  bottom: 0, left:0, right:0,
  child:Container(
    padding: const EdgeInsets.all(20),
    //// 상자 안쪽으로 20만큼 여백(쿠션)을 줍니다. 
    ///글씨가 벽에 너무 붙지 않게요.
  decoration: const BoxDecoration(
    gradient: LinearGradient(
      colors: [Colors.transparent, Colors.black87],
 begin: Alignment.topCenter,
 end:Alignment.bottomCenter, 
      ),
  ),
  child:Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    //세워둔 글씨들을 왼쪽 벽으로 가지런히 정렬합니다.
    children: [
      Text(// 닉네임과 나이를 보여주는 글씨입니다.
      '${profile.nickname}, ${profile.age}',
      style:const TextStyle(color: Colors.white, fontSize:24, fontWeight:FontWeight.bold),
      ),
      const SizedBox(height: 8),
      Text(
        profile.bio,
        style:const TextStyle(color:Colors.white70, fontSize:16),
      ),
    ],
    ),
  ),
),
],
),
  );

},      
    ),
  ),
),
  );
}

}

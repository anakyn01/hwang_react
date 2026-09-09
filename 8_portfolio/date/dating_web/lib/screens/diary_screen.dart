 import 'package:flutter/material.dart';

 class DiaryScreen extends StatefulWidget{
  const DiaryScreen({super.key});

  @override
  State<DiaryScreen> createState() => _DiaryScreenState();
 }

 class _DiaryScreenState extends State<DiaryScreen> {
  // 🎨 테마 색상 설정
  final Color bgColor = const Color(0xFF12121A);
  final Color cardColor = const Color(0xFF22222E);
  final Color pinkAccent = const Color(0xFFFF4B93);
  final Color purpleAccent = const Color(0xFFB635F7);
  final Color subTextColor = const Color(0xFFA0A0B0);

  //상태관리 변수
  int _selectedMoodIndex = 2;//기본 선택된 기분 (😊)
  final int _selectedDateIndex = 3;//기본 선택된 날짜

  //이모지 리스트
  final List<String> moods = ['😢', '😐', '😊', '😄', '🥰'];

  //주간 달력 데이터 (테스트용)
  final List<Map<String, dynamic>> weekDates = [
{'day': '월', 'date': '16', 'hasDiary': false},
    {'day': '화', 'date': '17', 'hasDiary': true},
    {'day': '수', 'date': '18', 'hasDiary': true},
    {'day': '목', 'date': '19', 'hasDiary': false},
    {'day': '금', 'date': '20', 'hasDiary': false},
    {'day': '토', 'date': '21', 'hasDiary': false},
    {'day': '일', 'date': '22', 'hasDiary': false},
  ];

  @override
  Widget build(BuildContext context){
    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
backgroundColor: bgColor, 
elevation: 0,
title:const Text(
  '나의 일기',
  style:TextStyle(
    fontSize:24, fontWeight:FontWeight.bold,
    color:Colors.white),
),
actions: [
  Container(
    margin:const EdgeInsets.only(right:20, top:10, bottom:10),
  decoration: BoxDecoration(
    gradient: LinearGradient(
      colors: [pinkAccent, purpleAccent],
      begin:Alignment.centerLeft,
      end:Alignment.centerRight,     
      ),
borderRadius:BorderRadius.circular(20),
  ),
  child:Material(
color:Colors.transparent,
child:InkWell(
borderRadius:BorderRadius.circular(20),
onTap:(){
print("일기 작성 클릭됨");
},
child:const Padding(
  padding:EdgeInsets.symmetric(horizontal: 16, vertical:0),
  child:Center(
    child:Text(
      '+ 작성',
      style:TextStyle(
        color:Colors.white,
        fontWeight:FontWeight.bold,
        fontSize:14),
),
),
),
),    
),
),
],
),
body:SingleChildScrollView(
  child:Column(
crossAxisAlignment:CrossAxisAlignment.start,
children: [
_buildMoodSection(),
Divider(color:cardColor, thickness:1, height:1),
_buildCalendarSection(),
_buildDiaryList(),
const SizedBox(height: 40),  
],
),
),
);
}


// 1️⃣ 오늘의 기분 선택 섹션
  Widget _buildMoodSection() {
    return Container(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('오늘의 기분은?', style: TextStyle(color: subTextColor, fontSize: 15)),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: List.generate(moods.length, (index) {
              bool isSelected = _selectedMoodIndex == index;
              return GestureDetector(
                onTap: () {
                  setState(() => _selectedMoodIndex = index);
                },
                child: Container(
                  margin: const EdgeInsets.only(right: 12),
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: isSelected ? pinkAccent : Colors.transparent,
                      width: 2,
                    ),
                    color: isSelected
                        ? pinkAccent.withValues(alpha: 0.1)
                        : Colors.transparent,
                  ),
                  child: Text(
                    moods[index],
                    style: const TextStyle(fontSize: 32),
                  ),
                ),
              );
            }),
          ),
        ],
      ),
    );
  }

Widget _buildCalendarSection(){
  return Padding(
padding: const EdgeInsets.symmetric(vertical:20),
child:Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: List.generate(weekDates.length, (index){
    final item = weekDates[index];
bool isSelected = _selectedDateIndex == index;
return GestureDetector(
  onTap:(){
    setState(() =>  _selectedDateIndex == index);      
    },
    child:Column(
      children: [
        Text(
          item['day'],
          style:TextStyle(
color:isSelected ? Colors.white : subTextColor,
fontSize:14,            
),
),
const SizedBox(height:12),
Container(
  width:44, height:44,
  decoration: BoxDecoration(
    shape:BoxShape.circle,
    gradient: isSelected ? LinearGradient(
      colors: [pinkAccent, purpleAccent],
      begin: Alignment.topLeft,
      end:Alignment.bottomRight,
      )
      : null,
  color:isSelected ? null : Colors.transparent,    
  ),
  child:Center(
    child:Text(
      item['date'],
      style:TextStyle(
        color:Colors.white,
        fontSize:18,
        fontWeight:
isSelected ? FontWeight.bold : FontWeight.normal,
),
),
),
),
const SizedBox(height: 6),
                // 일기가 있는 날짜 아래에 찍히는 핑크색 점
                Container(
                  width: 4,
                  height: 4,
                  decoration: BoxDecoration(
                    color: item['hasDiary'] ? pinkAccent : Colors.transparent,
                    shape: BoxShape.circle,
                  ),
                )
              ],
            ),
          );
        }),
      ),
    );
  }

// 3️⃣ 일기 목록 섹션
  Widget _buildDiaryList() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildDiaryItem(
            dateText: '6월 19일 목요일',
            emoji: '😊',
            title: '오늘 처음으로 매칭이 됐어요',
            content: 'SPARK에서 처음으로 매칭이 성사됐어요! 상대방이 먼저 메시지를 보내줬는데 너무 설레고...',
            time: '오후 9:32',
            isPublic: false,
          ),
          const SizedBox(height: 24),
          _buildDiaryItem(
            dateText: '6월 18일 수요일',
            emoji: '🥰',
            title: '카페에서의 첫 만남',
            content: '드디어 오프라인으로 만났어요. 홍대 카페에서 3시간이나 이야기했는데 시간이 너무 빨리...',
            time: '오후 11:15',
            isPublic: true,
          ),
        ],
      ),
    );
  }

  // 🛠️ 개별 일기 카드 위젯 
  Widget _buildDiaryItem({
    required String dateText,
    required String emoji,
    required String title,
    required String content,
    required String time,
    required bool isPublic,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          dateText,
          style: TextStyle(
              color: subTextColor, fontSize: 14, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: cardColor,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(emoji, style: const TextStyle(fontSize: 36)),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      content,
                      style: TextStyle(
                          color: subTextColor, fontSize: 14, height: 1.4),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        Text(time,
                            style:
                                TextStyle(color: subTextColor, fontSize: 12)),
                        const SizedBox(width: 12),
                        Icon(
                          isPublic ? Icons.language : Icons.lock,
                          color: subTextColor,
                          size: 14,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          isPublic ? '공개' : '비공개',
                          style: TextStyle(color: subTextColor, fontSize: 12),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
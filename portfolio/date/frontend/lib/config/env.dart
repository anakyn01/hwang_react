//kReleaseMode를 쓰기 위해 필수
import 'package:flutter/foundation.dart';

class Env{
    static String get serverUrl {
        if(kReleaseMode){
            return 'https://datebackend-yf90.onrender.com';
        }else {
            return 'http://localhost:3000';
        }
    }
}
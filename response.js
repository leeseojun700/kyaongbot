/*
 - 이 소스에는 GPL 3.0이 적용되어있습니다.
 <one line to give the program's name and a brief idea of what it does.>
 캬옹봇 Copyright (C) 2018  불여우
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
var updatecode = "1926"
var error = false;
var first = 0;
const count = {};
const daycounter = {};
const hourcounter = {};
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
// 배열 백업 기능!
try {
  var loadArray = JSON.parse(DataBase.getDataBase("saveArray")); //배열이름의 배열 덩어리를 쪼개서 다시 배열로 만들기
  for (var i = 0; loadArray.length > i; i++) { //배열이름마다 배열덩어리를 배열로 쪼개기 반복
    eval(loadArray[i] + " = JSON.parse(DataBase.getDataBase(loadArray[i]))"); //동적변수를 가져오는데 eval을 사용
  }
} catch (e) {}

function getTimeStamp() {
  var d = new Date();
  var s =
    leadingZeros(d.getFullYear(), 4) + '-' +
    leadingZeros(d.getMonth() + 1, 2) + '-' +
    leadingZeros(d.getDate(), 2) + ', ' +

    leadingZeros(d.getHours(), 2) + ':' +
    leadingZeros(d.getMinutes(), 2) + ':' +
    leadingZeros(d.getSeconds(), 2);

  return s;
}

function ShortStamp1() {
  var d = new Date();
  var s =
    leadingZeros(d.getFullYear(), 4) + '-' +
    leadingZeros(d.getMonth() + 1, 2) + '-' +
    leadingZeros(d.getDate() - 1, 2);

  return s;
}

function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}

function getHtml(text) {
  var content = new java.io.ByteArrayOutputStream();
  android.net.http.AndroidHttpClient.newInstance("userAgent").execute(new org.apache.http.client.methods.HttpGet(text)).getEntity().writeTo(content);
  content.close();
  var str = String(content.toString());
  return str;
}

function wiki(query) {
  kiwi = Utils.getWebText('http://49.236.137.7/wiki/' + query)
  kiwi = kiwi.substring(32)
  kiwi = kiwi.substring(0, kiwi.length - 17)
  return kiwi.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "")
}


const UPDATE = {};
UPDATE.saveData = function(msg) { //파일에 내용을 저장하는 함수
  try { //사실, 나도 어디서 긁어와서 이곳저곳에서 사용하는 거임
    var file = new java.io.File(sdcard + "/kbot/response.js");
    var fos = new java.io.FileOutputStream(file);
    var str = new java.lang.String(msg);
    fos.write(str.getBytes());
    fos.close();
  } catch (e) {
    Log.debug(e + " At:" + e.lineNumber);
  }
};
var ver = "3.4(철퇴)"
var dev = "불여우"
var license = "GPL"
const preMsg = {}; //도배 방지용 객체
var admin = ["불여우", "AMD TR™", "rgb", "K'romium", "케이시", "DEBUG$MODE*NAME+", "Apz74"]
var enkey = "thebestfirefoxintheworld"
var words = ["쉬바", "쓰버", "10새", "10새기", "10새리", "10세리", "10쉐이", "10쉑", "10스", "10쌔", " 10쌔기", "10쎄", "10알", "10창", "10탱", "18것", "18넘", "18년", "18노", "18놈", "18뇬", "18럼", "18롬", "18새", "18새끼", "18색", "18세끼", "18세리", "18섹", "18쉑", "18스", "18아", "ㄱㅐ", "ㄲㅏ", "ㄲㅑ", "ㄲㅣ", "ㅅㅂㄹㅁ", "ㅅㅐ", "ㅆㅂㄹㅁ", "ㅆㅍ", "ㅆㅣ", "ㅆ앙", "凸", " 갈보", "갈보년", "같은년", "같은뇬", "개같은", "개구라", "개년", "개놈", "개뇬", "개대중", "개독", "개돼중", "개랄", "개보지", "개뻥", "개뿔", "개새", "개새기", "개새끼", "개새키", "개색기", "개색끼", "개색키", "개색히", "개섀끼", "개세", "개세끼", "개세이", "개소리", "개쑈", " 개쇳기", "개수작", "개쉐", "개쉐이", "개쉑", "개쉽", "개스끼", "개시키", "개십새기", " 개십새끼", "개쐑", "개씹", "개아들", "개자슥", "개자지", "개접", "개좆", "개좌식", "개허접", "걔새", "걔수작", "걔시끼", "걔시키", "걔썌", "걸레", "게색기", "게색끼", "광뇬", "구녕", "구라", "그년", "그새끼", "놈현", "뇬", "눈깔", "뉘미럴", "니귀미", "니기미", "니미", "니미랄", "니미럴", "니미씹", "니아배", "니아베", "니아비", "니어매", "니어메", "니어미", "닝기리", "닝기미", "대가리", "뎡신", "도라이", "돈놈", "돌아이", "돌은놈", "되질래", "뒈져", "뒈져라", "뒈진", "뒈진다", "뒈질", " 뒤질래", "등신", "디져라", "디진다", "디질래", "따식", "때놈", "또라이", "똘아이", "똘아이", "뙈놈", "뙤놈", "뙨넘", "뙨놈", "뚜쟁", "띠바", "띠발", "띠불", "띠팔", "메친넘", "메친놈", "미췬", " 미췬", "미친", "미친넘", "미친년", "미친놈", "미친새끼", "미친스까이", "미틴", "미틴넘", "미틴년", " 미틴놈", "바랄년", "뱅마", "뱅신", "벼엉신", "병쉰", "병신", "부랄", "부럴", "불알", "불할", "붕가", "뷰웅", "븅", "븅신", "빌어먹", "빙시", "빙신", "빠가", "빠구리", "빠굴", "빠큐", "뻐큐", "뻑큐", "뽁큐", "상넘이", "상놈을", "상놈의", "상놈이", "새갸", "새꺄", "새끼", "새새끼", "새키", "색끼", "생쑈", "세갸", "세꺄", "세끼", "섹스", "쇼하네", "쉐기", "쉐끼", "쉐리", "쉐에기", "쉐키", "쉑", "쉣", "쉨", "쉬발", "쉬밸", "쉬벌", "쉬뻘", "쉬펄", "쉽알", "스패킹", "스팽", "시궁창", "시끼", "시댕", "시뎅", "시랄", "시발", "시벌", "시부랄", "시부럴", "시부리", "시불", "시브랄", "시팍", "시팔", "시펄", "심발끈", "심탱", "십8", "십라", "십새", "십새끼", "십세", "십쉐", "십쉐이", "십스키", "십쌔", "십창", "십탱", "싶알", "싸가지", "싹아지", "쌉년", "쌍넘", "쌍년", "쌍놈", "쌍뇬", "쌔끼", " 쌕", "쌩쑈", "쌴년", "썅", "썅년", "썅놈", "썡쇼", "써벌", "썩을년", "썩을놈", "쎄꺄", "쎄엑", " 쒸벌", "쒸뻘", "쒸팔", "쒸펄", "쓰바", "쓰박", "쓰발", "쓰벌", "쓰팔", "씁새", "씁얼", "씌파", "씨8", " 씨끼", "씨댕", "씨뎅", "씨바", "씨바랄", "씨박", "씨발", "씨방", "씨방새", "씨방세", "씨밸", "씨뱅", "씨벌", "씨벨", "씨봉", "씨봉알", "씨부랄", "씨부럴", "씨부렁", "씨부리", "씨불", "씨붕", "씨브랄", " 씨빠", "씨빨", "씨뽀랄", "씨앙", "씨파", "씨팍", "씨팔", "씨펄", "씸년", "씸뇬", "씸새끼", "씹같", "씹년", "씹뇬", "씹보지", "씹새", "씹새기", "씹새끼", "씹새리", "씹세", "씹쉐", "씹스키", "씹쌔", "씹이", "씹자지", "씹질", "씹창", "씹탱", "씹퇭", "씹팔", "씹할", "씹헐", "아가리", "아갈이", "아갈통", "아구창", "아구통", "아굴", "얌마", "양년", "양놈", "엄창", "엠병", "여물통", "염병", "엿같", "옘병", "옘빙", "오입", "왜년", "왜놈", "욤병", "육갑", "은년", "을년", "이년", "이새끼", "이새키", "이스끼", "이스키", "임마", "자슥", "잡것", "잡넘", "잡년", "잡놈", "저년", "저새끼", "접년", "젖밥", "조까", "조까치", "조낸", "조또", "조랭", "조빠", "조쟁이", "조지냐", "조진다", "조찐", "  조질래", "존나", "존나게", "존니", "존만", " 존만한", "좀물", "좁년", "좆", "좁밥", "좃까", "좃또", "좃만", "좃밥", "좃이", "좃찐", "좆같", "좆까", "좆나", "좆또", "좆만", "좆밥", "좆이", "좆찐", "좇같", "좇이", "좌식", "주글", "주글래", "주데이", "주뎅", "주뎅이", "주둥아리", "주둥이", "주접", "주접떨", "죽고잡", "죽을래", "죽통", "쥐랄", "쥐롤", "쥬디", "지랄", "지럴", "지롤", "지미랄", "짜식", "짜아식", "쪼다", "쫍빱", "찌랄", "창녀", "캐년", "캐놈", "캐스끼", "캐스키", "캐시키", "탱구", "팔럼", "퍽큐", "호로", "호로놈", "호로새끼", "호로색", "호로쉑", "호로스까이", "호로스키", "후라들", "후래자식", "후레", "후뢰", "씨ㅋ발", "ㅆ1발", "씌발", "띠발", "띄발", "뛰발", "띠ㅋ발", "뉘뮈", "ㅅㅂ", "ㅆㅂ", "ㅂㅅ", "ㅄ", "ㅈㄹ", "좃", "좇", "시바", "바보", "멍청이", "쉬불", "쉬뿔", "ㅈㄴ"]
var notwords = ["도시바", "에이씨벨", "쉬바나", "화염병"]
var saveArray = ["icode", "inick", "call", "caller"] //*******저장할 배열의 이름!*******
DataBase.setDataBase(JSON.stringify(saveArray), "saveArray");

function response(room, msg, sender, isGroupChat, replier, ImageDB) {
  var timea = new Date().getTime(); //반응 속도 측정을 위한 시간 측정
  function setCounter(name) {
    DataBase.setDataBase(Number(DataBase.getDataBase(room)), name)
  }

  function getCounter(name) {
    Number(DataBase.getDataBase(room)) - Number(DataBase.getDataBase(name))
  }

  function loadCounter(from, to) {
    DataBase.setDataBase(Number(DataBase.getDataBase(from)), to)
  }
  try {
    if (room == "불여우") {
      if (msg == "!프사갱신") {
        DataBase.setDataBase(ImageDB.getProfileImage(), "image")
        replier.reply("프사갱신 완료!" + DataBase.getDataBase("image"))
      }
    }
    msg = msg.trim(); //이거 왜있는지 모르면 골롬
    room = room.trim();
    sender = sender.trim();
    /* 카운트 */
    if (DataBase.getDataBase(room) == NaN) {
      DataBase.setDataBase(0, room)
    }
    DataBase.setDataBase(Number(Number(DataBase.getDataBase(room))) + Number(1), room)
    /*도배 방지*/
    if (preMsg[room] == msg) { //채팅 내용이랑 직전에 수신된 채팅 내용이 같으면,
      return; //도배로 간주하고 response 함수 종료
    }
    preMsg[room] = msg; //수신된 채팅 내용 저장
    DataBase.setDataBase(Number(Number(DataBase.getDataBase("rbackup"))) + Number(1), "rbackup");
    /* 공지 카운터 */
    if (count[room] === undefined) { //한 번도 수신된 적이 없는 경우,
      count[room] = 1; //수신된 횟수에 1 저장
    } else { //아니면
      count[room]++; //1증가
    }
    if (count[room] == 300) { //300번 다 채우면,
      replier.reply(DataBase.getDataBase("공지"))
      count[room] = 0; //0으로 초기화
    }
    /* 관리자 명령어 */
    var image = DataBase.getDataBase("image")
    if (ImageDB.getProfileImage() == image) {
      if (msg.indexOf("!eval ") == 0) {
        replier.reply(eval(msg.substring(6)))
      }
    } else if (ImageDB.getProfileImage() != image) {
      if (msg.indexOf("!eval") == 0) {
        replier.reply("관리자가 아닙니다.")
      }
    }
    if (admin.indexOf(sender) > -1) {
      if (admin.indexOf(sender) > -1) {

        if (msg.trim() == "!채팅카운터 리셋") {
          if (DataBase.getDataBase("timenew") != null) {
            DataBase.setDataBase(DataBase.getDataBase("timenew"), "timeold")
          }
          DataBase.setDataBase(getTimeStamp(), "timenew");
          replier.reply(DataBase.getDataBase("timeold") + "\n~\n" + DataBase.getDataBase("timenew") + "\n\n총 채팅 수 " + getCounter("counter") + "회 기록됨");
          loadCounter("counter", "rbackup")
          setCounter("counter")
          replier.reply("초기화 성공");
        }
        /*
         if (msg.trim() == "!채팅카운터 리셋") {
           if (DataBase.getDataBase("timenew") != null) {
             DataBase.setDataBase(DataBase.getDataBase("timenew"), "timeold")
           }
           DataBase.setDataBase(getTimeStamp(), "timenew");
           replier.reply(DataBase.getDataBase("timeold") + "\n~\n" + DataBase.getDataBase("timenew") + "\n\n총 채팅 수 " + Number(DataBase.getDataBase(room)) + "회 기록됨");
           DataBase.setDataBase(Number(DataBase.getDataBase(room)), "rbackup");
           DataBase.setDataBase(0, room);
           replier.reply("초기화 성공");
         }*/

        if (msg.trim() == "!채팅카운터 백업") {
          DataBase.setDataBase(DataBase.getDataBase("timenew"), "timetemp");
          DataBase.setDataBase(DataBase.getDataBase("timeold"), "timenew");
          DataBase.setDataBase(DataBase.getDataBase("timetemp"), "timeold");
          loadCounter("counter", "rtemp")
          loadCounter("rbackup", "counter")
          loadCounter("rtemp", "rbackup")
          replier.reply("백업이 완료되었습니다.\n기존 시점은 " + DataBase.getDataBase("timeold") + ",\n백업 시점은 " + DataBase.getDataBase("timenew") + " 입니다.");
        }
        if (msg == "!리로드") {
          for (var i = 0; saveArray.length > i; i++) { //배열명 배열 안의 변수마다 반복
            DataBase.setDataBase(JSON.stringify(eval(saveArray[i])), saveArray[i]); //배열명(eval로 로드)마다 배열을 합친 덩어리를 값으로 DB에 저장
          }
          Api.reload();
          replier.reply("리로드 완료!")
        }
        if (msg == "!업데이트") {
          replier.reply("다운 중...")
          UPDATE.saveData(getHtml("https://raw.githubusercontent.com/chanoo104/kyaongbot/master/response.js"));
          replier.reply("업데이트 코멘트(수정자가 등록함)\n" + getHtml("https://github.com/chanoo104/kyaongbot/commit/master").split('<p class="commit-title">')[1].split("</p>")[0].trim());
          for (var i = 0; saveArray.length > i; i++) { //배열명 배열 안의 변수마다 반복
            DataBase.setDataBase(JSON.stringify(eval(saveArray[i])), saveArray[i]); //배열명(eval로 로드)마다 배열을 합친 덩어리를 값으로 DB에 저장
          }
          Api.reload();
          replier.reply("리로드 완료!")
          if (error == false) {
            replier.reply("업데이트 성공!")
          } else if (error == true) {
            replier.reply("업데이트 실패..")
          }
        }
        if (msg == "!예비업데이트") {
          Api.reload();
          replier.reply("리로드 완료!")
        }
        if (msg == "!예비리로드") {
          UPDATE.saveData(getHtml("https://raw.githubusercontent.com/chanoo104/kyaongbot/master/response.js"));
          Api.reload();
          replier.reply("리로드 완료!")
        }
        if (msg == "!프사") {
          var img = ImageDB.getProfileImage();
          replier.reply(img);
        }
        if (msg == "!초기화") {
          replier.reply(sender + "님의 욕설 카운터를 초기화 시켰습니다.");
          DataBase.setDataBase("0", sender); //새로 저장
        }
        if (msg.indexOf("!초기화 ") == 0) {
          replier.reply(msg.substring(5) + "님의 욕설 카운터를 초기화 시켰습니다.");
          DataBase.setDataBase("0", msg.substring(5)); //새로 저장
        }
      }
    }
    /* 관리자 아닐시 보내는 문구 */
    else if (admin.indexOf(sender) == -1) {
      if (msg == "!채팅카운터 리셋") {
        replier.reply("관리자가 아닙니다.")
      }
      if (msg == "!채팅카운터 백업") {
        replier.reply("관리자가 아닙니다.")
      }
      if (msg == "!리로드") {
        replier.reply("관리자가 아닙니다.")
      }
      if (msg == "!업데이트") {
        replier.reply("관리자가 아닙니다.")
      }
      if (msg == "!프사") {
        replier.reply("관리자가 아닙니다.")
      }
      if (msg == "!초기화") {
        replier.reply("관리자가 아닙니다.")
      }
    }
    /*if (new Date().getDate() != DataBase.getDataBase("countday")) {
          DataBase.setDataBase(Number(DataBase.getDataBase(daycounter)), "daycache");
          replier.reply(ShortStamp1() + "\n지난 하루동안 올라온 채팅 수: " + Number(DataBase.getDataBase(daycounter)) + "개");
          DataBase.setDataBase(0, daycounter);
          DataBase.setDataBase(new Date().getDate(), "countday");
        }
        if (new Date().getHours() != DataBase.getDataBase("counthour")) {
          DataBase.setDataBase(Number(DataBase.getDataBase(hourcounter)), "hourcache");
          replier.reply("지난 한시간동안 올라온 채팅 수: " + Number(DataBase.getDataBase(hourcounter)) + "개");
          DataBase.setDataBase(0, hourcounter);
          DataBase.setDataBase(new Date().getHours(), "counthour");
        }
 */
    if (msg.trim() == "!공지카운터") {
      replier.reply(count[room] + "/300\n캬옹봇의 챗은 계산하지 않음.")
    }
    if (msg.trim() == "!채팅카운터") {
      replier.reply(DataBase.getDataBase("timenew") + " ~\n\n" + getCounter("counter") + "회")
    }
    /*
         if (msg == "!카운트") {
           replier.reply("어제 하루동안 " + DataBase.getDataBase("daycache") + "개,\n지난 한시간동안 " + DataBase.getDataBase("hourcache") + "개\n의 채팅이 올라옴")
         }
         */
    if (msg == "!업뎃") {
      replier.reply(updatecode)
    }
    if (msg == "!호출코드 확인") {
      if (inick.indexOf(sender) != -1) { //식별코드-닉네임 배열 안에 전송자의 닉네임이 있는지 확인
        var tn1 = inick.indexOf(sender);
        var tn2 = icode[tn1];
        replier.reply(tn2);
      } else {
        var tcheck = false; //while 탈출용 변수
        while (tcheck === false) { //while 값이 false일 동안

          var n = Math.floor(Math.random() * 9000 + 1000); //랜덤 네자리수 생성
          if (icode.indexOf(n) == -1) { //생성한 숫자가 기존 식별코드 배열 안에 있는지 확인
            inick.push(sender); //식별코드-닉네임 배열 안에 전송자의 닉네임 추가
            icode.push(n); //식별코드 배열 안에 전송자의 식별코드 추가
            replier.reply(sender + " (신규발급)\n" + n);
            var tcheck = true; //없으면 tcheck 값을 true로 바꾸고 while문 탈출
          }
        }
      }
    }
    if (inick.indexOf(sender) == -1) { //식별코드-닉네임 배열 안에 전송자의 닉네임이 있는지 확인
      var tcheck = false; //while 탈출용 변수
      while (tcheck === false) { //while 값이 false일 동안

        var n = Math.floor(Math.random() * 9000 + 1000); //랜덤 네자리수 생성
        n += ""; //중요: 숫자->문자 형변환 (DB가 문자 타입!)
        if (icode.indexOf(n) == -1) { //생성한 숫자가 기존 식별코드 배열 안에 있는지 확인
          inick.push(sender); //식별코드-닉네임 배열 안에 전송자의 닉네임 추가
          icode.push(n); //식별코드 배열 안에 전송자의 식별코드 추가
          var tcheck = true; //없으면 tcheck 값을 true로 바꾸고 while문 탈출
                  
          replier.reply("안녕하세요 " + sender + "님, 자유로운 컴퓨터 커뮤니티 컴퓨톡에 오신 것을 환영합니다.\n<!명령어>로 명령어를, <!공지>로 공지를, <!호출?>로 호출기능의 도움말을 확인하세요.\n당신의 호출코드는 [" + n + "]입니다.")
        }
      }
    }
    if (msg == "!호출?") {
      replier.reply("▼<!호출> 기능 도움말▼\n\n!호출 [닉네임]\n [닉네임] 님을 호출합니다.\n!코드호출 [호출코드]\n [호출코드]에 해당되는 사람을 호출합니다.\n!호출코드 확인\n 자신의 호출코드를 확인합니다.\n!코드변경 [1000~9999의 정수]\n 자신의 호출코드를 해당 수로 변경합니다.\n!호출코드 목록\n 전화번호부처럼 호출코드 목록을 출력합니다.")
    }
    if (msg.split(" ")[0] == "!코드변경") {
      var to = msg.split("!코드변경 ")[1]
      if (parseInt(to) < 10000 && parseInt(to) > 999) {
        var x = inick.indexOf(sender);
        var com = icode[x];
        if (icode.indexOf(to) != -1) {
          replier.reply("이미 사용중인 호출코드입니다.");
        } else {
          icode.splice(icode.indexOf(com), 1, to);
          replier.reply("호출코드가 변경되었습니다.");
        }
      } else {
        replier.reply("1000에서 9999까지의 숫자를 입력해 주십시오.");
      }
    }
    loop:
      if (msg.split(" ")[0] == "!호출") {
        var com = msg.split("!호출 ")[1]
        if (call.indexOf(com) != -1 && caller.indexOf(sender) != -1) {

          var position1 = new Array();
          var pos1 = call.indexOf(com);
          while (pos1 > -1) {
            position1.push(pos1);
            pos = call.indexOf(com, pos1);
          }
          var position2 = new Array();
          var pos2 = caller.indexOf(sender);
          while (pos2 > -1) {
            position2.push(pos2);
            pos = caller.indexOf(com, pos2);
          }

          let tempArr = [];
          let uniqueArr = [];
          for (let i of position1) { // 첫번째 배열을 반복하면서 
            tempArr[i] = i; // 각 값에 따른 인덱스에 해당 값을 저장
          } // 이렇게하면 tempArr 의 1, 4, 5, ~ 99, 100 번째 인덱스에 값이 저장되고
          for (let i of position2) { // 두번째 배열을 반복하면서
            if (tempArr[i] != -1) {
              replier.reply("이미 호출한 상대입니다.")
              break loop; // tempArr의 i 인덱스에 값이 있는지 확인하고 있으면 loop loop를 break
            }
          }
        }
        if (inick.indexOf(com) != -1) {
          call.push(com)
          caller.push(sender)
          replier.reply("상대를 호출했습니다.")
        } else {
          replier.reply("상대의 호출코드가 등록되지 않았습니다.")
        }
      }
    loop:

      if (msg.split(" ")[0] == "!코드호출") {
        var com = msg.split("!코드호출 ")[1]
        var x = icode.indexOf(com)
        var com = inick[x]
        if (call.indexOf(com) != -1 && caller.indexOf(sender) != -1) {

          var position1 = new Array();
          var pos1 = call.indexOf(com);
          while (pos1 > -1) {
            position1.push(pos1);
            pos = call.indexOf(com, pos1);
          }
          var position2 = new Array();
          var pos2 = caller.indexOf(sender);

          while (pos2 > -1) {
            position2.push(pos2);
            pos = caller.indexOf(com, pos2);
          }

          let tempArr = [];
          let uniqueArr = [];
          for (let i of position1) { // 첫번째 배열을 반복하면서 
            tempArr[i] = i; // 각 값에 따른 인덱스에 해당 값을 저장
          } // 이렇게하면 tempArr 의 1, 4, 5, ~ 99, 100 번째 인덱스에 값이 저장되고
          for (let i of position2) { // 두번째 배열을 반복하면서
            if (tempArr[i] != -1) {
              replier.reply("이미 호출한 상대입니다.")
              break loop; // tempArr의 i 인덱스에 값이 있는지 확인하고 있으면 loop loop를 break
            }
          }
        }
        if (inick.indexOf(com) != -1) {
          call.push(com)
          caller.push(sender)
          replier.reply("상대를 호출했습니다.")
        } else {
          replier.reply("상대의 호출코드가 등록되지 않았습니다.")
        }
      }
    //호출인식*******************
    while (call.indexOf(sender) != -1) {
      var x = call.indexOf(sender)
      replier.reply(caller[x] + "님이 당신을 찾고 있습니다, " + call[x] + "님.")
      call.splice(x, 1);
      caller.splice(x, 1);
    }
    if (msg == "!호출코드 목록") {
      ilist = [];
      for (var i = 0; i < icode.length; i++) {
        ilist.push(icode[i]);
        ilist.push(" - ");
        ilist.push(inick[i]);
        ilist.push("\n");
      }
      rep = ilist.join([separator = '']);      
      replier.reply("호출코드 목록\n▼전체보기 클릭▼\n​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​\n" + rep);
    }

    if (msg == "!공지") {
      replier.reply(DataBase.getDataBase("공지"))
      count[room] = 0
    }
    if (msg.trim() == "!실검") { //!실검 이면
      var 실검 = [];
      for (var abab = 1; abab < 21; abab++) {
        실검.push(abab + ". " + getHtml("http://rank.search.naver.net/rank.js").replace(/\"/g, "").split("keyword:")[abab].split(",")[0]); //파싱
      }
      replier.reply(실검.join("\n")); //합해서 보내기
    }
    if (msg == "!날씨") { //!날씨면
      var data = Utils.getWebText("https://m.search.naver.com/search.naver?query=날씨"); //네이버 검색에서 파싱
      var data2 = data.split("전국날씨</strong>"); // 자르기
      var data3 = data2[1].split("특보");
      var data4 = data3[0].replace(/(<([^>]+)>)/g, "");
      data4 = data4.trim();
      data4 = data4.replace(/  /g, ""); //태그 제거
      data4 = data4.replace(/도씨/g, "℃"); //화씨
      data4 = data4.replace(/ /g, ", "); //태그제거
      replier.reply("[현재 날씨]\n" + data4); //보내기
    }
    if (msg == "!명령어") { //명령어
      replier.reply("◆[캬옹봇 " + ver + "] 명령어 목록◇\n▼전체보기 클릭▼스크롤을 쭉 내리세요▼​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​\n[사람들]\n▶!치킨 :: 제작자가 넣고 싶어서 넣음.\n▶!지비 :: 방장이 지비라서\n▶!케이시 :: 케이시가 시켜서\n▶!미쉘 :: 미쉘이 시켜서\n▶!티알 :: 내가 하고싶어서\n▶!불여우 :: '나'니까.\n[유행어 및 랜덤]\n▶ㅇㅈ? :: ㅇㅇㅈ, ㄴㅇㅈ 으로 답해준다.\n▶ㅂㅇㄹ :: 각종 유행어 인사말로 답해준다.\n▶\n소라고둥(포함 시) :: 스폰지밥의 그 소라고둥 맞다.\n▶쓰읍 :: 미쓰 또는 미쓰 테이크로 답해준다.(테스터 훈)\n▶!가위바위보 :: 봇과 가위바위보를 할 수 있다. 사용법: !가위바위보 <가위, 바위(주먹), 보 중 하나>\n▶!주사위 :: 주사위를 굴릴 수 있다.\n[검색 및 정보]\n▶!공지 :: 이 방의 공지를 확인할 수 있다.\n▶!채팅카운터 :: 카운터 초기화 시점부터 지금까지 총 몆개의 채팅이 올라왔는지 알려준다.\n▶!디스코드: 이방의 디스코드 주소를 확인할 수 있다.\n▶!시간 :: 지금 현재 시각을 확인할 수 있다.\n▶!디지털시계 :: 지금 현재 시각을 도트로 확인할 수 있다.\n▶!검색 :: 네이버 검색을 할 수 있다. 사용법: !검색 <검색하고 싶은 것>\n▶!유튜브 :: 유튜브 검색을 할 수 있다. 사용법: !유튜브 <검색하고 싶은 것>\n▶!구글 :: 구글 검색을 할 수 있다. 사용법: !구글 <검색하고 싶은 것>\n▶!나무위키 :: 나무위키 검색을 할 수 있다. 사용법: !나무위키 <검색하고 싶은 것>\n▶!실검 :: 현재 네이버의 실시간 검색어 순위를 확인할 수 있다.\n▶!날씨 :: 현재 전국 날씨를 알려준다.\n▶!지역날씨 :: 현재 지역의 날씨를 알 수 있다. 사용법: !지역날씨 <검색하고 싶은 지역>\n▶!번역 :: 실시간 번역을 할 수 있다. 사용법: !번역 <번역하고 싶은 언어> <번역할 문장>\n▶!언어 :: 번역에서 사용 가능한 언어를 표시합니다.\n▶!차트 :: 네이버 뮤직에서 실시간 차트를 가져옵니다.(느림)\n▶!비트코인 :: 현재 암호화폐의 시세를 알려줍니다.\n▶!가사 :: 노래의 가사를 알려줍니다. 사용법 !가사 <노래 제목>")
    }
    if (msg == "!캬옹봇") {
      replier.reply('캬옹봇 - 자바스크립트 기반 카카오톡 자동응답 매크로 스크립트(이하 캬옹봇이라 지칭)의 제작자는 "불여우"이며, 캬옹봇 소스 코드에는 GPL 라이선스가 적용되어 있고 이를 준수할 시 자유롭게 사용 및 수정할 수 있습니다. 캬옹봇 소스 코드의 일부분 또는 전체를 사용시 본 소스 코드를 포함하여야 하고(원본 배포 전염성) 공개 배포해야 하며(파생물 배포 전염성), 똑같은 라이선스를 적용시켜야 합니다.')
    }
    if (msg == "!차트") { //!차트면
      var charts = [];
      for (var i = 1; i < 51; i++) {
        chart = Utils.getWebText("http://m.music.naver.com/listen/top100.nhn?domain=DOMESTIC")
        var a = chart.split("<span class=\"rank\">")[i].split("</span>")[0];
        var b = chart.split("<strong class=\"tit\"> ")[i].split("</strong>")[0];
        var c = chart.split("<span class=\"stit\">")[i].split("</span>")[0];
        charts.push("순위 : " + a + "\n제목 : " + b + "\n아티스트(앨범) : " + c);
      }
      replier.reply(charts.join("\n=============\n"))
    }
    if (msg == "!닉네임") {
      replier.reply(sender)
    }
    if (msg == "!비트코인") { //만약 비트코인이라면
      var coinone = getHtml("http://api.coinone.co.kr/ticker?currency=all"); //코인원에서 파싱
      var last = coinone.split('"last":"'); // last:" 를 기준으로 자르기
      var currency = coinone.split('"currency":"'); //currenct": 를 기준으로 자르기
      var vmlist = []; //새로운 함수 생성
      for (var i = 1; i <= 9; i++) { //반복
        vmlist.push(currency[i].split('"')[0] + " : " + last[i].split('"')[0]); //변수 생성
      }
      replier.reply(vmlist.join("원\n") + "원"); // 보내기
    }
    try {
      if (msg.indexOf("!단어") == 0) {
        var u = Utils.getWebText("http://krdic.naver.com/search.nhn?query=" + msg.substr(3));
        var a = u.split("<ul class=\"lst3\">")
        var b = a[1].split("</ul>")
        var c = b[0].replace(/(<([^>]+)>)/g, "");
        c = c.replace(/발음재생/g, "")
        c = c.replace(/단어장 저장/g, "")
        c = c.replace(/매우중요/g, "")
        c = c.replace(/유의어/g, "\n\n유의어")
        c = c.trim()
        c = c.replace(/\n         /g, "")
        c = c.replace(/  /g, "\n")
        c = c.replace(/\n\n\n/g, "")
        replier.reply("[" + msg.substr(3) + " 검색 결과]\n\n" + c)
      }
    } catch (e) {
      replier.reply("단어 정보가 없습니다. 다시 입력해보세요.");
    }
    try { //예외처리
      if (msg.indexOf("!롤전적") == 0) {
        msgi = msg.replace(/ /g, "+"); //메세지 부분에 공백부분을 +로 대체해줍니다 (그냥 띄어쓰기용)
        var u = Utils.getWebText("http://www.op.gg/summoner/userName=" + msgi.substr(4)); //변수 u는 이링크를 HTML파싱한 값이다
        var t = u.split("<span class=\"tierRank\">"); //변수 a는 변수 u에서 HTML에 <span class="tierRank"> 을 자른값 입니다 /이걸로 해서 tierRank부분을 자른겁니다
        var w = u.split("<span class=\"wins\">"); //나머지도 마찬가지입니다
        var l = u.split("<span class=\"losses\">");
        var win = u.split("<span class=\"winratio\">");
        replier.reply(msg.substr(5) + "님의 롤 전적 검색결과 입니다\n티어 : " + t[1].split("<")[0] + "\n승리 : " + w[1].split("<")[0] + "\n패배 : " + l[1].split("<")[0] + "\n승률 : " + win[1].split("<")[0]);
      }
    } catch (e) { //결과값을 찾을수 없으면
      replier.reply("롤전적 정보가 없습니다");
    }
    if (msg == "!배그서버") {
      replier.reply("현재 배그 서버의 동접자는 " + Utils.getWebText("https://dak.gg/?hl=ko-KR").split('<p> 현재 배틀그라운드 동접자: ')[1].split('<a href="/statistics/playing">')[0].trim() + "이며, 서버는 " + Utils.getWebText("https://dak.gg/?hl=ko-KR").trim().split('<strong>서버:</strong> <span>')[1].split('</span>')[0] + "입니다.")
    }
    try {
      if (msg.split(" ")[0] == "!가사") {
        var u = Utils.getWebText("https://m.search.naver.com/search.naver?query=" + encodeURIComponent(msg.substr(4) + "가사"));
        u = u.replace(/   /g, "");
        u = u.replace(/<br>/g, "");
        u = u.replace(/<mark>/g, "");
        u = u.replace(/<\/mark>/g, "");
        var a = u.split("<div class=\"lyrics_txt\">");
        var b = u.split("<strong  class=\"tit\">");
        var c = u.split("<span class=\"name\">");
        replier.reply(msg.substr(4) + " 검색결과 입니다\n가수:" + c[2].split("<")[0] + "\n앨범 제목:" + c[1].split("<")[0] + "\n▼전체보기 클릭▼​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​\n가사정보:\n" + a[1].split("<")[0]);
      }

    } catch (e) {
      replier.reply("가사 정보가 없습니다. 다시 입력해보세요.");
    }
    /* 여기서 부턴 포함 확인하는거임 */
    if (msg.indexOf("!위키 ") == 0) {
      replier.reply(wiki(msg.substring(4)))
    }
    var timeb = new Date().getTime();
    var timec = (timeb - timea)
    if (msg == "!응답속도") {
      replier.reply("응답속도 : " + timec + "ms")
    }
    for (var n = 0; n < notwords.length; n++) {
      if (msg.indexOf(notwords[n]) != -1) {
        return;
      }
    }
    var msg = msg.replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z)]/gi, "");
    for (var n = 0; n < words.length; n++) {
      if (msg.indexOf(words[n]) != -1) {
        var data = DataBase.getDataBase(sender)
        war = Number(DataBase.getDataBase(sender)) + 1
        if (data == undefined) { //이미 저장된게 없다면
          DataBase.setDataBase("1", sender); //새로 저장
          replier.reply("[" + sender + "]\n욕설 사용 횟수: 1회\n욕설 사용을 자제해 주세요.");
        } else { //이미 저장된게 있다면,
          DataBase.setDataBase(war, sender);
          replier.reply("[" + sender + "]\n욕설 사용 횟수: " + war + "회\n욕설 사용을 자제해 주세요.");
        }
        if (war > 20) {
          Api.replyRoom("간부방", "욕설 횟수가 초과하여 보냅니다.\n" + sender + "님이 욕설 횟수가 " + war + "회 되어 이 메시지가 보내졌습니다. 강퇴 바랍니다.")
        }
        break;
      }
    }
  } catch (e) {
    var error = true;
    if (first == 0) {
      replier.reply("오류 발생!\n오류메시지 : " + e.message + "\n" + Number(Number(e.lineNumber) + Number(1)) + "번째 줄에서 오류가 발생했습니다!")
      first = 1;
    }
  }
  var timeb = new Date().getTime();
}
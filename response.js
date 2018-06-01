var updatecode = "1218"
var error = false;
var errorchk = 0;

/* 아마 필요없어진듯 함
var loadSource = JSON.parse(DataBase.getDataBase("saveSource")); //배열이름의 배열 덩어리를 쪼개서 다시 배열로 만들기
for (var i = 0; loadSource.length > i; i++) { //배열이름마다 배열덩어리를 배열로 쪼개기 반복
  eval(loadSource[i] + " = JSON.parse(DataBase.getDataBase(loadSource[i]))"); //동적변수를 가져오는데 eval을 사용
}
   
for (var i = 0; saveSource.length > i; i++) { //배열명 배열 안의 변수마다 반복
  eval("DataBase.setDataBase(JSON.stringify(" + saveSource[i] + "), saveSource[i])"); //배열명(eval로 로드)마다 배열을 합친 덩어리를 값으로 DB에 저장
}
아래껄로 대체 */
if (DataBase.getDataBase("DB") == undefined) {
	var DB = new Object()
	DataBase.setDataBase(JSON.stringify(DB), "DB");
}
var DB = JSON.parse(DataBase.getDataBase("DB"));

/*이건 리로드기능 안에 대체해서 삽입
DataBase.setDataBase(JSON.stringify(DB), "DB");
*/

function isInt(x) {
    return !isNaN(x) && eval(x).toString().length == parseInt(eval(x)).toString().length
}

// 현재 DB 항목
// DB.icode : 배열(스트링), 식별코드 DB
// DB.inick : 배열(스트링), 닉네임 DB
// DB.date : 숫자, 날짜
// DB.attendance : 숫자, 출석 인원 수
// DB.ncounter : 숫자, 공지카운터
// DB.notice : 스트링, 공지
// DB.p : 객체, 개인별 항목 구분
// DB.p.attendance : 객체
// DB.p.attendance[icode] : 불린, 출석 여부 확인
// DB.p.pt : 객체
// DB.p.pt[icode] : 아마 숫자(확인필요), 개인별 현재 포인트
// DB.p.warning : 객체
// DB.p.warning[icode] : 숫자, 욕설 사용 경고 횟수
// DB.p.counter : 객체
// DB.p.counter[icode] : 숫자, 개인별 채팅 횟수
// DB.p.date : 객체
// DB.p.date[icode] : 숫자, 개인별 DB 최종 업데이트 날짜
// DB.p.rps[scode] : 숫자, 가위바위보 횟수
// 원함수 내부에 배치할것과 외부에 배치할것 구분해서 배치!
// 최초 사용자 등록 시에만 개인별 데이터가 생성되도록 배치!

DB.notice = ("<공지사항을 숙지해 주시기 바랍니다.>\n\n공지사항: goo.gl/iyP83B\n\n채팅/홍보 이벤트 진행중, 공지사항 참조해주세요!\n\n방장 카카오톡 id : rgbkakao\n\n공식업체: compury.com ('엘' 님)\n\n모바일 메뉴열고 우측상단\nPC 채팅창 방제아래 상단바\n♡->♥ 하트 부탁 드려요")
DB.ncommand = ("◆[캬옹봇 " + ver + "] 명령어 목록◇\n▼전체보기 클릭▼스크롤을 쭉 내리세요▼​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​\n[사람들]\n▶!치킨 :: 제작자가 넣고 싶어서 넣음.\n▶!지비 :: 방장이 지비라서\n▶!케이시 :: 케이시가 시켜서\n▶!미쉘 :: 미쉘이 시켜서\n▶!티알 :: 내가 하고싶어서\n▶!불여우 :: '나'니까.\n[유행어 및 랜덤]\n▶ㅇㅈ? :: ㅇㅇㅈ, ㄴㅇㅈ 으로 답해준다.\n▶ㅂㅇㄹ :: 각종 유행어 인사말로 답해준다.\n▶\n소라고둥(포함 시) :: 스폰지밥의 그 소라고둥 맞다.\n▶쓰읍 :: 미쓰 또는 미쓰 테이크로 답해준다.(테스터 훈)\n▶!가위바위보 :: 봇과 가위바위보를 할 수 있다. 사용법: !가위바위보 <가위, 바위(주먹), 보 중 하나>\n▶!주사위 :: 주사위를 굴릴 수 있다.\n[검색 및 정보]\n▶!공지 :: 이 방의 공지를 확인할 수 있다.\n▶!채팅카운터 :: 카운터 초기화 시점부터 지금까지 총 몆개의 채팅이 올라왔는지 알려준다.\n▶!디스코드: 이방의 디스코드 주소를 확인할 수 있다.\n▶!시간 :: 지금 현재 시각을 확인할 수 있다.\n▶!디지털시계 :: 지금 현재 시각을 도트로 확인할 수 있다.\n▶!검색 :: 네이버 검색을 할 수 있다. 사용법: !검색 <검색하고 싶은 것>\n▶!유튜브 :: 유튜브 검색을 할 수 있다. 사용법: !유튜브 <검색하고 싶은 것>\n▶!구글 :: 구글 검색을 할 수 있다. 사용법: !구글 <검색하고 싶은 것>\n▶!나무위키 :: 나무위키 검색을 할 수 있다. 사용법: !나무위키 <검색하고 싶은 것>\n▶!실검 :: 현재 네이버의 실시간 검색어 순위를 확인할 수 있다.\n▶!날씨 :: 현재 전국 날씨를 알려준다.\n▶!지역날씨 :: 현재 지역의 날씨를 알 수 있다. 사용법: !지역날씨 <검색하고 싶은 지역>\n▶!번역 :: 실시간 번역을 할 수 있다. 사용법: !번역 <번역하고 싶은 언어> <번역할 문장>\n▶!언어 :: 번역에서 사용 가능한 언어를 표시합니다.\n▶!차트 :: 네이버 뮤직에서 실시간 차트를 가져옵니다.(느림)\n▶!비트코인 :: 현재 암호화폐의 시세를 알려줍니다.\n▶!가사 :: 노래의 가사를 알려줍니다. 사용법 !가사 <노래 제목>")
var words = ["쉬바", "쓰버", "10새", "10새기", "10새리", "10세리", "10쉐이", "10쉑", "10스", "10쌔", " 10쌔기", "10쎄", "10알", "10창", "10탱", "18것", "18넘", "18년", "18노", "18놈", "18뇬", "18럼", "18롬", "18새", "18새끼", "18색", "18세끼", "18세리", "18섹", "18쉑", "18스", "18아", "ㄱㅐ", "ㄲㅏ", "ㄲㅑ", "ㄲㅣ", "ㅅㅂㄹㅁ", "ㅅㅐ", "ㅆㅂㄹㅁ", "ㅆㅍ", "ㅆㅣ", "ㅆ앙", "凸", " 갈보", "갈보년", "같은년", "같은뇬", "개같은", "개구라", "개년", "개놈", "개뇬", "개대중", "개독", "개돼중", "개랄", "개보지", "개뻥", "개뿔", "개새", "개새기", "개새끼", "개새키", "개색기", "개색끼", "개색키", "개색히", "개섀끼", "개세", "개세끼", "개세이", "개소리", "개쑈", " 개쇳기", "개수작", "개쉐", "개쉐이", "개쉑", "개쉽", "개스끼", "개시키", "개십새기", " 개십새끼", "개쐑", "개씹", "개아들", "개자슥", "개자지", "개접", "개좆", "개좌식", "개허접", "걔새", "걔수작", "걔시끼", "걔시키", "걔썌", "걸레", "게색기", "게색끼", "광뇬", "구녕", "구라", "그년", "그새끼", "놈현", "뇬", "눈깔", "뉘미럴", "니귀미", "니기미", "니미", "니미랄", "니미럴", "니미씹", "니아배", "니아베", "니아비", "니어매", "니어메", "니어미", "닝기리", "닝기미", "대가리", "뎡신", "도라이", "돈놈", "돌아이", "돌은놈", "되질래", "뒈져", "뒈져라", "뒈진", "뒈진다", "뒈질", " 뒤질래", "등신", "디져라", "디진다", "디질래", "따식", "때놈", "또라이", "똘아이", "똘아이", "뙈놈", "뙤놈", "뙨넘", "뙨놈", "뚜쟁", "띠바", "띠발", "띠불", "띠팔", "메친넘", "메친놈", "미췬", " 미췬", "미친", "미친넘", "미친년", "미친놈", "미친새끼", "미친스까이", "미틴", "미틴넘", "미틴년", " 미틴놈", "바랄년", "뱅마", "뱅신", "벼엉신", "병쉰", "병신", "부랄", "부럴", "불알", "불할", "붕가", "뷰웅", "븅", "븅신", "빌어먹", "빙시", "빙신", "빠가", "빠구리", "빠굴", "빠큐", "뻐큐", "뻑큐", "뽁큐", "상넘이", "상놈을", "상놈의", "상놈이", "새갸", "새꺄", "새끼", "새새끼", "새키", "색끼", "생쑈", "세갸", "세꺄", "세끼", "섹스", "쇼하네", "쉐기", "쉐끼", "쉐리", "쉐에기", "쉐키", "쉑", "쉣", "쉨", "쉬발", "쉬밸", "쉬벌", "쉬뻘", "쉬펄", "쉽알", "스패킹", "스팽", "시궁창", "시끼", "시댕", "시뎅", "시랄", "시발", "시벌", "시부랄", "시부럴", "시부리", "시불", "시브랄", "시팍", "시팔", "시펄", "심발끈", "심탱", "십8", "십라", "십새", "십새끼", "십세", "십쉐", "십쉐이", "십스키", "십쌔", "십창", "십탱", "싶알", "싸가지", "싹아지", "쌉년", "쌍넘", "쌍년", "쌍놈", "쌍뇬", "쌔끼", " 쌕", "쌩쑈", "쌴년", "썅", "썅년", "썅놈", "썡쇼", "써벌", "썩을년", "썩을놈", "쎄꺄", "쎄엑", " 쒸벌", "쒸뻘", "쒸팔", "쒸펄", "쓰바", "쓰박", "쓰발", "쓰벌", "쓰팔", "씁새", "씁얼", "씌파", "씨8", " 씨끼", "씨댕", "씨뎅", "씨바", "씨바랄", "씨박", "씨발", "씨방", "씨방새", "씨방세", "씨밸", "씨뱅", "씨벌", "씨벨", "씨봉", "씨봉알", "씨부랄", "씨부럴", "씨부렁", "씨부리", "씨불", "씨붕", "씨브랄", " 씨빠", "씨빨", "씨뽀랄", "씨앙", "씨파", "씨팍", "씨팔", "씨펄", "씸년", "씸뇬", "씸새끼", "씹같", "씹년", "씹뇬", "씹보지", "씹새", "씹새기", "씹새끼", "씹새리", "씹세", "씹쉐", "씹스키", "씹쌔", "씹이", "씹자지", "씹질", "씹창", "씹탱", "씹퇭", "씹팔", "씹할", "씹헐", "아가리", "아갈이", "아갈통", "아구창", "아구통", "아굴", "얌마", "양년", "양놈", "엄창", "엠병", "여물통", "염병", "엿같", "옘병", "옘빙", "오입", "왜년", "왜놈", "욤병", "육갑", "은년", "을년", "이년", "이새끼", "이새키", "이스끼", "이스키", "임마", "자슥", "잡것", "잡넘", "잡년", "잡놈", "저년", "저새끼", "접년", "젖밥", "조까", "조까치", "조낸", "조또", "조랭", "조빠", "조쟁이", "조지냐", "조진다", "조찐", "  조질래", "존나", "존나게", "존니", "존만", " 존만한", "좀물", "좁년", "좆", "좁밥", "좃까", "좃또", "좃만", "좃밥", "좃이", "좃찐", "좆같", "좆까", "좆나", "좆또", "좆만", "좆밥", "좆이", "좆찐", "좇같", "좇이", "좌식", "주글", "주글래", "주데이", "주뎅", "주뎅이", "주둥아리", "주둥이", "주접", "주접떨", "죽고잡", "죽을래", "죽통", "쥐랄", "쥐롤", "쥬디", "지랄", "지럴", "지롤", "지미랄", "짜식", "짜아식", "쪼다", "쫍빱", "찌랄", "창녀", "캐년", "캐놈", "캐스끼", "캐스키", "캐시키", "탱구", "팔럼", "퍽큐", "호로", "호로놈", "호로새끼", "호로색", "호로쉑", "호로스까이", "호로스키", "후라들", "후래자식", "후레", "후뢰", "씨ㅋ발", "ㅆ1발", "씌발", "띠발", "띄발", "뛰발", "띠ㅋ발", "뉘뮈", "ㅅㅂ", "ㅆㅂ", "ㅂㅅ", "ㅄ", "ㅈㄹ", "좃", "좇", "시바", "바보", "멍청이", "쉬불", "쉬뿔", "ㅈㄴ"]
var notwords = ["도시바", "에이씨벨", "쉬바나", "화염병"]

if ("icode" in DB == false) DB.icode = new Array()
if ("inick" in DB == false) DB.inick = new Array()

if ("date" in DB == false) DB.date = new Date().getDate() - 1
if ("attendance" in DB == false) DB.attendance = 0
if ("ncounter" in DB == false) DB.ncounter = 0
if ("p" in DB == false) DB.p = new Object()
if ("attendance" in DB.p == false) DB.p.attendance = new Object()
// DB.p.attendance[] : 아래에 있음
if ("pt" in DB.p == false) DB.p.pt = new Object()
if ("warning" in DB.p == false) DB.p.warning = new Object()
if ("counter" in DB.p == false) DB.p.counter = new Object()
if ("date" in DB.p == false) DB.p.date = new Object()
if ("rps" in DB.p == false) DB.p.rps = new Object()

function response(room, msg, sender, isGroupChat, replier, ImageDB) {
try {

loop: {
if (DB.inick.indexOf(sender) == -1) {
  while (true) {
    var n = Math.floor(Math.random() * 9000 + 1000);
    if (DB.icode.indexOf(n) == -1) {
      DB.inick.push(sender);
      DB.icode.push(String(n));
      var ta = DB.inick
      var ta2 = []
      DB.inick.sort();
      for (var i = 0; i < DB.icode.length; i++) ta2.push(DB.icode[ta.indexOf(DB.inick[i])])
      var scode = DB.icode[DB.inick.indexOf(sender)]; // scode: 전송자의 식별코드
      DB.icode = ta2
      DB.p.pt[scode] = 0
      DB.p.warning[scode] = 0
      DB.p.counter[scode] = 0
      DB.p.date[scode] = new Date().getDate() - 1
      DB.p.rps[scode] = 0
      replier.reply(scode)
      break loop;
    }
  }
  }
}

var scode = DB.icode[DB.inick.indexOf(sender)];

DB.p.pt[scode]++;
DB.p.counter[scode]++;
DB.ncounter++;
if (DB.ncounter = 299) {
	DB.ncounter = 0
	replier.reply(DB.notice)
}

if (msg == "!명령어") { //명령어
    replier.reply(DB.ncommand)
  }


if (new Date().getDate() != DB.p.date[scode]) {
    DB.p.attendance[scode] = 0;
    DB.attendance = 0;
    DB.p.warning[scode] -= 5
    if (DB.p.warning[scode] < 0) DB.p.warning[scode] = 0
}
DB.p.date[scode] = new Date().getDate();

if (sender in DB.p.attendance == false) {
    DB.attendance++;
    if (DB.attendance = 1) {
        var cp = 300
        DB.p.pt[scode] += cp
        replier.reply(DB.attendance + "등으로 출석체크!\n" + cp + "cp가 지급됩니다!")
    } else if (DB.attendance = 2) {
        var cp = 250
        DB.p.pt[scode] += cp
        replier.reply(DB.attendance + "등으로 출석체크!\n" + cp + "cp가 지급됩니다!")
    } else if (DB.attendance > 2 && DB.attendance < 6) {
        var cp = 200
        DB.p.pt[scode] += cp
        replier.reply(DB.attendance + "등으로 출석체크!\n" + cp + "cp가 지급됩니다!")
    } else if (DB.attendance > 4 && DB.attendance < 11) {
        var cp = 150
        DB.p.pt[scode] += cp
        replier.reply(DB.attendance + "등으로 출석체크!\n" + cp + "cp가 지급됩니다!")
    } else {
        var cp = 100
        DB.p.pt[scode] += cp
        replier.reply(DB.attendance + "등으로 출석체크!\n" + cp + "cp가 지급됩니다!")
    }
    DB.p.attendance[sender] = true;
}

if (msg == "!업데이트") {
    replier.reply("다운로드 진행중...")
    UPDATE.saveData(getHtml("https://raw.githubusercontent.com/chanoo104/kyaongbot/master/response.js"));
    replier.reply("[업데이트 코멘트]\n" + getHtml("https://github.com/chanoo104/kyaongbot/commit/master").split('<p class="commit-title">')[1].split("</p>")[0].trim());
    replier.reply(updatecode)
    Api.reload();
    replier.reply("리로드 완료!")
    if (error == false) {
      replier.reply("업데이트 성공!")
    } else if (error == true) {
      replier.reply("업데이트 실패..")
    }
}
if (msg == "!리로드") {
    Api.reload();
    replier.reply("리로드 완료!")
}


if (msg == "!확인") {
    replier.reply(updatecode)
}

if (msg.trim() == "!공지카운터") {
    replier.reply(DB.ncounter + "/300")
}


loop: {
for (var n = 0; n < notwords.length; n++) {
    if (msg.indexOf(notwords[n]) != -1) break loop;
}
var msg1 = msg.replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z)]/gi, "");
for (var n = 0; n < words.length; n++) {
  if (msg1.indexOf(words[n]) != -1) {
    DB.p.warning[scode]++
    var i = DB.p.warning[scode] * 30 - 30
    if (DB.p.warning[scode] == 1) replier.reply("[" + sender + "]\n누적 경고: 1회")
    if (DB.p.warning[scode] != 1) {
		replier.reply("[" + sender + "]\n누적 경고: " + DB.p.warning[scode] + "회\n" + i + "cp 차감");
		DB.p.pt[scode] -= i
	}
    if (DB.p.warning[scode] > 10) {
      Api.replyRoom("간부방", "[" + sender + "]\n욕설 사용 횟수:" + DB.p.warning[scode] + "회")
    }
    break;
  }
}
}

if (msg == "!포인트") replier.reply(DB.p.pt[scode] + "cp")

if (msg.split(" ")[0] == "!상점") {
    DB.p.pt[scode] += msg.split(" ")[2];
    DB.p.pt[msg.split(" ")[1]] += msg.split(" ")[2] * 1.2;
}

loop: {
if (msg.split(" ")[0] == "!상점") {
    if (DB.icode.indexOf(msg.split(" ")[1]) == -1) {
        replier.reply("상대의 식별코드가 등록되지 않았습니다.");
        break loop;
    }
    if (isInt(Number(msg.split(" ")[2])) = false) {
        replier.reply("사용할 포인트를 자연수로 입력해 주세요.");
        break loop;
    }
    if (Number(msg.split(" ")[2]) < 0) {
        replier.reply("사용할 포인트를 자연수로 입력해 주세요.");
        break loop;
    }
    var i = Number(msg.split(" ")[2]) * 1.2;
    if (Number(DB.p.pt[scode]) -= Math.round(i) < 0) {
        var x = Math.round(i) - Number(DB.p.pt[scode]);
        replier.reply("포인트가 " + x + "cp 부족합니다. VAT 20%를 유의해 주세요.");
        break loop;
    }
    DB.p.pt[scode] -= Math.round(i);
    DB.p.pt[msg.split(" ")[1]] += msg.split(" ")[2];
    replier.reply("[상점]\n" + sender + " → " + db.inick[DB.icode.indexOf(msg.split(" ")[1])] + "\n" + Math.round(i) + "cp (20% VAT)");
}
}

loop: {
if (msg.split(" ")[0] == "!벌점") {
    if (DB.icode.indexOf(msg.split(" ")[1]) == -1) {
         replier.reply("상대의 식별코드가 등록되지 않았습니다.");
        break loop;
     }
    if (isInt(Number(msg.split(" ")[2])) = false) {
          replier.reply("사용할 포인트를 자연수로 입력해 주세요.");
         break loop;
     }
    if (Number(msg.split(" ")[2]) < 0) {
         replier.reply("사용할 포인트를 자연수로 입력해 주세요.");
         break loop;
      }
    var i = Number(msg.split(" ")[2]) * 1.2;
    if (Number(DB.p.pt[scode]) -= Math.round(i) < 0) {
          var x = Math.round(i) - Number(DB.p.pt[scode]);
         replier.reply("포인트가 " + x + "cp 부족합니다. VAT 20%를 유의해 주세요.");
          break loop;
      }
    DB.p.pt[scode] -= Math.round(i);
    DB.p.pt[msg.split(" ")[1]] -= msg.split(" ")[2];
    replier.reply("[벌점]\n" + sender + " → " + db.inick[DB.icode.indexOf(msg.split(" ")[1])] + "\n" + Math.round(i) + "cp (20% VAT)");
}
}

if (msg.indexOf("!eval ") == 0) {
        replier.reply(eval(msg.substring(6)))
}

/*
loop: {
loop: {
if (msg.split(" ")[0] == "!가위") {
    var i = Number(msg.split(" ")[1])
    if (isInt i == false) {
        replier.reply("사용할 포인트를 자연수로 입력해 주세요.");
    }
    if (i > 0 && i < 1001) {
        DB.p.pt[scode] -= 50
        if (DB.p.rps[scode] > 4) {
            replier.reply("오늘 이용 가능한 횟수를 초과하셨습니다.");
        }
        DB.p.rps[scode]++
        var n = Math.floor(Math.random() * 3);
        if (n == 0) {
            replier.reply("가위! 승리하셨습니다.\n" + i * 2 + "cp를 획득하셨습니다.")
        }
    } else {
        replier.reply("1에서 1000 사이의 포인트를 입력해 주세요.");
    }
}
}
*/
} catch (e) {
    var error = true;
    if (first == 0) {
      replier.reply("오류 발생!\n오류메시지 : " + e.message + "\n" + Number(Number(e.lineNumber) + Number(1)) + "번째 줄에서 오류가 발생했습니다!")
      errorchk = 1;
    }
}
}

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
var first = 0;
const count = {};
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
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
UPDATE.saveData = function (msg) { //파일에 내용을 저장하는 함수
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
var profile = "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"
const preMsg = {}; //도배 방지용 객체
var admin = ["불여우", "AMD TR™", "rgb", "K'romium", "케이시", "DEBUG$MODE*NAME+", "Apz74"]
var enkey = "thebestfirefoxintheworld"
var words = ["쓰버", "10새", "10새기", "10새리", "10세리", "10쉐이", "10쉑", "10스", "10쌔", " 10쌔기", "10쎄", "10알", "10창", "10탱", "18것", "18넘", "18년", "18노", "18놈", "18뇬", "18럼", "18롬", "18새", "18새끼", "18색", "18세끼", "18세리", "18섹", "18쉑", "18스", "18아", "ㄱㅐ", "ㄲㅏ", "ㄲㅑ", "ㄲㅣ", "ㅅㅂㄹㅁ", "ㅅㅐ", "ㅆㅂㄹㅁ", "ㅆㅍ", "ㅆㅣ", "ㅆ앙", "凸", " 갈보", "갈보년", "같은년", "같은뇬", "개같은", "개구라", "개년", "개놈", "개뇬", "개대중", "개독", "개돼중", "개랄", "개보지", "개뻥", "개뿔", "개새", "개새기", "개새끼", "개새키", "개색기", "개색끼", "개색키", "개색히", "개섀끼", "개세", "개세끼", "개세이", "개소리", "개쑈", " 개쇳기", "개수작", "개쉐", "개쉐이", "개쉑", "개쉽", "개스끼", "개시키", "개십새기", " 개십새끼", "개쐑", "개씹", "개아들", "개자슥", "개자지", "개접", "개좆", "개좌식", "개허접", "걔새", "걔수작", "걔시끼", "걔시키", "걔썌", "걸레", "게색기", "게색끼", "광뇬", "구녕", "구라", "그년", "그새끼", "놈현", "뇬", "눈깔", "뉘미럴", "니귀미", "니기미", "니미", "니미랄", "니미럴", "니미씹", "니아배", "니아베", "니아비", "니어매", "니어메", "니어미", "닝기리", "닝기미", "대가리", "뎡신", "도라이", "돈놈", "돌아이", "돌은놈", "되질래", "뒈져", "뒈져라", "뒈진", "뒈진다", "뒈질", " 뒤질래", "등신", "디져라", "디진다", "디질래", "딩시", "따식", "때놈", "또라이", "똘아이", "똘아이", "뙈놈", "뙤놈", "뙨넘", "뙨놈", "뚜쟁", "띠바", "띠발", "띠불", "띠팔", "메친넘", "메친놈", "미췬", " 미췬", "미친", "미친넘", "미친년", "미친놈", "미친새끼", "미친스까이", "미틴", "미틴넘", "미틴년", " 미틴놈", "바랄년", "뱅마", "뱅신", "벼엉신", "병쉰", "병신", "부랄", "부럴", "불알", "불할", "붕가", "붙어먹", "뷰웅", "븅", "븅신", "빌어먹", "빙시", "빙신", "빠가", "빠구리", "빠굴", "빠큐", "뻐큐", "뻑큐", "뽁큐", "상넘이", "상놈을", "상놈의", "상놈이", "새갸", "새꺄", "새끼", "새새끼", "새키", "색끼", "생쑈", "세갸", "세꺄", "세끼", "섹스", "쇼하네", "쉐기", "쉐끼", "쉐리", "쉐에기", "쉐키", "쉑", "쉣", "쉨", "쉬발", "쉬밸", "쉬벌", "쉬뻘", "쉬펄", "쉽알", "스패킹", "스팽", "시궁창", "시끼", "시댕", "시뎅", "시랄", "시발", "시벌", "시부랄", "시부럴", "시부리", "시불", "시브랄", "시팍", "시팔", "시펄", "신발끈", "심발끈", "심탱", "십8", "십라", "십새", "십새끼", "십세", "십쉐", "십쉐이", "십스키", "십쌔", "십창", "십탱", "싶알", "싸가지", "싹아지", "쌉년", "쌍넘", "쌍년", "쌍놈", "쌍뇬", "쌔끼", " 쌕", "쌩쑈", "쌴년", "썅", "썅년", "썅놈", "썡쇼", "써벌", "썩을년", "썩을놈", "쎄꺄", "쎄엑", " 쒸벌", "쒸뻘", "쒸팔", "쒸펄", "쓰바", "쓰박", "쓰발", "쓰벌", "쓰팔", "씁새", "씁얼", "씌파", "씨8", " 씨끼", "씨댕", "씨뎅", "씨바", "씨바랄", "씨박", "씨발", "씨방", "씨방새", "씨방세", "씨밸", "씨뱅", "씨벌", "씨벨", "씨봉", "씨봉알", "씨부랄", "씨부럴", "씨부렁", "씨부리", "씨불", "씨붕", "씨브랄", " 씨빠", "씨빨", "씨뽀랄", "씨앙", "씨파", "씨팍", "씨팔", "씨펄", "씸년", "씸뇬", "씸새끼", "씹같", "씹년", "씹뇬", "씹보지", "씹새", "씹새기", "씹새끼", "씹새리", "씹세", "씹쉐", "씹스키", "씹쌔", "씹이", "씹자지", "씹질", "씹창", "씹탱", "씹퇭", "씹팔", "씹할", "씹헐", "아가리", "아갈이", "아갈통", "아구창", "아구통", "아굴", "얌마", "양년", "양놈", "엄창", "엠병", "여물통", "염병", "엿같", "옘병", "옘빙", "오입", "왜년", "왜놈", "욤병", "육갑", "은년", "을년", "이년", "이새끼", "이새키", "이스끼", "이스키", "임마", "자슥", "잡것", "잡넘", "잡년", "잡놈", "저년", "저새끼", "접년", "젖밥", "조까", "조까치", "조낸", "조또", "조랭", "조빠", "조쟁이", "조지냐", "조진다", "조찐", "  조질래", "존나", "존나게", "존니", "존만", " 존만한", "좀물", "좁년", "좆", "좁밥", "좃까", "좃또", "좃만", "좃밥", "좃이", "좃찐", "좆같", "좆까", "좆나", "좆또", "좆만", "좆밥", "좆이", "좆찐", "좇같", "좇이", "좌식", "주글", "주글래", "주데이", "주뎅", "주뎅이", "주둥아리", "주둥이", "주접", "주접떨", "죽고잡", "죽을래", "죽통", "쥐랄", "쥐롤", "쥬디", "지랄", "지럴", "지롤", "지미랄", "짜식", "짜아식", "쪼다", "쫍빱", "찌랄", "창녀", "캐년", "캐놈", "캐스끼", "캐스키", "캐시키", "탱구", "팔럼", "퍽큐", "호로", "호로놈", "호로새끼", "호로색", "호로쉑", "호로스까이", "호로스키", "후라들", "후래자식", "후레", "후뢰", "씨ㅋ발", "ㅆ1발", "씌발", "띠발", "띄발", "뛰발", "띠ㅋ발", "뉘뮈", "ㅅㅂ", "ㅆㅂ", "ㅂㅅ", "ㅄ", "ㅈㄹ", "좃", "좇", "시바", "바보", "멍청이", "쉬불", "쉬뿔"]
var notwords = ["도시바", "에이씨벨"]
var error = false;
function response(room, msg, sender, isGroupChat, replier, ImageDB) {
    try {
        if (room == "불여우") {
            if (msg == "!프사갱신") {
                DataBase.setDataBase(ImageDB.getProfileImage(), image)
                replier.reply("프사갱신 완료!" + image)
            }
        }
        msg = msg.trim(); //이거 왜있는지 모르면 골롬
        room = room.trim();
        sender = sender.trim();
        /*도배 방지*/
        if (preMsg[room] == msg) { //채팅 내용이랑 직전에 수신된 채팅 내용이 같으면,
            return; //도배로 간주하고 response 함수 종료
        }
        preMsg[room] = msg; //수신된 채팅 내용 저장
        var timea = new Date().getTime(); //반응 속도 측정을 위한 시간 측정
        /* 카운트 */
        DataBase.setDataBase(Number(DataBase.getDataBase(room)) + 1, room)
        /* 공지 카운터 */
        if (count[room] === undefined) { //한 번도 수신된 적이 없는 경우,
            count[room] = 1; //수신된 횟수에 1 저장
        } else { //아니면
            count[room]++; //1증가
        }
        if (count[room] == 300) { //200번 다 채우면,
            replier.reply("[공지]\n<욕설>\n과도한 <도배 / 방주제 관련없는 이야기>\n<사진, 특히 채팅 캡처 도배>\n<싸가지없는 말투>\n과도한 <친목 / 반말>\n<개념없는 행동>\n<크랙 공유>\n<기타 대한민국 법에 저촉되는 행위>\n시\관리자에게 제재받을수 있습니다.\n●디스코드: goo.gl/MXKJSd\n●방장 견적상담: goo.gl/gBvwZk\n●공식업체: compury.com\n●신고/이의제기: goo.gl/r6Bc5t\n모바일 메뉴열고 우측상단\nPC 채팅창 방제아래 상단바\n♡->♥ 하트 부탁 드려요"); //채팅 보내고,
            count[room] = 0; //0으로 초기화
        }
        /* 관리자 명령어 */
        var image = DataBase.getDataBase("image")
        if (ImageDB.getProfileImage() == image) {
            if (msg.indexOf("!eval ") == 0) {
                eval(msg.substring(6))
            }
        }
        else if (ImageDB.getProfileImage() != image) {
            if (msg.indexOf("!eval") == 0) {
                replier.reply("관리자가 아닙니다.")
            }
        }
        if (admin.indexOf(sender) > -1) {
            if (admin.indexOf(sender) > -1) {
                if (msg.trim() == "!카운트") {
                    replier.reply(count[room] + "/300\n캬옹봇의 챗은 계산하지 않음.")
                }
                if (msg.trim() == "!카운터") {
                    replier.reply(Number(DataBase.getDataBase(room)) + "회")
                }
                if (msg == "!리로드") {
                    Api.reload()
                    replier.reply("리로드 되었습니다!")
                }
                if (msg == "!업데이트") {
                    replier.reply("다운 중...")
                    UPDATE.saveData(getHtml("https://raw.githubusercontent.com/chanoo104/kyaongbot/master/response.js"));
                    replier.reply("업데이트 내역\n" + getHtml("https://raw.githubusercontent.com/chanoo104/kyaongbot/master/response.js"));
                    replier.reply("리로드 중...")
                    Api.reload()
                    if (error == false) {
                        replier.reply("업데이트 성공!")
                    }
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
            if (msg.trim() == "!카운트") {
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
        if (msg.trim() == "!실검") { //!실검 이면
            var 실검 = [];
            for (var abab = 1; abab < 21; abab++) {
                실검.push(abab + ". " + getHtml("http://rank.search.naver.net/rank.js").replace(/\"/g, "").split("keyword:")[abab].split(",")[0]); //파싱
            }
            replier.reply(실검.join("\n"));//합해서 보내기
        }
        if (msg == "!날씨") {//!날씨면
            var data = Utils.getWebText("https://m.search.naver.com/search.naver?query=날씨");//네이버 검색에서 파싱
            var data2 = data.split("전국날씨</strong>");// 자르기
            var data3 = data2[1].split("특보");
            var data4 = data3[0].replace(/(<([^>]+)>)/g, "");
            data4 = data4.trim();
            data4 = data4.replace(/  /g, "");//태그 제거
            data4 = data4.replace(/도씨/g, "℃");//화씨
            data4 = data4.replace(/ /g, ", ");//태그제거
            replier.reply("[현재 날씨]\n" + data4);//보내기
        }
        if (msg == "!명령어") { //명령어
            replier.reply("◆[캬옹봇 3.0] 명령어 목록◇\n▼전체보기 클릭▼​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​\n[사람들]\n▶!치킨 :: 제작자가 넣고 싶어서 넣음.\n▶!지비 :: 방장이 지비라서\n▶!케이시 :: 케이시가 시켜서\n▶!미쉘 :: 미쉘이 시켜서\n▶!티알 :: 내가 하고싶어서\n▶!불여우 :: '나'니까.\n[유행어 및 랜덤]\n▶ㅇㅈ? :: ㅇㅇㅈ, ㄴㅇㅈ 으로 답해준다.\n▶ㅂㅇㄹ :: 각종 유행어 인사말로 답해준다.\n▶\n소라고둥(포함 시) :: 스폰지밥의 그 소라고둥 맞다.\n▶쓰읍 :: 미쓰 또는 미쓰 테이크로 답해준다.(테스터 훈)\n▶!가위바위보 :: 봇과 가위바위보를 할 수 있다. 사용법: !가위바위보 <가위, 바위(주먹), 보 중 하나>\n▶!주사위 :: 주사위를 굴릴 수 있다.\n[검색 및 정보]\n▶!공지 :: 이 방의 공지를 확인할 수 있다.\n▶!디스코드: 이방의 디스코드 주소를 확인할 수 있다.\n▶!시간 :: 지금 현재 시각을 확인할 수 있다.\n▶!디지털시계 :: 지금 현재 시각을 도트로 확인할 수 있다.\n▶!검색 :: 네이버 검색을 할 수 있다. 사용법: !검색 <검색하고 싶은 것>\n▶!유튜브 :: 유튜브 검색을 할 수 있다. 사용법: !유튜브 <검색하고 싶은 것>\n▶!구글 :: 구글 검색을 할 수 있다. 사용법: !구글 <검색하고 싶은 것>\n▶!나무위키 :: 나무위키 검색을 할 수 있다. 사용법: !나무위키 <검색하고 싶은 것>\n▶!실검 :: 현재 네이버의 실시간 검색어 순위를 확인할 수 있다.\n▶!날씨 :: 현재 전국 날씨를 알려준다.\n▶!지역날씨 :: 현재 지역의 날씨를 알 수 있다. 사용법: !지역날씨 <검색하고 싶은 지역>\n▶!번역 :: 실시간 번역을 할 수 있다. 사용법: !번역 <번역하고 싶은 언어> <번역할 문장>\n▶!언어 :: 번역에서 사용 가능한 언어를 표시합니다.\n▶!차트 :: 네이버 뮤직에서 실시간 차트를 가져옵니다.(느림)\n▶!비트코인 :: 현재 암호화폐의 시세를 알려줍니다.\n▶!가사 :: 노래의 가사를 알려줍니다. 사용법 !가사 <노래 제목>")
        }
        if (msg == "!차트") {//!차트면
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
        if (msg == hello) {
            replier.reply(hello)
        }
        /* 여기서 부턴 포함 확인하는거임 */
        if (msg.indexOf("!위키 ") == 0) {
            replier.reply(wiki(msg.substring(4)))
        }
        var timeb = new Date().getTime();
        var timec = (timeb - timea) / 1000
        if (msg == "!반응속도") {
            replier.reply("캬옹봇의 반응속도는" + timec + "초입니다.")
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
                break;
            }
        }
    }
    catch (e) {
        if (first == 0) {
            replier.reply("오류 발생!\n오류메시지 : " + e.message + "\n" + Number(Number(e.lineNumber) + Number(1)) + "번째 줄에서 오류 발생했습니다!")
            first = 1;
        }
    }
}




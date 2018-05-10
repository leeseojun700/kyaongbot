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
function response(room, msg, sender, isGroupChat, replier, ImageDB) {
    msg = msg.trim(); //이거 왜있는지 모르면 골롬
    room = room.trim();
    sender = sender.trim();
    /*도배 방지*/
    if (preMsg[room] == msg) { //채팅 내용이랑 직전에 수신된 채팅 내용이 같으면,
        return; //도배로 간주하고 response 함수 종료
    }
    preMsg[room] = msg; //수신된 채팅 내용 저장
    var timea = new Date().getTime(); //반응 속도 측정을 위한 시간 측정
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
    if (count[room+"all"] === undefined) { //한 번도 수신된 적이 없는 경우,
        count[room+"all"] = 1; //수신된 횟수에 1 저장
    } else { //아니면
        count[room+"all"]++; //1증가
    }
    /* 관리자 명령어 */
	var img = ImageDB.getProfileImage();
    if (profile == img) {
        if (msg.indexOf("!eval ") == 0) {
            eval(msg.substring(6))
		}
	}
	else if (profile != img){
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
                replier.reply(count[room+"all"] + "번 이방의 채팅량 분석")
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
                replier.reply("업데이트 성공!")
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
        if (msg.trim() == "!카운터") {
            replier.reply("관리자가 아닙니다.")
        }
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
        replier.reply(vmlist.join("원\n")+"원"); // 보내기
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
    var timec = (timeb - timea) / 1000
    if (msg == "!반응속도") {
        replier.reply("캬옹봇의 반응속도는" + timec + "초입니다.")
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

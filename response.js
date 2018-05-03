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
function wiki(query){
kiwi = Utils.getWebText('http://49.236.137.7/wiki/' + query)
kiwi = kiwi.substring(32)
kiwi = kiwi.substring(0, kiwi.length - 17)
return kiwi.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "")
}
const DB = {};
const AI = {};
AI.getChat = function(sender) { //저장된 채팅들 중 아무말 하나 가져오는 함수
    var data = DB.readData(sender); //해당 채팅방에서 수신된 메시지들을 읽어옴
    if (data == null) return null; //수신된게 없으면 null 반환
};
DB.createDir = function() { //채팅이 저장될 폴더를 생성하는 함수
    var folder = new java.io.File(sdcard + "/warn/"); //파일 인스턴스 생성
    folder.mkdirs(); //폴더 생성. 상위 폴더가 없으면, 상위 폴더도 생성.
};
DB.saveData = function(name, msg) { //파일에 내용을 저장하는 함수
    try { //사실, 나도 어디서 긁어와서 이곳저곳에서 사용하는 거임
        var file = new java.io.File(sdcard + "/warn/" + name + ".txt");
        var fos = new java.io.FileOutputStream(file);
        var str = new java.lang.String(msg);
        fos.write(str.getBytes());
        fos.close();
    } catch (e) {
        Log.debug(e + " At:" + e.lineNumber);
    }
};
DB.readData = function(name) {
    try { 
        var file = new java.io.File(sdcard + "/warn/" + name + ".txt");
        if (!file.exists()) return null; 
        var fis = new java.io.FileInputStream(file);
        var isr = new java.io.InputStreamReader(fis);
        var br = new java.io.BufferedReader(isr);
        var str = br.readLine();
		while((line = br.readLine()) != null){
		str += "\n" + line;
		}
        fis.close();
        isr.close();
        br.close();
        return str;
    } catch (e) {
        Log.debug(e + " At:" + e.lineNumber);
    }
};
DB.createDir();
const preMsg = {}; //도배 방지용 객체
var admin = ["불여우", "AMD TR™", "rgb", "K'romium", "케이시", "DEBUG$MODE*NAME+"]
var enkey = "thebestfirefoxintheworld"
function copyFileFromWeb() {
    try {
        var url = new java.net.URL("https://raw.githubusercontent.com/chanoo104/kyaongbot/master/response.js");
        var con = url.openConnection();
        if(con != null) {
            con.setConnectTimeout(5000);
            con.setUseCaches(false);
            var bis = new java.io.BufferedInputStream(con.getInputStream());
            var file = new java.io.File(sdcard+"kbot/response.js");
            var fos = new java.io.FileOutputStream(file);
            var bos = new java.io.BufferedOutputStream(fos);
            var buf;
            while((buf = bis.read()) != -1) {
                bos.write(buf);
            }
            bis.close();
            bos.close();
            con.disconnect();
            fos.close();
        }
    } catch(e) {
        print(e);
    }
}
var words = ["10새","10새기","10새리","10세리","10쉐이","10쉑","10스","10쌔"," 10쌔기","10쎄","10알","10창","10탱","18것","18넘","18년","18노","18놈","18뇬","18럼","18롬","18새","18새끼","18색","18세끼","18세리","18섹","18쉑","18스","18아","ㄱㅐ","ㄲㅏ","ㄲㅑ","ㄲㅣ","ㅅㅂㄹㅁ","ㅅㅐ","ㅆㅂㄹㅁ","ㅆㅍ","ㅆㅣ","ㅆ앙","ㅍㅏ","凸"," 갈보","갈보년","같은년","같은뇬","개같은","개구라","개년","개놈","개뇬","개대중","개독","개돼중","개랄","개보지","개뻥","개뿔","개새","개새기","개새끼","개새키","개색기","개색끼","개색키","개색히","개섀끼","개세","개세끼","개세이","개소리","개쑈"," 개쇳기","개수작","개쉐","개쉐이","개쉑","개쉽","개스끼","개시키","개십새기"," 개십새끼","개쐑","개씹","개아들","개자슥","개자지","개접","개좆","개좌식","개허접","걔새","걔수작","걔시끼","걔시키","걔썌","걸레","게색기","게색끼","광뇬","구녕","구라","그년","그새끼","놈현","뇬","눈깔","뉘미럴","니귀미","니기미","니미","니미랄","니미럴","니미씹","니아배","니아베","니아비","니어매","니어메","니어미","닝기리","닝기미","대가리","뎡신","도라이","돈놈","돌아이","돌은놈","되질래","뒈져","뒈져라","뒈진","뒈진다","뒈질"," 뒤질래","등신","디져라","디진다","디질래","딩시","따식","때놈","또라이","똘아이","똘아이","뙈놈","뙤놈","뙨넘","뙨놈","뚜쟁","띠바","띠발","띠불","띠팔","메친넘","메친놈","미췬"," 미췬","미친","미친넘","미친년","미친놈","미친새끼","미친스까이","미틴","미틴넘","미틴년"," 미틴놈","바랄년","뱅마","뱅신","벼엉신","병쉰","병신","부랄","부럴","불알","불할","붕가","붙어먹","뷰웅","븅","븅신","빌어먹","빙시","빙신","빠가","빠구리","빠굴","빠큐","뻐큐","뻑큐","뽁큐","상넘이","상놈을","상놈의","상놈이","새갸","새꺄","새끼","새새끼","새키","색끼","생쑈","세갸","세꺄","세끼","섹스","쇼하네","쉐","쉐기","쉐끼","쉐리","쉐에기","쉐키","쉑","쉣","쉨","쉬발","쉬밸","쉬벌","쉬뻘","쉬펄","쉽알","스패킹","스팽","시궁창","시끼","시댕","시뎅","시랄","시발","시벌","시부랄","시부럴","시부리","시불","시브랄","시팍","시팔","시펄","신발끈","심발끈","심탱","십8","십라","십새","십새끼","십세","십쉐","십쉐이","십스키","십쌔","십창","십탱","싶알","싸가지","싹아지","쌉년","쌍넘","쌍년","쌍놈","쌍뇬","쌔끼"," 쌕","쌩쑈","쌴년","썅","썅년","썅놈","썡쇼","써벌","썩을년","썩을놈","쎄꺄","쎄엑"," 쒸벌","쒸뻘","쒸팔","쒸펄","쓰바","쓰박","쓰발","쓰벌","쓰팔","씁새","씁얼","씌파","씨8"," 씨끼","씨댕","씨뎅","씨바","씨바랄","씨박","씨발","씨방","씨방새","씨방세","씨밸","씨뱅","씨벌","씨벨","씨봉","씨봉알","씨부랄","씨부럴","씨부렁","씨부리","씨불","씨붕","씨브랄"," 씨빠","씨빨","씨뽀랄","씨앙","씨파","씨팍","씨팔","씨펄","씸년","씸뇬","씸새끼","씹같","씹년","씹뇬","씹보지","씹새","씹새기","씹새끼","씹새리","씹세","씹쉐","씹스키","씹쌔","씹이","씹자지","씹질","씹창","씹탱","씹퇭","씹팔","씹할","씹헐","아가리","아갈","아갈이","아갈통","아구창","아구통","아굴","얌마","양년","양놈","엄창","엠병","여물통","염병","엿같","옘병","옘빙","오입","왜년","왜놈","욤병","육갑","은년","을년","이년","이새끼","이새키","이스끼","이스키","임마","자슥","잡것","잡넘","잡년","잡놈","저년","저새끼","접년","젖밥","조까","조까치","조낸","조또","조랭","조빠","조쟁이","조지냐","조진다","조찐","  조질래","존나","존나게","존니","존만"," 존만한","좀물","좁년","좆","좁밥","좃까","좃또","좃만","좃밥","좃이","좃찐","좆같","좆까","좆나","좆또","좆만","좆밥","좆이","좆찐","좇같","좇이","좌식","주글","주글래","주데이","주뎅","주뎅이","주둥아리","주둥이","주접","주접떨","죽고잡","죽을래","죽통","쥐랄","쥐롤","쥬디","지랄","지럴","지롤","지미랄","짜식","짜아식","쪼다","쫍빱","찌랄","창녀","캐년","캐놈","캐스끼","캐스키","캐시키","탱구","팔럼","퍽큐","호로","호로놈","호로새끼","호로색","호로쉑","호로스까이","호로스키","후라들","후래자식","후레","후뢰","씨ㅋ발","ㅆ1발","씌발","띠발","띄발","뛰발","띠ㅋ발","뉘뮈","ㅅㅂ","ㅆㅂ","ㅂㅅ","ㅄ","ㅈㄹ","좃","좇","씹","시바", "바보", "멍청이", "쉬불", "쉬뿔"]
function response(room, msg, sender, isGroupChat, replier, ImageDB) {
    msg = msg.trim(); //이거 왜있는지 모르면 골롬
    room = room.trim();
    sender = sender.trim();
    /*도배 방지*/
    if (preMsg[room] == msg) { //채팅 내용이랑 직전에 수신된 채팅 내용이 같으면,
        return; //도배로 간주하고 response 함수 종료
    }
    preMsg[room] = msg; //수신된 채팅 내용 저장
		var timea = new Date().getTime();
	    if (count[room] === undefined) { //한 번도 수신된 적이 없는 경우,
        count[room] = 1; //수신된 횟수에 1 저장
    } else { //아니면
        count[room]++; //1증가
    }
    if (count[room] == 300) { //200번 다 채우면,
        replier.reply("[공지]\n<욕설>\n과도한 <도배 / 방주제 관련없는 이야기>\n<사진, 특히 채팅 캡처 도배>\n<싸가지없는 말투>\n과도한 <친목 / 반말>\n<개념없는 행동>\n<크랙 공유>\n<기타 대한민국 법에 저촉되는 행위>\n시\관리자에게 제재받을수 있습니다.\n●디스코드: goo.gl/MXKJSd\n●방장 견적상담: goo.gl/gBvwZk\n●공식업체: compury.com\n●신고/이의제기: goo.gl/r6Bc5t\n모바일 메뉴열고 우측상단\nPC 채팅창 방제아래 상단바\n♡->♥ 하트 보탁 드려요"); //채팅 보내고,
        count[room] = 0; //0으로 초기화
    }   
if(admin.indexOf(sender)>-1) {	
	if(msg.trim()=="!카운트"){
		replier.reply(count[room]+"/300\n캬옹봇의 챗은 계산하지 않음.")
		}    
		if(msg == "!리로드")
	{
	Api.reload()
	replier.reply("리로드 되었습니다!")
	}				
		if (msg == "!업데이트") {
				replier.reply("다운 중...")
			function copyFileFromWeb()
			replier.reply("리로드 중...")
				Api.reload()
			replier.reply("업데이트 성공!")
		}
		if (msg == "!프사") {
   var img = ImageDB.getProfileImage();
   replier.reply(img);
}}
else if(admin.indexOf(sender)==-1) {
	if(msg.trim()=="!카운트"){
	replier.reply("관리자가 아닙니다.")
	}
	if(msg == "!리로드")
	{
	replier.reply("관리자가 아닙니다.")
	}
		if(msg == "!업데이트")
	{
	replier.reply("관리자가 아닙니다.")
	}
		if (msg == "!프사") {
		replier.reply("관리자가 아닙니다.")
	}
}
if(msg.trim()=="!실검"){
var 실검=[];
for(var abab=1;abab<21;abab++){
실검.push(abab+". "+getHtml("http://rank.search.naver.net/rank.js").replace(/\"/g, "").split("keyword:")[abab].split(",")[0]);
}
replier.reply(실검.join("\n"));
}
if (msg == "!날씨") {
        var data = Utils.getWebText("https://m.search.naver.com/search.naver?query=날씨");
        var data2 = data.split("전국날씨</strong>");
        var data3 = data2[1].split("특보");
        var data4 = data3[0].replace(/(<([^>]+)>)/g, "");
        data4 = data4.trim();
        data4 = data4.replace(/  /g, "");
        data4 = data4.replace(/도씨/g, "℃");
        data4 = data4.replace(/ /g, ", ");
        replier.reply("[현재 날씨]\n" + data4);
    }
if (msg == "!명령어") {
	replier.reply("◆[캬옹봇 3.0] 명령어 목록◇\n▼전체보기 클릭▼​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​\n[사람들]\n▶!치킨 :: 제작자가 넣고 싶어서 넣음.\n▶!지비 :: 방장이 지비라서\n▶!케이시 :: 케이시가 시켜서\n▶!미쉘 :: 미쉘이 시켜서\n▶!티알 :: 내가 하고싶어서\n▶!불여우 :: '나'니까.\n[유행어 및 랜덤]\n▶ㅇㅈ? :: ㅇㅇㅈ, ㄴㅇㅈ 으로 답해준다.\n▶ㅂㅇㄹ :: 각종 유행어 인사말로 답해준다.\n▶\n소라고둥(포함 시) :: 스폰지밥의 그 소라고둥 맞다.\n▶쓰읍 :: 미쓰 또는 미쓰 테이크로 답해준다.(테스터 훈)\n▶!가위바위보 :: 봇과 가위바위보를 할 수 있다. 사용법: !가위바위보 <가위, 바위(주먹), 보 중 하나>\n▶!주사위 :: 주사위를 굴릴 수 있다.\n[검색 및 정보]\n▶!공지 :: 이 방의 공지를 확인할 수 있다.\n▶!디스코드: 이방의 디스코드 주소를 확인할 수 있다.\n▶!시간 :: 지금 현재 시각을 확인할 수 있다.\n▶!디지털시계 :: 지금 현재 시각을 도트로 확인할 수 있다.\n▶!검색 :: 네이버 검색을 할 수 있다. 사용법: !검색 <검색하고 싶은 것>\n▶!유튜브 :: 유튜브 검색을 할 수 있다. 사용법: !유튜브 <검색하고 싶은 것>\n▶!구글 :: 구글 검색을 할 수 있다. 사용법: !구글 <검색하고 싶은 것>\n▶!나무위키 :: 나무위키 검색을 할 수 있다. 사용법: !나무위키 <검색하고 싶은 것>\n▶!실검 :: 현재 네이버의 실시간 검색어 순위를 확인할 수 있다.\n▶!날씨 :: 현재 전국 날씨를 알려준다.\n▶!지역날씨 :: 현재 지역의 날씨를 알 수 있다. 사용법: !지역날씨 <검색하고 싶은 지역>\n▶!번역 :: 실시간 번역을 할 수 있다. 사용법: !번역 <번역하고 싶은 언어> <번역할 문장>\n▶!언어 :: 번역에서 사용 가능한 언어를 표시합니다.\n▶!차트 :: 네이버 뮤직에서 실시간 차트를 가져옵니다.(느림)\n▶!비트코인 :: 현재 암호화폐의 시세를 알려줍니다.\n▶!가사 :: 노래의 가사를 알려줍니다. 사용법 !가사 <노래 제목>")
}
if (msg == "!차트") {
var charts = [];
for(var i=1;i<11;i++) {
var a = Utils.getWebText("http://m.music.naver.com/listen/top100.nhn?domain=DOMESTIC").split("<span class=\"rank\">")[i].split("</span>")[0];
var b = Utils.getWebText("http://m.music.naver.com/listen/top100.nhn?domain=DOMESTIC").split("<strong class=\"tit\"> ")[i].split("</strong>")[0];
var c = Utils.getWebText("http://m.music.naver.com/listen/top100.nhn?domain=DOMESTIC").split("<span class=\"stit\">")[i].split("</span>")[0];
charts.push("순위 : "+a+"\n제목 : "+b+"\n아티스트(앨범) : "+c);
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
for(var i=1; i<=9; i++) { //반복
vmlist.push(currency[i].split('"')[0] + " : " + last[i].split('"')[0]); //변수 생성
}
replier.reply(vmlist.join("원\n")); //보내기
}
/* 여기서 부턴 포함 확인하는거임 */
try {
        if (msg.split(" ")[0]=="!가사"){
        	var u = Utils.getWebText("https://m.search.naver.com/search.naver?query=" + encodeURIComponent  (msg.substr(4)+"가사"));
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
   
if (msg.indexOf("!위키 ") == 0) {
   replier.reply(wiki(msg.substring(4)))
    }
	var timeb = new Date().getTime();
	var timec = (timeb-timea)/1000
	if (msg == "!반응속도") {
	replier.reply("캬옹봇의 반응속도는"+timec+"초입니다.")
	}
    var msg = msg.replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z)]/gi,"");
    for(var n=0;n<words.length;n++){
        if(msg.indexOf(words[n])!=-1){
            var data = AI.getChat(sender); //이미 저장된 내용을 불러옴
            war = Number(data)+1
            if (data == null) { //이미 저장된게 없다면
                DB.saveData(sender, "1"); //새로 저장
                replier.reply("첫욕설\n쓰읍! 방금 욕설이 감지 되었습니다! 욕설 사용에 주의 하십시오.\n"+sender+"님의 경고수는 1회 입니다\n 10회 이상시 강퇴될 수 있습니다.");
            } else { //이미 저장된게 있다면,
                DB.saveData(sender, war);
                replier.reply("쓰읍! 방금 욕설이 감지 되었습니다! 욕설 사용에 주의 하십시오.\n"+sender+"님의 경고수는"+war+"입니다\n 10회 이상시 강퇴될 수 있습니다.");
            }
        break;
        }
        }
        }


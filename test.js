if (msg == "!식별코드 확인") {
  if ((inick).indexOf(sender) == -1) { //식별코드-닉네임 배열 안에 전송자의 닉네임이 있는지 확인
    
  } else {
    var tcheck = true //while 탈출용 변수
    while (tcheck === false) { //while 값이 false일 동안
      var n = 0;
      n = Math.floor(Math.random() * 9000 + 1000); //랜덤 네자리수 생성
      if (n.indexOf(icode) == -1) { //생성한 숫자가 기존 식별코드 배열 안에 있는지 확인
        inick.push(sender) //식별코드-닉네임 배열 안에 전송자의 닉네임 추가
        icode.push(n) //식별코드 배열 안에 전송자의 닉네임 추가
        replier.reply(sender + n)
        var tcheck = true //없으면 tcheck 값을 true로 바꾸고 while문 탈출
      }
    }
  }


}
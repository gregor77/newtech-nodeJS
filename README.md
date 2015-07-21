nodeJS sample Project
===================================

==== express  강의 ====

1. 세팅
 [주의] Mac에서 설치할때 root권한으로 설치하지 않으면 -g옵션을 주더라도,
  path에 글로벌로 추가되지 않기 때문에, express command를 찾을수 없다는 에러가 발생
 -> $su root을 통해서 npm모듈을 설치한다.
  
 - node 설치
   . 서버사이드 프로그래밍을 javascript로 할 수 있다. (like 크롬의 console)
 - express 모듈 설치
   . 웹 어플리케이션을 쉽게 만들수 있는 express framework
   . $npm install -g express
   . $npm install -g express-generator@4
 -  eclipse IDE 사용
   .enide-Studio 플러그인 설치행
   .File > New > Node Project 프로젝트 생성
   .프로젝트 선택후, Javascript Source File  생성
   .터미널 실행 -> 해당 프로젝트로 이동 후, $node app01.js 실행
   .node 실행 시, ".js"는 생략해도 된다.
   
2. 왜 node를 서버로 사용하는가?
 - 적은 비용으로 고효율을 낼 수 있다. 
 - 싱글 Thread 사용 : 동시접속자가 많더라도 메모리가 폭발적으로 증가하지 않는다.

3. 실습
 1) express 프로젝트 생성후 실행
   .$express helloExpress
   .$npm install
   .$npm start
   .명렁어를 실행하면 express 샘플 프로젝트가 만들어지고, port 3000번으로 실행된다.
   .브라우저에서 http://localhost:3000/ 실행

4. [실습] eclipse에서 express 프로젝트
  - require()는 java로 치면, import + new 객체생성
  - node.js는 비동기, closer 개념, event 기반 이 세가지가 key인듯.
  - New > Project > Express Project 단, Template은 ejs로 한다.
  - $npm install 하는 이유? 
    .package.json에 정의되어 있는 dependency모듈을 설치하기 위함
  - $npm start 했을때 실행되는 파일?
    .package.json파일에  start에 정의되어 있는 파일이 실행된다.

  1) nodemon 모듈 설치
    - 서버에 변경이 있을때 서버를 restart 해준다.
    - $npm install -g nodemon
    - package.json에  start에 있는 node를 nodemon으로 변경한다.
 
  2) dependency 수정 (ExpressTemplate 프로젝트)
    - ExpressTemplate 프로젝트를 생성 후, package.json에 start하는 부분을 nodemon으로 수정
    - dependency 변경
    	"dependencies": {
		    "express": "~4.2.0",
		    "static-favicon": "~1.0.0",
		    "morgan": "~1.0.0",
		    "cookie-parser": "~1.0.1",
		    "body-parser": "~1.0.0",
		    "debug": "~0.7.4",
		    "express-session":"~1.7.2",
		    "ejs": "~1.0.0",
		    "mongoose":"~3.8.14",
		    "multer":"~0.1.3",
		    "socket.io":"~1.0.6",
		    "passport":"~0.2.0",
		    "passport-local":"~1.0.0",
		    "passport-google-oauth":"~0.1.5",
		    "connect-flash":"0.1.1",
		    "bcrypt-nodejs":"~0.0.3"
		  }
    - app.js, bin/www 두 파일 변경

  3) nodeTemplate으로 템플릿 변경
   - ExpressTemplate 프로젝트에 기존 파일들 삭제 후, default nodeTemplate으로 udpate

  4) Step01Routing 이름의 Node 프로젝트 생성
   - nodeTemplate의 템플릿 정보들을 copy > paste
   - app.js에 하기 코드 때문에, html로 view를 작업해도 무방
      app.engine(".html", ejs.__express);
      app.set('views', path.join(__dirname, 'views'));
      app.set('view engine', 'html');
   
  5) Step02Prameter Node 프로젝트 생성
   - flash 모듈 : redirect했을때 특정 데이터를 가지고 갈 수 있는 모듈명

  6) Step03Session Node 프로젝트 생성

  7) Setp05SocketIO node 프로제트 생성
   - www에 작성
   - server 객체 socketIO는 의존하고 있다.



[참조] 
1. proxy 설정
 $npm config set proxy http://....
 $npm config set https-proxy https://....
 $npm config set strict-ssl false 

2. npm 모듈 삭제
 $npm uninstall [모듈명]

3. Express 프로젝트 디렉토리 설명
- app.js : 서버의 동작을 기술
- public : 정적인 컨텐츠(html, js, image, 동영상)는 public 폴더에 넣는다.
  . 공개 폴더라 생각하면 된다. 정적 컨텐츠
  . views는 WEB-INF 하위 폴더라 생각하면 된다.
- routes
  . 하나의 웹 어플리케이션은 클라이언트에 대해서 다양한 요청을 처리해야 한다.
  . 모든 요청이 app.js에 들어가있으면 스파게티 코드가 된다.
  . 어떤 요청에 대해서 어떤 view 를 이동해서 어떤 처리를 할지 정의되어 있다.
- views : db에 있는 내용을 가지고 와서 동적으로 페이지를 그리는 경우. 동적인 컨텐츠 들어간다.
  . jade는 형식이 너무 동떨어져 있고, 기존에 jsp, php 작업한 사람은 ejs가 익숙할 것이다.
  . 해당 디렉토리에는 jsp가 들어가진다고 생각하면 된다.
  . EJS = javascript + HTML (cf. Java Server Page = JAVA + HTML)
  . ex. index.ejs 파일
    = title 의 변수는 app.js에 넣을 것이다.
  . ejs 확장자 파일은 코드 가독성이 떨어진다. html로 작업을 할 것인다. -> html을 ejs로 바꿔주는 부분은 app.js에 있다.  (Line 44)

4. emmet 플러그인 설치  
 - markup을 편하게 하기 위해서 이클립스 플러그인 설치
 - 사용 방법 : 태그를 입력 후, Tab 클릭 (cf. emmet.io에 가면 상세하게 나와있다)
  .div*5 입력 후, tab
  .ul -> tab
  .div.myClass#myId -> tab
  .div.myClass#myId{myDiv} -> tab
  .ul>li -> tab
  .ul>li*5 -> tab
  .lorem -> tab하면, 의미없는 문자열 생성 가능
  .ul>li>a -> tab
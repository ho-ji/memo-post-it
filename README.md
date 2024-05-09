# POST IT! YOU IDEA 💡

HTML5에서 추가된 로컬스토리지를 활용한 반응형 메모장 구현.

메모 추가, 삭제, 수정 기능을 지원하고, 메모에는 제목, 내용, 배경색 저장 가능.

<br>

🔗[링크](https://ho-ji.github.io/memo-post-it/)

<br>


## 기술 스택
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 

<br>

## 구현 기능


**1. 메모 추가 기능**
- 메모 작성 input을 클릭하면 UI 확장
    - 제목 작성
    - 메모 작성
    - 배경색 선택 가능
    - 메모 새로고침 가능(제목, 메모, 배경색 초기화)
    - 메모 추가 버튼 선택 시, 로컬스토리지에 메모 추가
        - 제목과 메모가 비어있다면, 메모를 추가하지 못하고 alert(sweet alert API)로 빈 메모 생성 불가 안내를 표시
- 메모 작성 도중 input 외의 요소를 클릭하면 메모 작성이 취소 (작성 중인 메모 초기화)

<br>

**2. 메모 디스플레이**
- 로컬스토리지에 저장된 메모가 없을 때는 “[메모장이 비어있습니다]” 안내 문구 표시
- 화면 크기에 맞춰 반응형으로 메모를 디스플레이
- 마우스가 올라간 메모에서만, 메모 삭제 버튼이 노출
- 메모를 클릭하면, 메모 수정 모달 띄움,
- 메모 수가 늘어났거나, 페이지 크기가 작아 페이지에 스크롤이 생기면 Scroll on Top 버튼 표시됩니다.

<br>

**3. 메모 수정**
- 메모를 클릭하면, 메모 수정 모달을 띄움.
- 모달 창외의 영역을 클릭하면, confirm(sweet alert API)로 메모 수정 취소 여부를 확인
    - 수정 취소 확인 시 모달 바로 종료
- 제목 수정/ 메모 수정/ 배경색 수정 가능
- 닫기 버튼을 누르면 모달을 바로 종료
- 메모 새로고침 가능(제목, 메모, 배경색 초기화)
- 메모 추가 버튼 선택 시, 모달 종료 후 로컬스토리지에 해당 메모 수정

<br>

**4. 메모 삭제**
- 디스플레이 된 메모에서 마우스가 올라간 메모만, 메모 삭제 버튼이 노출
- 해당 버튼을 누르면, “해당 메모를 삭제하시겠습니까??”라는 confirm(sweet alert API)로 메모 삭제 여부를 확인
    - 삭제 확인을 누르면, 해당 메모를 로컬스토리지에서 삭제

<br>

5. 그외 사항
- 메모 배경색이 많지 않았으면 하여, 6개의 색상만 선택가능한 커스텀 color picker를 생성함
    - color picker의 위치는 배경색 선택 버튼에 종속적
    - 페이지 사이즈가 변경이 있다면 color picker 비노출
- textarea는 입력된 줄 수에 맞춰 크기 조절

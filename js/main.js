
const parent = document.querySelector('html');
const sectionInput = parent.querySelector('.section-input');
const inputTitle = parent.querySelector('.input-title');
const inputContent = parent.querySelector('.input-content');
const inputBtnContainer = parent.querySelector('.input-btn-container');

inputTitle.addEventListener('input', e=> {
  inputTitle.style.height = 'auto';
  inputTitle.style.height = inputTitle.scrollHeight + 'px';
});

/* 입력된 줄 수에 맞춰 textarea 크기 조절 */
inputContent.addEventListener('input', ()=> {
  inputContent.style.height = 'auto';
  inputContent.style.height = inputContent.scrollHeight + 'px';
});

/*메모 작성 클릭시 입력창 노출/그 외 영역 클릭 시 입력창 닫기*/
parent.addEventListener('click', (e)=>{
  if(e.target.className && sectionInput.querySelector('.'+e.target.className) !== null){ 
    inputTitle.style.display = 'block';
    inputBtnContainer.style.display = 'flex';
  }
  else{
    inputTitle.style.display = 'none';
    inputContent.value ="";
    inputTitle.value = "";
    inputBtnContainer.style.display = 'none';
  }
})

/*배경 선택 버튼 선택 시*/
const btnColor = parent.querySelector('.btn-color');
btnColor.addEventListener('click', e =>{

});

/*메모 초기화 버튼 선택 시, 입력된 값 초기화*/
const btnRefresh = parent.querySelector('.btn-refresh');
btnRefresh.addEventListener('click', e => {
  inputTitle.value = "";
  inputContent.value = "";
});
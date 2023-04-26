
const parent = document.querySelector('html');
const sectionInput = parent.querySelector('.section-input');
const inputTitle = parent.querySelector('.input-title');
const inputContent = parent.querySelector('.input-content');
const inputBtnContainer = parent.querySelector('.input-btn-container');
const btnColor = parent.querySelector('.btn-color');
const colorPicker = parent.querySelector('.color-picker');
const btnRefresh = parent.querySelector('.btn-refresh');
const btnDone = parent.querySelector('.btn-done');

const sectionDisplay = parent.querySelector('.section-display');

/* 입력된 줄 수에 맞춰 textarea 크기 조절 */
inputTitle.addEventListener('input', e=> {
  inputTitle.style.height = 'auto';
  inputTitle.style.height = inputTitle.scrollHeight + 'px';
});

inputContent.addEventListener('input', ()=> {
  inputContent.style.height = 'auto';
  inputContent.style.height = inputContent.scrollHeight + 'px';
});


parent.addEventListener('click', (e)=>{
  /* 메모 작성 선택 시 확장 */
  if(e.target === inputContent){
    inputTitle.style.display = 'block';
    inputBtnContainer.style.display = 'flex';
    colorPicker.style.display = 'none';
  }
  /* 배경선택버튼 선택시 */
  else if(e.target === btnColor || e.target.parentElement === btnColor){
    colorPicker.style.display = 'flex';
    colorPicker.style.left= (btnColor.offsetLeft- 150) + 'px';
    colorPicker.style.top = (btnColor.offsetTop + 40) + 'px';
  }
  
  /*메모 초기화 버튼 선택 시, 입력된 값 초기화*/
  else if(e.target === btnRefresh || e.target.parentElement === btnRefresh){
    resetInputText();
    colorPicker.style.display = 'none';
    resetColorPicker();
  }
  
  /*color-picker 선택 시*/
  else if(e.target === colorPicker || e.target.id.startsWith("btn-color-")){
    if(e.target !== colorPicker){
      sectionInput.style.backgroundColor = getComputedStyle(e.target).backgroundColor;
      for(c of colorPicker.children){
        if(c.classList.contains('color-selected')){
          c.classList.remove('color-selected');
        }
        else if(c === e.target){
          c.classList.add('color-selected');
        }
      }
    }
    colorPicker.style.display = 'none';
  }
  
  /* done 버튼 선택 시*/
  else if(e.target === btnDone || e.target.parentElement === btnDone){
    if(inputTitle.value === "" && inputContent.value === ""){
      alert('빈 메모는 추가할 수 없습니다!');
    }
    else{
      saveMemo(inputTitle.value, inputContent.value, getComputedStyle(sectionInput).backgroundColor);
      inputTitle.style.display = 'none';
      resetInputText();
      inputBtnContainer.style.display = 'none';
      colorPicker.style.display = 'none';      
      resetColorPicker();
    }
  }

  /*section-input의 내부요소 선택 시, color-picker만 사라짐*/
  else if(e.target.className && sectionInput.querySelector('.'+e.target.className)){
    colorPicker.style.display = 'none';
  }
  
  
  /*section-input 및 color-picker 외부요소 선택 시, 둘다 사라짐*/
  else{
    inputTitle.style.display = 'none';
    resetInputText();
    inputBtnContainer.style.display = 'none';
    colorPicker.style.display = 'none';
    resetColorPicker();
  }
})

/* 화면 크기 변화 시 color-picker 지우기 및 메모 재렌더링*/
window.addEventListener('resize',function(){
  if(colorPicker.style.display !== 'none'){
    colorPicker.style.display = 'none';
  }
  render();
})

const resetInputText = ()=>{
  inputContent.value ="";
  inputTitle.value = "";
  inputTitle.style.height = 'auto';
  inputContent.style.height = 'auto';
}
const resetColorPicker = ()=>{
  for(c of colorPicker.children){
    if(c.classList.contains('color-selected')){
      c.classList.remove('color-selected');
    }
  }
  colorPicker.children[0].classList.add('color-selected');
  sectionInput.style.backgroundColor = 'white';
}

const saveMemo = (title, content, bc) => {
  const n = localStorage.length / 3;
  localStorage.setItem("title"+ n, title);
  localStorage.setItem("content"+ n, content);
  localStorage.setItem("bc"+ n, bc);
  render();
};

const render = () => {
  sectionDisplay.innerHTML = "";
  if(localStorage.length !== 0){
    let memoCnt = localStorage.length / 3;
    for(let n = memoCnt - 1; n >= 0; n--){
      let memoItem = document.createElement('div');
      let memoTitle = document.createElement('p');
      let memoContent = document.createElement('p');
      
      memoTitle.textContent = localStorage.getItem("title"+ n);
      memoContent.textContent = localStorage.getItem("content"+ n);
      let bc = localStorage.getItem("bc" + n);

      if(memoTitle.textContent !== "")
        memoTitle.setAttribute("style", "font-weight: 600; margin-bottom: 10px");
      memoTitle.setAttribute("data-memo-number", n)
      memoContent.setAttribute("style", "margin-bottom: 10px");
      memoItem.setAttribute("style", "background-color:" + bc);
      memoItem.setAttribute("class", "display-memo");

      memoItem.appendChild(memoTitle);
      memoItem.appendChild(memoContent);

      sectionDisplay.appendChild(memoItem);
    }
  }
  else{
    const messageEmptyMemo = document.createElement('p');
    messageEmptyMemo.textContent = "[메모장이 비어있습니다]";
    messageEmptyMemo.setAttribute("style", "font-size: 1.5rem; margin:100px auto 0px auto; color: #cccccc;");
    sectionDisplay.appendChild(messageEmptyMemo);
  }
};
render();
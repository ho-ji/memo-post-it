
const parent = document.querySelector('html');
const sectionInput = parent.querySelector('.section-input');
const inputTitle = parent.querySelector('.input-title');
const inputContent = parent.querySelector('.input-content');
const inputBtnContainer = parent.querySelector('.input-btn-container');
const btnPalette = parent.querySelector('.btn-palette');
const colorPicker = parent.querySelector('.color-picker');
const btnRefresh = parent.querySelector('.btn-refresh');
const btnDone = parent.querySelector('.btn-done');

const sectionDisplay = parent.querySelector('.section-display');

const editModal = parent.querySelector('#edit-modal');
const editModalBox = parent.querySelector('#edit-modal-box');
const editTitle = parent.querySelector('#edit-title');
const editContent = parent.querySelector('#edit-content');
const btnEditColor = parent.querySelector('#btn-edit-color');
const btnEditRefresh = parent.querySelector('#btn-edit-refresh');
const btnEditDone = parent.querySelector('#btn-edit-done');
const btnEditClose = parent.querySelector('#btn-edit-close');

/* 입력된 줄 수에 맞춰 textarea 크기 조절 */
const textArea = parent.querySelectorAll('textarea');
textArea.forEach(item =>{
  item.addEventListener('input', ()=>{
    item.style.height = 'auto';
    item.style.height = item.scrollHeight + 'px';
  })
})


parent.addEventListener('click', (e)=>{
  /* 메모 작성 선택 시 확장 */
  if(e.target === inputContent){
    inputTitle.style.display = 'block';
    inputBtnContainer.style.display = 'flex';
    colorPicker.style.display = 'none';
  }
  /* 배경선택버튼 선택시 */
  else if(e.target === btnPalette){
    colorPicker.style.display = 'flex';
    const pos = btnPalette.getBoundingClientRect();
    colorPicker.style.left= pos.x - 150 +'px';
    colorPicker.style.top = pos.y + 40 +'px';
  }
  
  /*메모 초기화 버튼 선택 시, 입력된 값 초기화*/
  else if(e.target === btnRefresh){
    resetInputText();
    colorPicker.style.display = 'none';
    resetColorPicker();
  }
  
  /*color-picker 선택 시*/
  else if(e.target === colorPicker || e.target.id.startsWith("btn-color-")){
    if(e.target !== colorPicker){
      if(inputBtnContainer.style.display === 'flex')
        sectionInput.style.backgroundColor = getComputedStyle(e.target).backgroundColor;
      else
        editModalBox.style.backgroundColor = getComputedStyle(e.target).backgroundColor;
      for(c of colorPicker.children){
        if(c.classList.contains('color-selected')){
          c.classList.remove('color-selected');
        }
        else if(c === e.target){
          c.classList.add('color-selected');
        }
      }
      colorPicker.style.display = 'none';
    }
  }
  
  /* done 버튼 선택 시*/
  else if(e.target === btnDone){
    if(inputTitle.value === "" && inputContent.value === ""){
      swal({
        text: "빈 메모는 만들 수 없습니다!",
        icon: "info"
      })
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

  else if(e.target === btnEditClose){
    editModal.style.visibility = "hidden";
  }

  /* edit 배경 변경 선택 시*/
  else if(e.target === btnEditColor){
    colorPicker.style.display = 'flex';
    const pos = btnEditColor.getBoundingClientRect();
    colorPicker.style.left = pos.x - 150 +'px';
    colorPicker.style.top = pos.y + 40 +'px';
    colorPicker.style.position = 'fixed';
  }
  /* edit 새로고침 선택 시 */
  else if(e.target === btnEditRefresh){
    resetEditText();
    colorPicker.style.display = 'none';
    resetColorPicker();
  }

  /* edit done 선택 시 */
  else if(e.target === btnEditDone){
    if(editTitle.value === "" && editContent.value === ""){
      swal({
        text: "빈 메모는 만들 수 없습니다!",
        icon: "info"
      })
    }
    else{
      editMemo(editTitle.value, editContent.value, getComputedStyle(editModalBox).backgroundColor, editModalBox.dataset.memoNumber);
      editModal.style.visibility = "hidden";
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

  /* 수정 모달 영역 외 선택 시, 모달 삭제*/
  if(e.target === editModal){
    swal({
      text: "메모를 수정하지 않고 나가겠습니까?",
      buttons: ["취소", "확인"], 
    }).then(v=>{if(v) editModal.style.visibility = "hidden";});
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
const resetEditText = () =>{
  editContent.value = "";
  editTitle.value = "";
  editContent.style.height = 'auto';
  editTitle.style.height = 'auto';
}
const resetColorPicker = ()=>{
  for(c of colorPicker.children){
    if(c.classList.contains('color-selected')){
      c.classList.remove('color-selected');
    }
  }
  colorPicker.children[0].classList.add('color-selected');
  sectionInput.style.backgroundColor = 'white';
  colorPicker.style.position = 'absolute';
}

const saveMemo = (title, content, bc) => {
  const n = localStorage.length / 3;
  localStorage.setItem("title"+ n, title);
  localStorage.setItem("content"+ n, content);
  localStorage.setItem("bc"+ n, bc);
  render();
};

const editMemo = (title, content, bc, n) => {
  localStorage.setItem("title"+ n, title);
  localStorage.setItem("content"+ n, content);
  localStorage.setItem("bc"+ n, bc);
  render();
}
const deleteMemo = (n) => {
  const len = localStorage.length/3;
  n = Number(n);
  for(let i=n+1; i<len; i++){
    let tempTitle = localStorage.getItem("title" + i);
    let tempContent = localStorage.getItem("content" + i);
    let tempBc = localStorage.getItem("bc" + i);
    console.log(tempTitle,tempContent,tempBc, i);
    localStorage.setItem("title"+(i-1), tempTitle);
    localStorage.setItem("content"+(i-1), tempContent);
    localStorage.setItem("bc"+(i-1), tempBc);
  }

  localStorage.removeItem("title"+(len-1));
  localStorage.removeItem("content"+(len-1));
  localStorage.removeItem("bc"+(len-1));
  render();
}

const render = () => {
  sectionDisplay.innerHTML = "";
  if(localStorage.length !== 0){
    let memoCnt = localStorage.length / 3;
    for(let n = memoCnt - 1; n >= 0; n--){
      let memoItem = document.createElement('div');
      let memoTitle = document.createElement('p');
      let memoContent = document.createElement('p');
      let btnDeleteMemo = document.createElement('button');
      
      memoTitle.textContent = localStorage.getItem("title"+ n);
      memoContent.textContent = localStorage.getItem("content"+ n);
      let bc = localStorage.getItem("bc" + n);

      if(memoTitle.textContent !== "")
        memoTitle.setAttribute("style", "font-weight: 600; margin-bottom: 10px");
        memoItem.setAttribute("style", "background-color:" + bc);
        memoItem.setAttribute("class", "display-memo");
        memoItem.setAttribute("data-memo-number", n)
        btnDeleteMemo.setAttribute("class", "btn-delete-memo");

      memoItem.appendChild(memoTitle);
      memoItem.appendChild(memoContent);
      memoItem.appendChild(btnDeleteMemo);

      sectionDisplay.appendChild(memoItem);
    }
  }
  else{
    const messageEmptyMemo = document.createElement('p');
    messageEmptyMemo.textContent = "[메모장이 비어있습니다]";
    messageEmptyMemo.setAttribute("style", "font-size: 1.5rem; margin:100px auto 0px auto; color: #cccccc;");
    sectionDisplay.appendChild(messageEmptyMemo);
  }
  /*메모가 렌더링 될때마다 이벤트 리스너추가*/
  const memos = document.querySelectorAll('.display-memo');
  memos.forEach(item =>{
    item.addEventListener('click', (e)=>{
      /*메모 삭제 */
      if(e.target.className === 'btn-delete-memo'){
        swal({
          text: "해당 메모를 삭제하겠습니까??",
          buttons: ["취소", "확인"], 
        }).then(v=>{
          if(v){
            deleteMemo(item.dataset.memoNumber);
          }
        });
      }
      else{

        const memoNumber = item.dataset.memoNumber;
        editModal.style.visibility = "visible";
        
        editTitle.value = localStorage.getItem("title"+memoNumber);
        editTitle.style.height = 'auto';
        editTitle.style.height = editTitle.scrollHeight + 'px';
        
        editContent.value = localStorage.getItem("content"+memoNumber);
        editContent.style.height = 'auto';
        editContent.style.height = editContent.scrollHeight + 'px';
        
        editModalBox.style.backgroundColor = localStorage.getItem("bc"+memoNumber);
        
        editModalBox.setAttribute('data-memo-number', memoNumber);
      }
      });
      item.addEventListener('mouseover', (e)=>{
      item.children[2].style.visibility = "visible";
    })
    item.addEventListener('mouseout', (e)=>{
      item.children[2].style.visibility = "hidden";
    })
  })
};
window.onscroll = () => {
  const btnTopScroll = parent.querySelector('#btn-top-scroll');
  if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
    btnTopScroll.style.display = 'block';
  }
  else{
    btnTopScroll.style.display = 'none';
  }
}
const toTopScroll = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
render();
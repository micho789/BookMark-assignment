var BookmarkNameInput = document.getElementById("BookmarkName");
var BookmarkUrlInput = document.getElementById("BookmarkUrl");
var closeBtn = document.getElementById("close-Btn");
var modalBox = document.querySelector(".box-info");
var siteContainer=[];

if(localStorage.getItem("site")!==null){
    siteContainer=JSON.parse(localStorage.getItem("site"))
    display()
}

function addSite(){
    if (BookmarkNameInput.classList.contains("is-valid") && BookmarkUrlInput.classList.contains("is-valid")){
    var site = {
        name:BookmarkNameInput.value,
        link:BookmarkUrlInput.value
    }
    siteContainer.push(site)
    console.log(siteContainer)
    localStorage.setItem("site",JSON.stringify(siteContainer))
    display()
    clearform()
    BookmarkNameInput.classList.remove("is-valid");
    BookmarkUrlInput.classList.remove("is-valid");
} else {
    modalBox.classList.remove("d-none");
}
}

function display(){
    var web='';
    for(var i=0;i<siteContainer.length;i++){
    web+=`
    <tr>
        <td>${[i+1]}</td>
        <td class="text-capitalize">${siteContainer[i].name}</td>
        <td>
            <button class="btn btn-visit" onclick="visitSite(${i})">
                <i class="fa-solid fa-eye pe-2"></i> Visit
            </button>
        </td>
        <td>
            <button class="btn btn-delete" onclick="deleteSite(${i})">
                <i class="fa-solid fa-trash-can pe-2"></i> Delete
            </button>
        </td>
    </tr>
    `
    }
    document.getElementById("tableContent").innerHTML=web;
}

function clearform(){
    BookmarkNameInput.value=null;
    BookmarkUrlInput.value=null;
}

function deleteSite(index){
    siteContainer.splice(index,1);
    console.log(siteContainer);
    display();
    localStorage.setItem("site",JSON.stringify(siteContainer));
}

function visitSite(e) {
    if (siteContainer[e].link) {
      open(siteContainer[e].link);
    } else {
      open(`https://${siteContainer[e].link}`);
    }
  }

var pNameRegex = /^[a-z]{3,}/
function nameValid(pvalue){
    if(pNameRegex.test(pvalue)){
        BookmarkNameInput.classList.add("is-valid")
        BookmarkNameInput.classList.remove("is-invalid")
    }
    else{
        BookmarkNameInput.classList.add("is-invalid")
        BookmarkNameInput.classList.remove("is-valid")
    }
}

var pUrlRegex = /^(https)/
function urlValid(pvalue){
    if(pUrlRegex.test(pvalue)){
        BookmarkUrlInput.classList.add("is-valid")
        BookmarkUrlInput.classList.remove("is-invalid")
    }
    else{
        BookmarkUrlInput.classList.add("is-invalid")
        BookmarkUrlInput.classList.remove("is-valid")
    }
}



function closeModal() {
    modalBox.classList.add("d-none");
}

closeBtn.addEventListener("click", closeModal);

document.addEventListener("click", function (anyClick) {
    if (anyClick.target.classList.contains("box-info")) {
      closeModal();
    }
});

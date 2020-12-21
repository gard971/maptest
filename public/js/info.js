var socket = io()
var ID;
(function(){
    var queryString = window.location.search
    var urlParams = new URLSearchParams(queryString)
    if(!urlParams.get("id")){
        alert("noe gikk galt. Sender deg tilbake til hovedsiden")
    }
    else if(localStorage.getItem("username") && localStorage.getItem("key")){
        socket.emit("getAdress", localStorage.getItem("username"), localStorage.getItem("key"), urlParams.get("id"))
    }
    else  if(sessionStorage.getItem("username") && sessionStorage.getItem("key")){
        socket.emit("getAdress", sessionStorage.getItem("username"), sessionStorage.getItem("key"), urlParams.get("id"))
    }
    else if(urlParams.get("id")){
        window.location.href=`login.html?redirect=info.html?id=${urlParams.get("id")}`
    }
    else{
        window.location.href="/"
    }
})()
function windowHandle(ElementID, visible){
    document.getElementById(ElementID).hidden = !visible
}
socket.on("adress", (adress, isOwner) => {
        console.log(isOwner)
            document.getElementById("uploadForm").action = `/upload?id=${adress.id}`
            console.log(document.getElementById("uploadForm").action)
            var div = document.getElementById("infoContainer")
            var downloadsDiv = document.getElementById("downloadsContainer")
            var header = document.createElement("h1")
            var First = adress.owner.substring(0, 1).toUpperCase()
            First += adress.owner.substring(1)
            adress.owner = First
            if(First.indexOf(" ") != -1){
                var nameArray = First.split(" ")
                var lastLetter = nameArray[1].substring(0, 1).toUpperCase()
                nameArray[1] = lastLetter + nameArray[1].substring(1)
                console.log(nameArray)
                adress.owner = nameArray.join(" ")
            }
            header.innerHTML = adress.owner
            div.appendChild(header)
            var undertitle = document.createElement("h3")
            undertitle.innerHTML = adress.adress
            div.appendChild(undertitle)
            adress.info.forEach(element => {
                var p = document.createElement("h5")
                p.innerHTML = element.name + "<img src='media/arrow.png' class='downloadArrow'>"
                p.className = "downlodable"
                p.onclick = function(){
                    window.location.href=`/download?id=${element.id}`
                }
                downloadsDiv.appendChild(p)
            })
    })
document.getElementById("fileupload").addEventListener("change", e => {
    var htmlString = ""
    document.getElementById("uploadlabel").innerHTML = `fil ${e.srcElement.files[0].name} lastet opp`
})
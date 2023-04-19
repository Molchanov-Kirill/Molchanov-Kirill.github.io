let clientIdInput
const url = "https://astartes.takserver.ru"

async function onload() {
    res = await sendUserRequest()
    console.log(window.localStorage.getItem("token"))
    
}

async function sendAddBox() {
    clientIdInput = document.querySelector(".client_id")
    clientId = clientIdInput.value
    fetch(url + `/user/box/${clientId}/add`, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        },
    })
}

async function sendUserRequest() {
    let res = await fetch(url + "/user/box", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        let rootElem = document.querySelector(".box-list")

        for (const prop in res) {
            let box = res[prop]
            let boxElem = document.createElement('div')
            boxElem.classList = ['box']
            let boxTitle = document.createElement('h3')
            boxTitle.innerText = "Box ID: " + box.Id
            boxTitle.classList = ['box__title']
            let boxInfo = document.createElement('div')
            boxInfo.classList = ['box__info']
            
            boxElem.appendChild(boxTitle)
            boxElem.appendChild(boxInfo)
            rootElem.appendChild(boxElem)

            let items = box["Items"]
            
            for (const itemId in items) {
                let itemElem = document.createElement('div')
                itemElem.classList = ["item"]
                itemElem.innerHTML = `<div class="item__row">
                                        <h3 class="item__prop-name">Name:</h3>
                                        <div class="item__prop">${items[itemId].name}</div>
                                    </div>
                                    <div class="item__row">
                                        <h3 class="item__prop-name">Type:</h3>
                                        <div class="item__prop">${items[itemId].type}</div>
                                    </div>
                                    <div class="item__row">
                                        <h3 class="item__prop-name">Human name:</h3>
                                        <div class="item__prop">${items[itemId].human_name}</div>
                                    </div>
                                    <div class="item__row">
                                        <h3 class="item__prop-name">Changed:</h3>
                                        <div class="item__prop">${items[itemId].changed}</div>
                                    </div>
                                    <div class="item__row">
                                        <h3 class="item__prop-name">Checked:</h3>
                                        <div class="item__prop">${items[itemId].checked}</div>
                                    </div>
                                    <div class="item__row">
                                        <h3 class="item__prop-name">Value:</h3>
                                        <div class="item__prop">${items[itemId].value}</div>
                                    </div>
                                    <div class="item__row">
                                        <h3 class="item__prop-name">RawValue:</h3>
                                        <div class="item__prop">${items[itemId].raw_value}</div>
                                    </div>
                                    <div class="item__row">
                                        <h3 class="item__prop-name">FormattedValue:</h3>
                                        <div class="item__prop">${items[itemId].formatted_value}</div>
                                    </div>
                                    <div class="item__row">
                                        <h3 class="item__prop-name">Good:</h3>
                                        <div class="item__prop">${items[itemId].good}</div>
                                    </div>
                                    <div class="item__row">
                                        <h3 class="item__prop-name">UI:</h3>
                                        <div class="item__prop">${items[itemId].ui}</div>
                                    </div>
                                    <div class="item__row">
                                        <h3 class="item__prop-name">Tags:</h3>
                                        <div class="item__prop">${items[itemId].tags}</div>
                                    </div>
                                    <div class="item__row">
                                        <h3 class="item__prop-name">Groups:</h3>
                                        <div class="item__prop">${items[itemId].groups}</div>
                                    </div>
                                    <div class="item__row">
                                        <h3 class="item__prop-name">Meta:</h3>
                                        <div class="item__prop">${items[itemId].meta}</div>
                                    </div>`
                boxInfo.appendChild(itemElem)

                if (items[itemId].type == "switch") {
                    let on_button = document.createElement('input')
                    on_button.setAttribute("type", "button")
                    on_button.setAttribute("value", "on")
                    itemElem.appendChild(on_button)

                    let off_button = document.createElement('input')
                    off_button.setAttribute("type", "button")
                    off_button.setAttribute("value", "off")
                    itemElem.appendChild(off_button)

                    off_button.addEventListener("click", () => {
                        fetch(url + `/user/box/${box["Id"]}/${items[itemId].name}`, {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer " + window.localStorage.getItem("token")
                            },
                            body: JSON.stringify({"command": "off"})
                        })
                    })

                    on_button.addEventListener("click", () => {
                        fetch(url + `/user/box/${box["Id"]}/${items[itemId].name}`, {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer " + window.localStorage.getItem("token")
                            },
                            body: JSON.stringify({"command": "on"})
                        })
                    })
                }
            }
        }
    })
}
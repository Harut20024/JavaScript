const root = document.getElementById("root")

function todoFooter(todos, onchange) {
    const container = document.createElement("div")
    const complited = todos.filter(todo => todo.completed === true).length
    container.innerHTML = `
    <span> ${complited} / ${todos.length} complited </span>
    <button>Clear completed</button>
    `
    const button = container.querySelector("button")
    button.addEventListener("click", () => {
        onchange(todos.filter(todo => todo.completed === false))
    })
    return container
}
function todoForm(add) {
    const container = document.createElement("form")

    container.innerHTML = `
        <input type = "text" />
        <button>add</button>
    `
    container.addEventListener("submit", el => {
        el.preventDefault()
        const input = container.querySelector("input").value
        add(input)

    })

    return container
}
function ListItem(todo, onchange) {
    const container = document.createElement("div")
    container.innerHTML = `
    <label> 
        <input type = "checkbox" ${todo.completed ? "checked" : ""} />
        ${todo.label}
    </label>
    `

    const input = container.querySelector("input")
    input.addEventListener("change", event => {
        onchange(event.target.checked)
    })
    return container
}
function list(todos, onchange) {
    const container = document.createElement("div")
    //calling listitem() and collecting elements
    todos.map(todos => {
        return ListItem(todos, change => {
            todos.completed = change
            onchange()
        })
    }).forEach(element => {
        container.appendChild(element)
    });


    return container
}
function app() {
    //state/infomation
    let todos = [
        { label: "Learn JS", completed: false },
        { label: "Learn Node", completed: false },
        { label: "Learn React", completed: false }
    ]
    //adding here list()
    const container = document.createElement("div")
    function render() {
        container.innerHTML = ""

        container.appendChild(todoForm(function (newtext) {
            todos.push({
                label: newtext,
                completed: false
            })
            render()
        }))
        container.appendChild(list(todos, () => {
            render()
        }))
        container.appendChild(todoFooter(todos, newtodos => {
            todos = newtodos
            render()
        }))

    }

    render()

    return container

}
root.appendChild(app())
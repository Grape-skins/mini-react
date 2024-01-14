// 直接创建
// const div = document.createElement("div")
// div.id = "app"
// document.getElementById("root").append(div)

// const textNode = document.createTextNode("text element")
// textNode.nodeValue = "hihi"
// div.append(textNode)

// object
// const textNode = {
//     type:"text element",
//     props:{
//         nodeValue:"hihi",
//         children:[]
//     }
// }

// const div = {
//     type:"div",
//     props:{
//         id:"app",
//         children:[textNode]
//     }
// }

// const dom = document.createElement(div.type)
// dom.id = div.props.id
// document.getElementById("root").append(dom)
// const tNode = document.createTextNode(textNode.type)
// tNode.nodeValue = textNode.props.nodeValue
// dom.append(tNode)

// 动态创建
function cereateElement(type,props,...children) {
    return {
        type,
        props:{
            ...props,
            children:children.map(child=>{
                return typeof child === "string" ? cereateNode(child) : child
            })
        }
        
    }
}

function cereateNode(text) {
    return {
        type:"text element",
        props:{
            nodeValue:text,
            children:[]
        }
    }
}

// const tNode = cereateNode("hihjgjgjffhi")
const app = cereateElement("div",{id:"app"},"ii","uu")



// const dom = document.createElement(app.type)
// dom.id = app.props.id
// document.getElementById("root").append(dom)

// const node = document.createTextNode(tNode.type)
// node.nodeValue = tNode.props.nodeValue
// dom.append(node)

function render(element,container) {
    // 根据type创建Element
    const dom = element.type === "text element" ? document.createTextNode("") : document.createElement(element.type)
    
    // 填充属性
    Object.keys(element.props).forEach(key => {
        if (key !== "children") {
            dom[key] = element.props[key]
        }
    })
    // 将children循环填入
    element.props.children.forEach(e=>{
        render(e,dom)
    })

    container.append(dom)
}

// render(app,document.getElementById("root"))

const ReactDOM = {
    createRoot(container){
        return {
            render(App){
                render(App,container)
            }
        }
    }
}

ReactDOM.createRoot(document.getElementById("root")).render(app)
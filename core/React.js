// 动态创建
function createElement(type,props,...children) {
    return {
        type,
        props:{
            ...props,
            children:children.map(child=>{
                // 增加判断类型
                return typeof child !== "object" ? cereateNode(child) : child
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

function render(element,container) {
    work = {
        dom:container,
        props:{
            children:[element]
        }
    }
    root =  work

    // // 根据type创建
    // const dom = element.type === "text element" ? document.createTextNode("") : document.createElement(element.type)
    
    // // 填充属性
    // Object.keys(element.props).forEach(key => {
    //     if (key !== "children") {
    //         dom[key] = element.props[key]
    //     }
    // })
    // // 将children循环填入
    // element.props.children.forEach(e=>{
    //     render(e,dom)
    // })

    // container.append(dom)
}

// 2024.01.14

// let index = 1;
let root = null // 记录根节点
let work = null;
function workLoop(deadline) {
    // index++;

    // work = workList(work)
    let ifSecond = false
    while (!ifSecond && work) {
        work = workList(work)
        ifSecond = deadline.timeRemaining() < 1 // 任务小组结束停止进程
    }

    // 没有根节点创建根节点
    if (!work && root) {
        commitRoot()
    }

    requestIdleCallback(workLoop)

}

function commitRoot() {
    commitWork(root.child)
    root = null
}

function commitWork(fiber) {
    if (!fiber) {
        return
    }
    // 是否有父级 有则返回父级，没有则一直找直到找到根部
    let parent = fiber.parent
    while (!parent.dom) {
        parent = parent.parent
    }
    if (fiber.dom) {
        parent.dom.append(fiber.dom)
    }
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

function workList(work) {
    // 判断是否是function
    // 类同render
    let if_function = typeof work.type === 'function'
    if (!work.dom && !if_function) {
        // 根据type创建
        const dom = (work.dom = work.type === "text element" ? document.createTextNode("") : document.createElement(work.type))
       
        // 填充属性
        Object.keys(work.props).forEach(key => {
            if (key !== "children") {
                dom[key] = work.props[key]
            }
        })
    }

    // 是function类型则提取function内部
    let children  = if_function ? [work.type(work.props)]: work.props.children
    
    // 转换链表
    let prevChild = null;
    children.forEach((child,index)=>{
        // 不破坏原有结构进行记录Parent
        const newWork = {
            type:child.type,
            props:child.props,
            child:null,
            parent:work,
            sibling:null,
            dom:null
        }

        if (index === 0 ) {
            work.child = newWork // 当前任务
        } else {
            prevChild.sibling = newWork // 其他节点的同级为当前任务
        }

        prevChild = newWork
    })

    //一次渲染一个dom,时间充足则继续渲染下一个
    //先渲染child,结束再渲染其同级,都渲染结束则渲染父级同级
    if (work.child) {
        return work.child
    }

    if (work.sibling) {
        return work.sibling
    }

    // 多个组件遍历
    let nextWork = work
    while (nextWork) {
        if (nextWork.sibling) {
            return nextWork.sibling
        }

        nextWork = nextWork.parent
    }

}

requestIdleCallback(workLoop)

const React = {
    render,
    createElement
}

export default React
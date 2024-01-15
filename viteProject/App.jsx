import React from "../core/React.js";

// 具有属性的组件
function Counter({num}) {
    return <div>qie: {num}</div>
}

function App() {
    return <div>ii<div>uu</div><div>hhhhhh</div><Counter num={10}></Counter><Counter num={"happyhappyhappy"}></Counter></div>
}
// const App = React.createElement("div",{id:"app"},"ii","uu",'hhhhhhh')
// const App = <div>ii<div>uu</div><div>hhhhhh</div><Counter></Counter></div>
export default App
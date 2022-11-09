let inquirer=require("inquirer")
//prompt中一个对象就是一个问题
inquirer.prompt([{
  type:"input", // 问题的类型,选择类型，问答类型等
  name:"username",// 答案的属性名字
  message:"输入你的名字" //问题的描述
}]).then((answer)=>{
  console.log("answer",answer) //answer { username: 'node' }
})

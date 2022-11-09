# my-cli
一个简单的项目脚手架





（三）如何创建一个自定义的全局命令像`npm init vite@latest`这样的？

（1）先在根目录下创建bin目录，下面创建文件cli.js，这个cli.js是命令入口文件

（2）然后在根目录，初始npm init,这样package.json 会自动创建指定命令，到目录下![img](file:///C:\Users\wumeng\AppData\Local\Temp\ksohtml2152\wps15.jpg)

（3）根目录执行 npm link 就将命令挂载到全局了，

![img](file:///C:\Users\wumeng\AppData\Local\Temp\ksohtml2152\wps16.jpg) 

（4）编写cli.js

`#! /usr/bin/env node`

表示调用操作系统中的node，执行当前脚本

 

link之后，会在全局创建一个命令

![img](file:///C:\Users\wumeng\AppData\Local\Temp\ksohtml2152\wps17.jpg) 

移除这个命令 npm unlink

`npm link` 可以帮助我们模拟包安装后的状态，它会在系统中做一个快捷方式映射，让本地的包就好像 install 过一样，可以直接使用。

也就是npm init xxx 下载之后不用 npm link就能当全局命令

 

（四）如何让全局命令接受命令参数cli --help？

`process.argv`

（1）返回的是一个数组，第一个是node安装的位置，第二个是命令入口脚本的位置，第三个开始是参数

（2）处理参数一般使用comander命令参数处理工具

`npm install commander`

 

// 接受命令

`const { program } =require("commander")
program.parse(process.argv)`

 

--help指令时commander默认设置好了

 

![img](file:///C:\Users\wumeng\AppData\Local\Temp\ksohtml2152\wps18.jpg) 

 

使用program.option来设置命令

 

// 使用-f 或者--framework 来设置框架 后面<>表示这是必选的，后面一个参数是描述
`program.option("-f --framework <framework>","设置框架")`

 

（五）如何使用commander处理自定义的选项参数？如何为命令起别名？添加说明？执行命令的逻辑？

mycli create xxx 创建一个项目

（1）之前的 --help -h是一样的

（2）program.command("create <project> [other...]").alias("crt")

`// 表示设置一个create命令 <>表示参数，other表示接受其他参数
program.command("create <project> [other...]")
// 给create起一个别名
 .alias("crt")
// 添加说明
 .description("创建项目")
// 为命令添加功能
 .action((project,args)=>{
 console.log(project)
 console.log(args)
 })`

注意：参数不能使用--type这种

![img](file:///C:\Users\wumeng\AppData\Local\Temp\ksohtml2152\wps19.jpg) 

![img](file:///C:\Users\wumeng\AppData\Local\Temp\ksohtml2152\wps20.jpg) 

（六）commander为何要拆分？如何拆分？

（1）拆分的原因是如果要添加交换，提示，选择，字体颜色改变等功能，都在.action中会十分臃肿

（2）处理help打印的为一个模块，处理其他命令选项的为一个模块，命令选项的逻辑代码为一个模块



（七）命令行问答交互工具inquirer？有那一些交互类型？如何下载远程的模板代码？如何在下载的时候做一些提示？如何让命令行文字有颜色?

 

（1）`npm install --save inquirer@8 ` 注意必须是这个版本才能使用require引入

 

（2）

`let inquirer=require("inquirer")
//prompt中一个对象就是一个问题
inquirer.prompt([{
 type:"input", // 问题的类型,选择类型，问答类型等
 name:"username",// 答案的属性名字
 message:"输入你的名字" //问题的描述
}]).then((answer)=>{
 console.log("answer",answer) //answer { username: 'node' }
})`



输入类型

![img](file:///C:\Users\wumeng\AppData\Local\Temp\ksohtml2152\wps21.jpg) 

单选类型

`inquirer.prompt([{
 type:"list", //单选类型 选择框架类型
 name:"frameworkName",
 choices:["express","koa","egg"],
 message:"(3)请选择你要使用的框架(上下移动，enter确认):",
}]).then((answer)=>{
console.log(answer.frameworkName)//打印结果
})`

 

（3）实现远程模板代码

安装 $npm install download-git-repo   node中专门用来下载GitHub，gitlab等的代码

使用的语法：

`download('direct:https://gitee.com/template.git', 'test/tmp',{ clone: true }, function (err) {
console.log(err ? 'Error' : 'Success')
})`

 

test/tmp表示的路径，**注意必须加上{clone:true}才能下载码云代码**

 

在命令执行的地方下载模板，创建项目

`download(`direct:${config.frameworkUrl[answer.frameworkName]}`, process.cwd()+"/"+project+"/",{ clone: true }, function (err) {
 if(err)
 {
console.log(`模板下载错误!
  错误原因是:`,err)
 }
 else
 {
console.log(`
  模板下载成功！
  执行以下命令运行项目
  cd ./${project}
  npm i
  npm start
  `)
 }
})`

 

（4）npm install ora@5 注意一定要下载5的版本，这个版本支持require

`const  ora=require("ora");
const spinner=ora().start();
spinner.text="loading..."
setTimeout(()=>{
console.log("111")
 spinner.succeed("结束")
 spinner.info("消息")
 spinner.fail("失败")
},3000)`

(5)npm install chalk@4  要用4版本

`const  chalk=require("chalk")

console.log(chalk.green.bold(
 `
cd ./${project}
npm i
npm start
`))`

 

一个脚手架例子

[rax-app/rax.js at master · raxjs/rax-app (github.com)](https://github.com/raxjs/rax-app/blob/master/packages/rax-cli/bin/rax.js)

[【转】前端脚手架开发入门 - 简书 (jianshu.com)](https://www.jianshu.com/p/728b81b698c3)

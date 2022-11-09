// 为命令添加实际的功能 来自commander.js

let  config   =require("./../../config");//导入问题配置
let   downloadFn     =require("./download") //导入下载模块
let inquirer=require("inquirer")


const action= async (project,args)=>{

   console.log("(1)项目名称为(会作为项目的根目录):",project)
   console.log("(2)输入的其他参数为:",args)
  let answer= await inquirer.prompt([{
     type:"list", //单选类型 选择框架类型
     name:"frameworkName",
     choices:config.framework, //选择的项
     message:"(3)请选择你要使用的框架(enter确认):",
   }])
  // console.log(answer.frameworkName)
  console.log("当前命令的全部参数",process.argv)
  console.log("当前命令运行位置",process.cwd())
  console.log(`下载的地址${config.frameworkUrl[answer.frameworkName]}`)
  downloadFn(answer.frameworkName,project)

 }

 module.exports=action

// 负责下载的模块

const download = require('download-git-repo')
const config = require('../../config')
const  ora=require("ora");
const chalk=require("chalk")

// 选择的模块名字，一个是项目名字
const downloadFn=(frameworkName,project)=>{


  const spinner=ora().start();//初始化提升条
  spinner.text="模板下载中..."

  download(`direct:${config.frameworkUrl[frameworkName]}`, process.cwd()+"/"+project+"/",{ clone: true }, function (err) {
    if(err)
    {
      spinner.fail("模板下载错误!")
      console.log(`错误原因是:`,err)
    }
    else
    {
      spinner.succeed("模板下载成功！")
       console.log("执行以下命令运行项目")
      console.log(chalk.green.bold(
        `
      cd ./${project}
      npm i
      npm start
      `))

    }
  })
}


module.exports=downloadFn

// 创建命令，为命令起别名，



let action=require("./action")

const commander=(program)=>
{
  program.command("create <project> [other...]")
    // 给create起一个别名
    .alias("crt")
    // 添加说明
    .description("创建项目")
    // 为命令添加功能
    .action(action)

}

module.exports=commander

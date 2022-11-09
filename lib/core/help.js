
// 为命令添加help提示

const help =function(program)
{
// 使用-f 或者--framework 来设置框架 后面<>表示这是必选的，后面一个参数是描述
  program.option("-f --framework <framework>","设置框架")
}

module.exports=help;

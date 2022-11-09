#! /usr/bin/env node

const { program } =require("commander")
const  help  =require("../lib/core/help")
const  commander  =require("../lib/core/commander")
// 使用-f 或者--framework 来设置框架 后面<>表示这是必选的，后面一个参数是描述
//program.option("-f --framework <framework>","设置框架")
// 表示设置一个create命令 <>表示参数，other表示接受其他参数

help(program)

commander(program)
program.parse(process.argv)
